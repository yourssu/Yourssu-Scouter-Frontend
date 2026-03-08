import { queryOptions } from '@tanstack/react-query';

import { api } from '@/apis/api.ts';
import { MailDetailSchema, MailListSchema } from '@/query/mail/schema';

export const MailReservationKeys = {
  all: ['mailReservations'] as const,
  detail: (id: number) => [...MailReservationKeys.all, id] as const,
};

export const mailOptions = {
  all: () =>
    queryOptions({
      queryKey: MailReservationKeys.all,
      queryFn: async () => {
        const data = await api.get('api/mails/reservation').json();
        const response = MailListSchema.parse(data);
        const mailData = response.items;
        return mailData;
      },
      staleTime: Infinity,
    }),
  detail: (reservationId: number) =>
    queryOptions({
      queryKey: MailReservationKeys.detail(reservationId),
      queryFn: async () => {
        const data = await api.get(`api/mails/reservation/${reservationId}`).json();
        const response = MailDetailSchema.parse(data);
        return response;
      },
      staleTime: Infinity,
    }),
};
