import { api } from '@/apis/api.ts';
import { PatchApplicant, PatchApplicantSchema } from '@/query/applicant/schema.ts';

interface PatchApplicantParams {
  applicantId: number;
  params: PatchApplicant;
}

export const patchApplicant = ({ applicantId, params }: PatchApplicantParams) => {
  return api.patch(`applicants/${applicantId}`, {
    body: JSON.stringify(PatchApplicantSchema.parse(params)),
  });
};
