import { api } from '@/apis/api.ts';

interface PutMailReservationParams {
  attachmentReferences: { fileId: number }[];
  bccEmailAddresses: string[];
  bodyFormat: 'HTML' | 'TEXT';
  ccEmailAddresses: string[];
  mailBody: string;
  mailSubject: string;
  receiverEmailAddresses: string[];
  reservationId: number;
  reservationTime: null | string;
}

export const putMailReservation = (params: PutMailReservationParams) => {
  const { reservationId, ...body } = params;
  return api.put(`api/mails/reservation/${reservationId}`, { json: body }).json<void>();
};
