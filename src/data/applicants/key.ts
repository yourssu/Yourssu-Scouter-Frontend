import { ApplicantState } from '@/data/applicants/schema.ts';

type ApplicantFilter = {
  state?: ApplicantState;
  semesterId?: number;
  name?: string;
};

export const applicantKeys = {
  all: ['applicants'] as const,
  filter: (filters: ApplicantFilter) =>
    [...applicantKeys.all, filters] as const,
};

export const applicantStateKeys = {
  all: ['applicantStates'] as const,
};
