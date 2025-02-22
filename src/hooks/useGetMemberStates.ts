import {useSuspenseQuery} from "@tanstack/react-query";
import {api} from "@/apis/api.ts";
import {MemberStateArraySchema} from "@/scheme/member.ts";

export const useGetMemberStates = () => {
    return useSuspenseQuery({
        queryKey: ['memberStates'],
        queryFn: async () => {
            const data = await api.get('members/states').json();
            return MemberStateArraySchema.parse(data);
        }
    })
}