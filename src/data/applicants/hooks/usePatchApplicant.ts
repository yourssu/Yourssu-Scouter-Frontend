import { useMutation } from '@tanstack/react-query';
import { api } from '@/apis/api.ts';
import {
  PatchApplicant,
  PatchApplicantSchema,
} from '@/data/applicants/schema.ts';

interface PatchApplicantParams {
  applicantId: number;
  params: PatchApplicant;
}

export const usePatchApplicant = () => {
  return useMutation({
    mutationFn: async ({ applicantId, params }: PatchApplicantParams) => {
      await api.patch(`applicants/${applicantId}`, {
        body: JSON.stringify(PatchApplicantSchema.parse(params)),
      });
    },
  });
};
