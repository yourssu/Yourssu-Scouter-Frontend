import { api } from '@/apis/api.ts';

export interface PostMailReservationParams {
  attachmentReferences: {
    fileId: number;
  }[];
  bccEmailAddresses: string[];
  bodyFormat: 'HTML' | 'PLAIN_TEXT';
  ccEmailAddresses: string[];
  inlineImageReferences: {
    contentId: string;
    fileId: number;
  }[];
  mailBody: string;
  mailSubject: string;
  receiverEmailAddresses: string[];
  reservationTime: string;
}

export const postMailReservation = (data: PostMailReservationParams) => {
  return api
    .post('api/mails/reservation', {
      json: data,
    })
    .json<void>();
};
