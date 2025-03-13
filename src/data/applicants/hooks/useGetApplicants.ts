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
  name = '',
) => {
  return useSuspenseQuery({
    queryKey: getApplicantsQueryKey(semesterId, state, name),
    queryFn: async () => {
      const res = await api.get('applicants', {
        searchParams: {
          state,
          name,
          semesterId,
        },
      });
      const data = await res.json();
      return ApplicantArraySchema.parse(data);
    },
  });
};
