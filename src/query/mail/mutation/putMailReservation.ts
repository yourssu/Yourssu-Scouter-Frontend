import { api } from '@/apis/api.ts';

export interface PutMailReservationParams {
  bccEmailAddresses?: string[];
  ccEmailAddresses?: string[];
  recipients: {
    applicantId?: number;
    bindings: Record<string, string>;
    email: string;
  }[];
  reservationId: number;
  reservationTime: string;
  sharedBindings: Record<string, string>;
  templateId: number;
}

export const putMailReservation = (params: PutMailReservationParams) => {
  const { reservationId, ...body } = params;
  return api.put(`api/mails/reservation/${reservationId}`, { json: body }).json<void>();
};
