import { queryOptions } from '@tanstack/react-query';

import { api } from '@/apis/api.ts';
import { ApplicantArraySchema, ApplicantState } from '@/query/applicant/schema.ts';
import { compactSearchParams } from '@/utils/ky';

export type ApplicantQueryParams = {
  name?: string;
  partId?: null | number;
  semesterId?: number;
  state?: ApplicantState;
};

export const applicantOptions = (params: ApplicantQueryParams = {}) => {
  const baseKey = ['applicants'] as const;

  return queryOptions({
    queryKey: params ? [...baseKey, params] : baseKey,
    queryFn: async () => {
      const res = await api.get('applicants', {
        searchParams: compactSearchParams(params),
      });
      const data = await res.json();
      return ApplicantArraySchema.parse(data);
    },
  });
};
