import {
    StyledContainer,
    StyledTabsListContainer,
    StyledTitle
} from "@/styles/pages/table.ts";
import {useTabs} from "@yourssu/design-system-react";
import ApplicantTab from "@/pages/Applicants/ApplicantTab/ApplicantTab.tsx";
import {useGetApplicantStates} from "@/hooks/useGetApplicantStates.ts";
import {ApplicantState} from "@/scheme/applicant.ts";

export const Applicants = () => {
    const Tabs = useTabs<ApplicantState>({defaultTab: '심사 진행 중', scrollable: true});
    const {data: memberStates} = useGetApplicantStates();

    return <StyledContainer>
        <StyledTitle>리쿠르팅 지원자</StyledTitle>
        <Tabs>
            <StyledTabsListContainer>
                <Tabs.List size="large">
                    {
                        memberStates.map((state) =>
                            <Tabs.Tab key={state} id={state}>{state}</Tabs.Tab>
                        )
                    }
                </Tabs.List>
            </StyledTabsListContainer>
            {
                memberStates.map((state) =>
                    <Tabs.Panel key={state} value={state}>
                        <ApplicantTab state={state}/>
                    </Tabs.Panel>
                )
            }
        </Tabs>
    </StyledContainer>
}