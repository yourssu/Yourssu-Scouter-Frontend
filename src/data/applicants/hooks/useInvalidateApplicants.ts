import { useQueryClient } from '@tanstack/react-query';
import { applicantKeys } from '@/data/applicants/key.ts';

export const useInvalidateApplicants = () => {
  const queryClient = useQueryClient();

  return () => queryClient.invalidateQueries({ queryKey: applicantKeys.all });
};
