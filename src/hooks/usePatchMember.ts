import {useMutation, useQueryClient} from "@tanstack/react-query";
import {api} from "@/apis/api.ts";
import {MEMBER_URI} from "@/constants/uri.ts";
import {MemberState, PatchMember, PatchMemberSchema} from "@/scheme/member.ts";

interface PatchMemberParams {
    memberId: number;
    params: PatchMember;
}

export const usePatchMember = (state: MemberState) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async ({memberId, params}: PatchMemberParams) => {
            const data = PatchMemberSchema.safeParse(params);
            console.log(data.data, data.success, data.error);
            await api.patch(`members/${MEMBER_URI[state]}/${memberId}`, {body: JSON.stringify(PatchMemberSchema.parse(params))});
        },
        onSuccess: async () => {
            await queryClient.invalidateQueries({queryKey: ['members', state]});
        }
    })
}