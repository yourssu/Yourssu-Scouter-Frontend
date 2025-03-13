import { ApplicantState } from '@/data/applicants/schema.ts';

export const getApplicantsQueryKey = (
  semesterId?: number,
  state?: ApplicantState,
  search?: string,
) => {
  const baseKey = 'applicants';
  if (!semesterId) return [baseKey] as const;
  if (!state) return [baseKey, semesterId] as const;
  if (!search) return [baseKey, semesterId, state] as const;
  return [baseKey, semesterId, state, search] as const;
};

export const applicantStatesQueryKey = ['applicantStates'] as const;
