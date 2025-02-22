import {useSuspenseQuery} from "@tanstack/react-query";
import {MemberArraySchema, MemberState} from "@/scheme/member.ts";
import {api} from "@/apis/api.ts";

const uri: Record<MemberState, string> = {
    액티브: 'active',
    비액티브: 'inactive',
    졸업: 'graduated',
    탈퇴: 'withdrawn',
} as const;

export const useGetMembers = (state: MemberState, search = '') => {
    return useSuspenseQuery({
        queryKey: ['members', state, search],
        queryFn: async () => {
            const res = await api.get(`members/${uri[state]}`, {
                searchParams: {
                    search,
                }
            });
            const data = await res.json();
            return MemberArraySchema.parse(data);
        }
    })
}