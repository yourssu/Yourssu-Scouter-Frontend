import {useSuspenseQuery} from "@tanstack/react-query";
import {api} from "@/apis/api.ts";
import {ApplicantStateArraySchema} from "@/scheme/applicant.ts";

export const useGetApplicantStates = () => {
    return useSuspenseQuery({
        queryKey: ['applicantStates'],
        queryFn: async () => {
            const data = await api.get('applicants/states').json();
            return ApplicantStateArraySchema.parse(data);
        }
    })
};