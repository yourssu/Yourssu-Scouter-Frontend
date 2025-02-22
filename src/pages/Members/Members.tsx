import {
    StyledContainer,
    StyledTabsListContainer,
    StyledTitle
} from "@/pages/Members/Members.style.ts";
import {useTabs} from "@yourssu/design-system-react";
import {MemberState} from "@/scheme/member.ts";
import {useGetMemberStates} from "@/hooks/useGetMemberStates.ts";
import MemberTab from "@/components/MemberTab/MemberTab.tsx";

export const Members = () => {
    const Tabs = useTabs<MemberState>({defaultTab: '액티브', scrollable: true});
    const {data: memberStates} = useGetMemberStates();

    return <StyledContainer>
        <StyledTitle>유어슈 멤버</StyledTitle>
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
                        <MemberTab state={state}/>
                    </Tabs.Panel>
                )
            }
        </Tabs>
    </StyledContainer>
}