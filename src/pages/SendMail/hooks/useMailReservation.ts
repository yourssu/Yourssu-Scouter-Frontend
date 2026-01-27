import { useMutation } from '@tanstack/react-query';

import { useMailContentContext, useMailInfoContext } from '@/pages/SendMail/context';
import { postMailReservation } from '@/query/mail/mutation/postMailReservation';
import { buildMailRequest } from '@/utils/buildMailRequest';

export const useMailActions = () => {
  const { mailInfo } = useMailInfoContext();
  const { mailContent, reservationTime } = useMailContentContext();

  const { mutateAsync: mutatePostMailReservation, isPending } = useMutation({
    mutationFn: postMailReservation,
    onSuccess: () => {
      alert('성공적으로 예약되었습니다!');
    },
    onError: (error) => {
      console.error('메일 예약 발송 실패:', error);
      alert('예약 발송 중 오류가 발생했습니다.');
    },
  });

  const sendReservation = async () => {
    const requestBody = buildMailRequest({
      mailInfo: {
        receiver: mailInfo.receiver,
        cc: mailInfo.cc,
        bcc: mailInfo.bcc,
      },
      mailContent: {
        subject: mailContent.subject,
        body: mailContent.body,
        bodyFormat: mailContent.bodyFormat,
        inlineImages: mailContent.inlineImages, // string 그대로 전달
        attachments: mailContent.attachments, // string 그대로 전달
      },
      reservedDate: reservationTime,
    });

    try {
      await mutatePostMailReservation(requestBody);
    } catch (error) {
      console.error('예약 발송 중 에러 발생:', error);
    }
  };

  return { sendReservation, isPending };
};
