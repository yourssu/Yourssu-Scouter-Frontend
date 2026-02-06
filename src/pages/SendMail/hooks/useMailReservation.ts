import { useMutation } from '@tanstack/react-query';
import { useSuspenseQuery } from '@tanstack/react-query';

import {
  useMailContentContext,
  useMailInfoContext,
  useMailVariableContext,
} from '@/pages/SendMail/context';
import { useRecipientData } from '@/pages/SendMail/hooks/useRecipientData';
import { useVariableValue } from '@/pages/SendMail/hooks/useVariableValue';
import { applicantOptions } from '@/query/applicant/options';
import { postMailReservation } from '@/query/mail/mutation/postMailReservation';
import { memberOptions } from '@/query/member/options';
import { buildMailRequest } from '@/utils/buildMailRequest';

export const useMailActions = () => {
  const { mailInfo } = useMailInfoContext();
  const { mailContent } = useMailContentContext();

  const { data: allMembers } = useSuspenseQuery(memberOptions('액티브'));
  const { data: allApplicants } = useSuspenseQuery(applicantOptions());
  const { getVariableValue } = useVariableValue();

  const { variableValue } = useMailVariableContext();
  const { currentRecipientId } = useRecipientData();

  const { mutateAsync: mutatePostMailReservation, isPending } = useMutation({
    mutationFn: postMailReservation,
  });

  const convertNameToEmail = (name: string) => {
    // 지원자에서 찾기
    const applicant = allApplicants?.find((a) => a.name === name);
    if (applicant) {
      return applicant.email;
    }

    // 멤버에서 찾기
    const member = allMembers?.find((m) => m.nickname === name);
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

  const executeSend = async (
    requestData: FormData | ReturnType<typeof buildMailRequest>['request'],
  ) => {
    const hasFiles =
      (mailContent.inlineImages?.length ?? 0) > 0 || (mailContent.attachments?.length ?? 0) > 0;
    if (hasFiles) {
      const formData = new FormData();
      formData.append(
        'request',
        new Blob([JSON.stringify(requestData)], { type: 'application/json' }),
      );
      mailContent.inlineImages?.forEach((f) => formData.append('inlineImages', f));
      mailContent.attachments?.forEach((f) => formData.append('attachments', f));
      return mutatePostMailReservation(formData);
    }
    return mutatePostMailReservation(requestData);
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

        // 이메일로 지원자 ID 찾기
        const requestBody = buildMailRequest({
          mailInfo: {
            receiver: [targetEmail],
            cc: mailInfo.cc.map(convertNameToEmail),
            bcc: mailInfo.bcc.map(convertNameToEmail),
            subject: mailInfo.subject,
          },
          mailContent: {
            ...mailContent,
            body: targetMailBody,
          },
          reservedDate: reservedDate || null,
        }).request;
        return executeSend(requestBody);
      });

      await Promise.all(sendPromises); // 모든 요청이 끝날 때까지 대기
      return;
    }

    const requestBody = buildMailRequest({
      mailInfo: {
        receiver: mailInfo.receiver.map(convertNameToEmail),
        cc: mailInfo.cc.map(convertNameToEmail),
        bcc: mailInfo.bcc.map(convertNameToEmail),
        subject: mailInfo.subject,
      },
      mailContent: {
        ...mailContent,
        body: replaceChips(rawBody),
      },
      reservedDate: reservedDate || null,
    }).request;

    await executeSend(requestBody);
  };
  return { sendReservation, isPending };
};
