import { useQueryClient } from '@tanstack/react-query';
import {
  applicantOptions,
  ApplicantQueryParams,
} from '@/query/applicant/options.ts';

export const useInvalidateApplicants = (params?: ApplicantQueryParams) => {
  const queryClient = useQueryClient();

  return () =>
    queryClient.invalidateQueries({
      queryKey: applicantOptions(params).queryKey,
    });
};
