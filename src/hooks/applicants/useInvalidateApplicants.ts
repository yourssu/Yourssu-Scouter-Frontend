import { useQueryClient } from '@tanstack/react-query';

export const useInvalidateApplicants = () => {
  const queryClient = useQueryClient();

  return () => queryClient.invalidateQueries({ queryKey: ['applicants'] });
};
