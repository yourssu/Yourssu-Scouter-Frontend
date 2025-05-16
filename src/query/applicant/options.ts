import { queryOptions } from '@tanstack/react-query';
import { api } from '@/apis/api.ts';
import {
  ApplicantArraySchema,
  ApplicantState,
} from '@/query/applicant/schema.ts';

export type ApplicantQueryParams = {
  state: ApplicantState;
  semesterId: number;
  name: string;
  partId: number | null;
};

export const applicantOptions = (params?: ApplicantQueryParams) => {
  const baseKey = ['applicants'] as const;

  return queryOptions({
    queryKey: params ? [...baseKey, params] : baseKey,
    queryFn: async () => {
      const res = await api.get('applicants', {
        searchParams: params && {
          state: params.state,
          semesterId: params.semesterId,
          name: params.name,
          ...(params.partId && {
            partId: params.partId,
          }),
        },
      });
      const data = await res.json();
      return ApplicantArraySchema.parse(data);
    },
  });
};
