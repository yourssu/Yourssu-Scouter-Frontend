import {FormProvider, useForm} from "react-hook-form";
import TableSearchBar from "@/components/TableSearchBar/TableSearchBar.tsx";
import {StyledContainer, StyledTopContainer} from "@/pages/Applicants/ApplicantTab/ApplicantTab.style.ts";
import ScouterErrorBoundary from "@/components/ScouterErrorBoundary.tsx";
import {Suspense} from "react";
import {ApplicantState} from "@/scheme/applicant.ts";
import ApplicantTable from "@/pages/Applicants/ApplicantTable/ApplicantTable.tsx";
import {SemesterStateButton} from "@/components/StateButton/SemesterStateButton.tsx";
import {useSearchParams} from "react-router";
import {useGetSemesters} from "@/hooks/useGetSemesters.ts";
import {useQueryClient} from "@tanstack/react-query";

interface ApplicantTabProps {
    state: ApplicantState;
}

const ApplicantTab = ({state}: ApplicantTabProps) => {
    const methods = useForm({
        defaultValues: {
            search: '',
        }
    });

    const {data: semesters} = useGetSemesters();

    const [searchParams, setSearchParams] = useSearchParams({semesterId: "1"});

    const semesterId = Number(searchParams.get('semesterId') ?? "1");

    const queryClient = useQueryClient();

    const onSemesterChange = async (semester: string) => {
        const semesterId = semesters
            .find(s => s.semester === semester)
            ?.semesterId
            .toString() ?? "0";

        setSearchParams({semesterId});
        await queryClient.invalidateQueries({queryKey: ['applicants']});
    }

    return <FormProvider {...methods}>
        <StyledContainer>
            <StyledTopContainer>
                <TableSearchBar placeholder="이름으로 검색"/>
                <SemesterStateButton
                    selectedValue={semesters.find(s => semesterId === s.semesterId)?.semester ?? "24-1학기"}
                    onStateChange={onSemesterChange}
                />
            </StyledTopContainer>
            <ScouterErrorBoundary>
                <Suspense>
                    <ApplicantTable state={state} semesterId={semesterId} search={methods.watch('search')} />
                </Suspense>
            </ScouterErrorBoundary>
        </StyledContainer>
    </FormProvider>
}

export default ApplicantTab;