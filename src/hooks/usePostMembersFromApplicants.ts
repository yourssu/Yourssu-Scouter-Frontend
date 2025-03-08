import {useMutation, useQueryClient} from "@tanstack/react-query";
import {api} from "@/apis/api.ts";

export const usePostMembersFromApplicants = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async () => {
            await api.post('members/include-from-applicants', {timeout: false});
        },
        onSuccess: async () => {
            await queryClient.invalidateQueries({queryKey: ['members']});
        }
    })
}