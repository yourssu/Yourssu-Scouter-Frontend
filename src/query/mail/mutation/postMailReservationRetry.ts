import { api } from '@/apis/api.ts';

interface PostMailReservationRetryParams {
  reservationId: number;
}

export const postMailReservationRetry = (params: PostMailReservationRetryParams) => {
  return api.post(`api/mails/reservation/${params.reservationId}/retry`).json<void>();
};
