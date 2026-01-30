import { useMutation } from '@tanstack/react-query';

import { useMailContentContext, useMailInfoContext } from '@/pages/SendMail/context';
import { postMailReservation } from '@/query/mail/mutation/postMailReservation';
import { buildMailRequest } from '@/utils/buildMailRequest';

export const useMailActions = () => {
  const { mailInfo } = useMailInfoContext();
  const { mailContent } = useMailContentContext();

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
      mailInfo,
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
