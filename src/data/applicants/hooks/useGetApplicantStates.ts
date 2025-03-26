import { useSuspenseQuery } from '@tanstack/react-query';
import { api } from '@/apis/api.ts';
import { ApplicantStateArraySchema } from '@/data/applicants/schema.ts';
import { applicantStateKeys } from '@/data/applicants/key.ts';

export const useGetApplicantStates = () => {
  return useSuspenseQuery({
    queryKey: applicantStateKeys.all,
    queryFn: async () => {
      const data = await api.get('applicants/states').json();
      return ApplicantStateArraySchema.parse(data);
    },
  });
};
