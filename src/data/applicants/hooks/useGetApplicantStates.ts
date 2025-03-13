import { useSuspenseQuery } from '@tanstack/react-query';
import { api } from '@/apis/api.ts';
import { ApplicantStateArraySchema } from '@/data/applicants/schema.ts';
import { applicantStatesQueryKey } from '@/data/applicants/key.ts';

export const useGetApplicantStates = () => {
  return useSuspenseQuery({
    queryKey: applicantStatesQueryKey,
    queryFn: async () => {
      const data = await api.get('applicants/states').json();
      return ApplicantStateArraySchema.parse(data);
    },
  });
};
