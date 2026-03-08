import { api } from '@/apis/api.ts';

interface DeleteMailReservationParams {
  reservationId: number;
}

export const deleteMailReservation = (params: DeleteMailReservationParams) => {
  const { reservationId } = params;
  return api.delete(`api/mails/reservation/${reservationId}`).json();
};
