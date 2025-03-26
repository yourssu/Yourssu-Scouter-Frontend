import { useMutation } from '@tanstack/react-query';
import { api } from '@/apis/api.ts';

export const usePostMembersFromApplicants = () => {
  return useMutation({
    mutationFn: () => {
      return api.post('members/include-from-applicants', { timeout: false });
    },
  });
};
