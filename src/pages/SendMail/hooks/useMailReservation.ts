import { useMutation } from '@tanstack/react-query';
import { useSuspenseQuery } from '@tanstack/react-query';

import { useMailContentContext, useMailInfoContext } from '@/pages/SendMail/context';
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

  const { mutateAsync: mutatePostMailReservation, isPending } = useMutation({
    mutationFn: postMailReservation,
    onSuccess: () => {
      // console.log('메일 예약 발송 성공');
    },
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

  const replaceChips = (html: string) => {
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

      const value = getVariableValue(key, isIndividual, label);

      // 값이 있으면 치환, 없으면 칩 원본 그대로 반환
      return typeof value === 'string' && value.trim() !== '' ? value : match;
    });
  };
  const sendReservation = async (rawBody: string, reservedDate?: Date) => {
    const finalBody = replaceChips(rawBody);

    const requestBody = buildMailRequest({
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
    });

    console.log('발송 데이터:', requestBody);
    await mutatePostMailReservation(requestBody);
  };
  return { sendReservation, isPending };
};
