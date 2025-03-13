import { useSuspenseQuery } from '@tanstack/react-query';
import { api } from '@/apis/api.ts';
import {
  ApplicantArraySchema,
  ApplicantState,
} from '@/data/applicants/schema.ts';
import { getApplicantsQueryKey } from '@/data/applicants/key.ts';

export const useGetApplicants = (
  state: ApplicantState,
  semesterId: number,
  search = '',
) => {
  return useSuspenseQuery({
    queryKey: getApplicantsQueryKey(semesterId, state, search),
    queryFn: async () => {
      const res = await api.get('applicants', {
        searchParams: {
          state,
          search,
          semesterId,
        },
      });
      const data = await res.json();
      return ApplicantArraySchema.parse(data);
    },
  });
};
