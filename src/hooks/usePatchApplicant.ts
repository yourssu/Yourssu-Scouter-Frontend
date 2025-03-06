import {useMutation, useQueryClient} from "@tanstack/react-query";
import {api} from "@/apis/api.ts";
import {PatchApplicant, PatchApplicantSchema} from "@/scheme/applicant.ts";

interface PatchApplicantParams {
    applicantId: number;
    params: PatchApplicant
}

export const usePatchApplicant = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async ({applicantId, params}: PatchApplicantParams) => {
            await api.patch(`applicants/${applicantId}`, {body: JSON.stringify(PatchApplicantSchema.parse(params))});
        },
        onSuccess: async () => {
            await queryClient.invalidateQueries({queryKey: ['applicants']});
        }
    })
}