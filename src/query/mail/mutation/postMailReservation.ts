import { api } from '@/apis/api.ts';
import { MailBodyFormatType } from '@/utils/buildMailRequest';

interface PostMailReservationParams {
  attachments: string;
  inlineImages: string;
  request: {
    bccEmailAddresses: string[];
    bodyFormat: MailBodyFormatType;
    ccEmailAddresses: string[];
    mailBody: string;
    mailSubject: string;
    receiverEmailAddresses: string[];
    reservationTime: null | string;
  };
}

export const postMailReservation = (params: PostMailReservationParams) => {
  return api.post('api/mails/reservations', { json: params }).json<void>();
};
