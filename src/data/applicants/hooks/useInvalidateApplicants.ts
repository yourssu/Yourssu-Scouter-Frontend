import { useQueryClient } from '@tanstack/react-query';
import { getApplicantsQueryKey } from '@/data/applicants/key.ts';

export const useInvalidateApplicants = () => {
  const queryClient = useQueryClient();

  return () =>
    queryClient.invalidateQueries({ queryKey: getApplicantsQueryKey() });
};
