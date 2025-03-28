import { queryOptions } from '@tanstack/react-query';
import { api } from '@/apis/api.ts';
import { ApplicantStateArraySchema } from '@/query/applicant/schema.ts';

export const applicantStateOptions = () => {
  return queryOptions({
    queryKey: ['applicantStates'],
    queryFn: async () => {
      const data = await api.get('applicants/states').json();
      return ApplicantStateArraySchema.parse(data);
    },
  });
};
