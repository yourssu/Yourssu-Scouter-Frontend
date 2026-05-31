import { api } from '@/apis/api.ts';

export interface PostMailReservationParams {
  bccEmailAddresses?: string[];
  ccEmailAddresses?: string[];
  recipients: {
    applicantId?: number;
    bindings: Record<string, string>;
    email: string;
  }[];
  reservationTime: string;
  sharedBindings: Record<string, string>;
  templateId: number;
}

export const postMailReservation = (data: PostMailReservationParams) => {
  return api
    .post('api/mails/reservation', {
      json: data,
    })
    .json<void>();
};
