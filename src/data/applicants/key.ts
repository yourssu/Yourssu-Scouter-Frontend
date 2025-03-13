import { ApplicantState } from '@/data/applicants/schema.ts';

export const getApplicantsQueryKey = (
  semesterId?: number,
  state?: ApplicantState,
  name?: string,
) => {
  const baseKey = 'applicants';
  if (!semesterId) return [baseKey] as const;
  if (!state) return [baseKey, semesterId] as const;
  if (!name) return [baseKey, semesterId, state] as const;
  return [baseKey, semesterId, state, name] as const;
};

export const applicantStatesQueryKey = ['applicantStates'] as const;
