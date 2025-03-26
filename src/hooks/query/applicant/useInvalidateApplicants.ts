import { useQueryClient } from '@tanstack/react-query';
import { applicantOptions } from '@/query/applicant/options.ts';

export const useInvalidateApplicants = () => {
  const queryClient = useQueryClient();

  return () =>
    queryClient.invalidateQueries({ queryKey: applicantOptions().queryKey });
};
