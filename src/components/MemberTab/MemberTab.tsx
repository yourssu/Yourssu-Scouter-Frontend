import {StyledContainer} from "@/components/MemberTab/MemberTab.style.ts";
import TableSearchBar from "@/components/TableSearchBar/TableSearchBar.tsx";
import {FormProvider, useForm} from "react-hook-form";
import MemberTable from "@/components/MemberTable/MemberTable.tsx";
import {MemberState} from "@/scheme/member.ts";
import {Suspense} from "react";
import ScouterErrorBoundary from "@/components/ScouterErrorBoundary.tsx";

interface MemberTabProps {
    state: MemberState;
}

const MemberTab = ({state}: MemberTabProps) => {
    const methods = useForm({
        defaultValues: {
            search: '',
        }
    });

    return <FormProvider {...methods}>
        <StyledContainer>
            <TableSearchBar />
            <ScouterErrorBoundary>
                <Suspense>
                    <MemberTable state={state} search={methods.watch('search')} />
                </Suspense>
            </ScouterErrorBoundary>
        </StyledContainer>
    </FormProvider>
}

export default MemberTab;