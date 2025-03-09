import { useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '@/apis/api.ts';

export const usePostApplicantsFromForms = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      await api.post('applicants/include-from-forms', { timeout: false });
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['applicants'] });
    },
  });
};
