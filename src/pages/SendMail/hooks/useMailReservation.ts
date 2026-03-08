import { useMutation, useQueryClient, useSuspenseQuery } from '@tanstack/react-query';

import {
  useMailContentContext,
  useMailInfoContext,
  useMailVariableContext,
} from '@/pages/SendMail/context';
import { useRecipientData } from '@/pages/SendMail/hooks/useRecipientData';
import { useVariableValue } from '@/pages/SendMail/hooks/useVariableValue';
import { applicantOptions } from '@/query/applicant/options';
import { deleteMailReservation } from '@/query/mail/mutation/deleteMailReservation';
import { postMailReservation } from '@/query/mail/mutation/postMailReservation';
import { putMailReservation } from '@/query/mail/mutation/putMailReservation';
import { MailReservationKeys } from '@/query/mail/options';
import { MailDetail } from '@/query/mail/schema';
import { memberOptions } from '@/query/member/options';
import { buildMailRequest } from '@/utils/buildMailRequest';

export const useMailActions = () => {
  const queryClient = useQueryClient();
  const { mailInfo } = useMailInfoContext();
  const { mailContent } = useMailContentContext();

  const { data: allMembers } = useSuspenseQuery(memberOptions('액티브'));
  const { data: allApplicants } = useSuspenseQuery(applicantOptions());
  const { getVariableValue } = useVariableValue();

  const { variableValue } = useMailVariableContext();
  const { currentRecipientId } = useRecipientData();

  const { mutateAsync: mutatePostMailReservation, isPending } = useMutation({
    mutationFn: postMailReservation,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: MailReservationKeys.all });
    },
  });

  const convertNameToEmail = (name: string) => {
    // 지원자에서 찾기
    const applicant = allApplicants?.find((a) => a.name === name);
    if (applicant) {
      return applicant.email;
    }

    // 멤버에서 찾기
    const member = allMembers?.members.find((m) => m.nickname === name);
    if (member) {
      return member.email;
    }

    return name;
  };

  const replaceChips = (html: string, targetId?: string) => {
    if (!html) {
      return '';
    }
    return html.replace(/<span[^>]*data-variable-chip[^>]*>.*?<\/span>/g, (match) => {
      const keyMatch = match.match(/data-key="([^"]*)"/);
      const perRecipientMatch = match.match(/data-per-recipient="([^"]*)"/);
      const labelMatch = match.match(/data-label="([^"]*)"/);

      const key = keyMatch?.[1] || '';
      const isIndividual = perRecipientMatch?.[1] === 'true';
      const label = labelMatch?.[1] || '';

      const value = getVariableValue(key, isIndividual, label, targetId);

      // 값이 있으면 치환, 없으면 칩 원본 그대로 반환
      return typeof value === 'string' && value.trim() !== '' ? value : match;
    });
  };

  const extractInlineImages = (html: string) => {
    let resultHtml = html;
    const inlineImageReferences: { contentId: string; fileId: number }[] = [];

    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');
    const images = doc.querySelectorAll('img');

    images.forEach((img) => {
      const fileIdAttr = img.getAttribute('data-file-id');
      const contentIdAttr = img.getAttribute('data-content-id');

      if (fileIdAttr && contentIdAttr) {
        const fileId = parseInt(fileIdAttr, 10);
        if (!isNaN(fileId)) {
          inlineImageReferences.push({ fileId, contentId: contentIdAttr });
        }
      }
    });

    resultHtml = doc.body.innerHTML;
    return { resultHtml, inlineImageReferences };
  };

  const executeSend = async (requestData: ReturnType<typeof buildMailRequest>['request']) => {
    return mutatePostMailReservation(requestData);
  };

  const updateReservation = async (mailDetails: MailDetail[], reservationTime: Date) => {
    const newReceiverEmails = mailInfo.receiver.map(convertNameToEmail);
    const existingEmails = mailDetails.flatMap((d) => d.receiverEmailAddresses);

    const toUpdate = mailDetails.filter((detail) =>
      detail.receiverEmailAddresses.some((email) => newReceiverEmails.includes(email)),
    );
    const toDelete = mailDetails.filter((detail) =>
      detail.receiverEmailAddresses.every((email) => !newReceiverEmails.includes(email)),
    );
    const toCreate = newReceiverEmails.filter((email) => !existingEmails.includes(email));

    const defaultBody = mailDetails[0]?.mailBody ?? '';
    const reservationTimeIso = reservationTime.toISOString();

    await Promise.all([
      ...toUpdate.map((detail) => {
        const applicant = allApplicants?.find((a) =>
          detail.receiverEmailAddresses.includes(a.email),
        );
        const body = applicant
          ? (mailContent.body[String(applicant.applicantId)] ?? detail.mailBody)
          : detail.mailBody;
        return putMailReservation({
          reservationId: detail.reservationId,
          mailSubject: mailInfo.subject,
          mailBody: body,
          bodyFormat: detail.bodyFormat as 'HTML' | 'TEXT',
          receiverEmailAddresses: detail.receiverEmailAddresses,
          ccEmailAddresses: mailInfo.cc.map(convertNameToEmail),
          bccEmailAddresses: mailInfo.bcc.map(convertNameToEmail),
          reservationTime: reservationTimeIso,
          attachmentReferences: [],
        });
      }),
      ...toDelete.map((detail) => deleteMailReservation({ reservationId: detail.reservationId })),
      ...toCreate.map((email) => {
        const applicant = allApplicants?.find((a) => a.email === email);
        const body = applicant
          ? (mailContent.body[String(applicant.applicantId)] ?? defaultBody)
          : defaultBody;
        return mutatePostMailReservation(
          buildMailRequest({
            inlineImageReferences: [],
            mailInfo: {
              receiver: [email],
              cc: mailInfo.cc.map(convertNameToEmail),
              bcc: mailInfo.bcc.map(convertNameToEmail),
              subject: mailInfo.subject,
            },
            mailContent: { ...mailContent, body },
            reservedDate: reservationTime,
          }).request,
        );
      }),
    ]);

    queryClient.invalidateQueries({ queryKey: MailReservationKeys.all });
  };

  const sendReservation = async (rawBody: string, defaultBody: string, reservedDate?: Date) => {
    const hasIndividualVar =
      Object.keys(variableValue.perApplicant).length > 0 && currentRecipientId !== null;

    if (hasIndividualVar && !currentRecipientId) {
      console.error('개인화 변수가 존재하지만 현재 지원자 ID가 없습니다.');
      return;
    }
    if (hasIndividualVar) {
      const sendPromises = mailInfo.receiver.map(async (receiverEmail) => {
        const targetApplicant = allApplicants?.find(
          (a) => a.name === receiverEmail || a.email === receiverEmail,
        );
        const targetId = targetApplicant ? String(targetApplicant.applicantId) : undefined;
        const targetEmail = targetApplicant?.email || receiverEmail;

        // 지원자별로 수정된 본문이 있다면 확인
        let specificBody = defaultBody; // 기본은 템플릿 내용

        if (targetId === currentRecipientId) {
          // 1. 현재 내가 편집 중인 탭이라면 -> 지금 에디터에 떠 있는 최신 값(currentEditorHtml) 사용
          specificBody = rawBody;
        } else if (targetId && mailContent.body[targetId]) {
          // 2. 다른 탭인데 수정 이력이 있다면 -> 저장된 개별 본문 사용
          specificBody = mailContent.body[targetId];
        }

        const targetMailBody = replaceChips(specificBody, targetId);
        const { resultHtml: finalBody, inlineImageReferences } =
          extractInlineImages(targetMailBody);

        // 이메일로 지원자 ID 찾기
        const requestBody = buildMailRequest({
          inlineImageReferences,
          mailInfo: {
            receiver: [targetEmail],
            cc: mailInfo.cc.map(convertNameToEmail),
            bcc: mailInfo.bcc.map(convertNameToEmail),
            subject: mailInfo.subject,
          },
          mailContent: {
            ...mailContent,
            body: finalBody,
          },
          reservedDate: reservedDate || null,
        }).request;
        return executeSend(requestBody);
      });

      await Promise.all(sendPromises); // 모든 요청이 끝날 때까지 대기
      return;
    }

    const targetMailBody = replaceChips(rawBody);
    const { resultHtml: finalBody, inlineImageReferences } = extractInlineImages(targetMailBody);

    const requestBody = buildMailRequest({
      inlineImageReferences,
      mailInfo: {
        receiver: mailInfo.receiver.map(convertNameToEmail),
        cc: mailInfo.cc.map(convertNameToEmail),
        bcc: mailInfo.bcc.map(convertNameToEmail),
        subject: mailInfo.subject,
      },
      mailContent: {
        ...mailContent,
        body: finalBody,
      },
      reservedDate: reservedDate || null,
    }).request;

    await executeSend(requestBody);
  };
  return { sendReservation, updateReservation, isPending };
};
