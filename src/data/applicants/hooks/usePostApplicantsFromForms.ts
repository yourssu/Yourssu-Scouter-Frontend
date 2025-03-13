import { useMutation } from '@tanstack/react-query';
import { api } from '@/apis/api.ts';

export const usePostApplicantsFromForms = () => {
  return useMutation({
    mutationFn: async () => {
      await api.post('applicants/include-from-forms', { timeout: false });
    },
  });
};
