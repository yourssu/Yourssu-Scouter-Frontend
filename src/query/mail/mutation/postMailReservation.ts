import { api } from '@/apis/api.ts';
import { MailBodyFormatType } from '@/utils/buildMailRequest';

export interface PostMailReservationParams {
  bccEmailAddresses: string[];
  bodyFormat: MailBodyFormatType;
  ccEmailAddresses: string[];
  mailBody: string;
  mailSubject: string;
  receiverEmailAddresses: string[];
  reservationTime: null | string;
}

export const postMailReservation = (data: FormData | PostMailReservationParams) => {
  const isFormData = data instanceof FormData;
  return api
    .post('api/mails/reservation', {
      body: isFormData ? data : undefined,
      json: isFormData ? undefined : data,
    })
    .json<void>();
};
