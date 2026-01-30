import { useMutation } from '@tanstack/react-query';
import { useSuspenseQuery } from '@tanstack/react-query';

import { useMailContentContext, useMailInfoContext } from '@/pages/SendMail/context';
import { applicantOptions } from '@/query/applicant/options';
import { postMailReservation } from '@/query/mail/mutation/postMailReservation';
import { memberOptions } from '@/query/member/options';
import { buildMailRequest } from '@/utils/buildMailRequest';

export const useMailActions = () => {
  const { mailInfo } = useMailInfoContext();
  const { mailContent } = useMailContentContext();

  const { data: allMembers } = useSuspenseQuery(memberOptions('액티브'));
  const { data: allApplicants } = useSuspenseQuery(applicantOptions());

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

  const { mutateAsync: mutatePostMailReservation, isPending } = useMutation({
    mutationFn: postMailReservation,
    onSuccess: () => {
      // console.log('메일 예약 발송 성공');
    },
    onError: (error) => {
      console.error('메일 예약 발송 실패:', error);
    },
  });

  const sendReservation = async (body: string, reservedDate?: Date) => {
    const requestBody = buildMailRequest({
      mailInfo: {
        receiver: mailInfo.receiver.map(convertNameToEmail),
        cc: mailInfo.cc.map(convertNameToEmail),
        bcc: mailInfo.bcc.map(convertNameToEmail),
        subject: mailInfo.subject,
      },
      mailContent: {
        ...mailContent,
        body: body || '',
      },
      reservedDate: reservedDate || null,
    });

    console.log('발송 데이터:', requestBody);
    // await mutatePostMailReservation(requestBody);
  };

  return { sendReservation, isPending };
};
