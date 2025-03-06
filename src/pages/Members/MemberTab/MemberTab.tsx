import {
    StyledContainer,
    StyledLastUpdate,
    StyledLastUpdateTime,
    StyledTopContainer
} from "@/pages/Members/MemberTab/MemberTab.style.ts";
import TableSearchBar from "@/components/TableSearchBar/TableSearchBar.tsx";
import {FormProvider, useForm} from "react-hook-form";
import MemberTable from "@/pages/Members/MemberTable/MemberTable.tsx";
import {MemberState} from "@/scheme/member.ts";
import {Suspense} from "react";
import ScouterErrorBoundary from "@/components/ScouterErrorBoundary.tsx";
import {BoxButton, IcRetryRefreshLine} from "@yourssu/design-system-react";

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
            <StyledTopContainer>
                <TableSearchBar placeholder="이름 혹은 닉네임으로 검색"/>
                <StyledLastUpdate>
                    <StyledLastUpdateTime>
                        <span>마지막 업데이트</span>
                        <span>2024. 07. 21</span>
                        <span>23:00</span>
                    </StyledLastUpdateTime>
                    <BoxButton
                        leftIcon={<IcRetryRefreshLine />}
                        variant='outlined'
                        size='small'
                    >
                        업데이트
                    </BoxButton>
                </StyledLastUpdate>
            </StyledTopContainer>
            <ScouterErrorBoundary>
                <Suspense>
                    <MemberTable state={state} search={methods.watch('search')} />
                </Suspense>
            </ScouterErrorBoundary>
        </StyledContainer>
    </FormProvider>
}

export default MemberTab;