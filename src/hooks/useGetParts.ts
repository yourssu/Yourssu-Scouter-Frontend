import {useSuspenseQuery} from "@tanstack/react-query";
import {api} from "@/apis/api.ts";
import {PartArraySchema} from "@/scheme/part.ts";

export const useGetParts = () => {
    return useSuspenseQuery({
        queryKey: ['parts'],
        queryFn: async () => {
            const data = await api.get('parts').json();
            return PartArraySchema.parse(data);
        }
    })
}