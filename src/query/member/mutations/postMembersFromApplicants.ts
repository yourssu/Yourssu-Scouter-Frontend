import { api } from '@/apis/api.ts';

export const postMembersFromApplicants = () => {
  return api.post('members/include-from-applicants', { timeout: false });
};
