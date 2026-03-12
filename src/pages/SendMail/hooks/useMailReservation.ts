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
      const typeMatch = match.match(/data-type="([^"]*)"/);

      const key = keyMatch?.[1] || '';
      const isIndividual = perRecipientMatch?.[1] === 'true';
      const label = labelMatch?.[1] || '';
      const type = typeMatch?.[1] || '';

      const value = getVariableValue(key, isIndividual, label, targetId);

      // 값이 있으면 치환, 없으면 칩 원본 그대로 반환
      if (typeof value === 'string' && value.trim() !== '') {
        if (type.toUpperCase() === 'LINK') {
          let linkText = value;
          let linkUrl = value;
          try {
            const parsed = JSON.parse(value);
            if (parsed && typeof parsed === 'object') {
              linkText = parsed.text || parsed.url || value;
              linkUrl = parsed.url || value;
            }
          } catch {
            // fallback
          }

          const href = linkUrl.startsWith('http') ? linkUrl : `https://${linkUrl}`;
          return `<a href="${href}" target="_blank" rel="noreferrer" style="color: #1155cc; text-decoration: underline;">${linkText}</a>`;
        }
        return value;
      }
      return match;
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

    const reservationTimeIso = reservationTime.toISOString();

    // 각 detail에 대해, 수신자별 body를 구하고 동일 여부에 따라 PUT 또는 삭제+재생성으로 분기
    const putsToMake: { body: string; detail: MailDetail; emails: string[] }[] = [];
    const detailsToSplit: MailDetail[] = [];

    for (const detail of toUpdate) {
      const relevantEmails = detail.receiverEmailAddresses.filter((e) =>
        newReceiverEmails.includes(e),
      );
      const emailBodies = relevantEmails.map((email) => {
        const applicant = allApplicants?.find((a) => a.email === email);
        return applicant
          ? (mailContent.body[String(applicant.applicantId)] ?? detail.mailBody)
          : detail.mailBody;
      });
      const allSameBody = emailBodies.every((b) => b === emailBodies[0]);

      if (allSameBody && relevantEmails.length > 0) {
        putsToMake.push({ detail, body: emailBodies[0], emails: relevantEmails });
      } else {
        // 수신자별로 다른 body → 기존 예약 삭제 후 개별 재생성
        detailsToSplit.push(detail);
      }
    }

    // 분리 대상 detail의 수신자 이메일은 새로 생성
    const emailsFromSplit = detailsToSplit.flatMap((d) =>
      d.receiverEmailAddresses.filter((e) => newReceiverEmails.includes(e)),
    );
    const allEmailsToCreate = [...toCreate, ...emailsFromSplit];

    await Promise.all([
      ...putsToMake.map(({ detail, body, emails }) =>
        putMailReservation({
          reservationId: detail.reservationId,
          mailSubject: mailInfo.subject,
          mailBody: body,
          bodyFormat: detail.bodyFormat as 'HTML' | 'TEXT',
          receiverEmailAddresses: emails,
          ccEmailAddresses: mailInfo.cc.map(convertNameToEmail),
          bccEmailAddresses: mailInfo.bcc.map(convertNameToEmail),
          reservationTime: reservationTimeIso,
          attachmentReferences: mailContent.attachments.map((a) => ({ fileId: a.fileId })),
        }),
      ),
      ...[...toDelete, ...detailsToSplit].map((detail) =>
        deleteMailReservation({ reservationId: detail.reservationId }),
      ),
      ...allEmailsToCreate.map((email) => {
        const applicant = allApplicants?.find((a) => a.email === email);
        const originalBody =
          mailDetails.find((d) => d.receiverEmailAddresses.includes(email))?.mailBody ?? '';
        const body = applicant
          ? (mailContent.body[String(applicant.applicantId)] ?? originalBody)
          : originalBody;
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

    const sendPromises = mailInfo.receiver.map(async (receiverName) => {
      const targetApplicant = allApplicants.find(
        (a) => a.name === receiverName || a.email === receiverName,
      );
      const targetId = targetApplicant ? String(targetApplicant.applicantId) : undefined;
      const targetEmail = targetApplicant?.email || receiverName;

      let specificBody = defaultBody;
      if (targetId === currentRecipientId) {
        specificBody = rawBody;
      } else if (targetId && mailContent.body[targetId]) {
        specificBody = mailContent.body[targetId];
      }

      const targetMailBody = replaceChips(specificBody, targetId);
      const { resultHtml: finalBody, inlineImageReferences } = extractInlineImages(targetMailBody);

      return executeSend(
        buildMailRequest({
          inlineImageReferences,
          mailInfo: {
            receiver: [targetEmail],
            cc: mailInfo.cc.map(convertNameToEmail),
            bcc: mailInfo.bcc.map(convertNameToEmail),
            subject: mailInfo.subject,
          },
          mailContent: { ...mailContent, body: finalBody },
          reservedDate: reservedDate || null,
        }).request,
      );
    });

    await Promise.all(sendPromises);
  };
  return { sendReservation, updateReservation, isPending };
};
