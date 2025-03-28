import { api } from '@/apis/api.ts';

export const postApplicantsFromForms = () => {
  return api.post('applicants/include-from-forms', { timeout: false });
};
