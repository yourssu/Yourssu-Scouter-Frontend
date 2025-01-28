import {StyledTabsListContainer, StyledTitle} from "@/pages/Members/Members.style.ts";
import {useTabs} from "@yourssu/design-system-react";
import Table from "@/components/Table/Table.tsx";

type TabType = 'active' | 'inactive' | 'graduation' | 'withdrawal';

export const Members = () => {
    const Tabs = useTabs<TabType>({ defaultTab: 'active', scrollable: true });

    return <div style={{width: '100%'}}>
        <StyledTitle>유어슈 멤버</StyledTitle>
        <Tabs>
            <StyledTabsListContainer>
                <Tabs.List size="large">
                    <Tabs.Tab id="active">액티브</Tabs.Tab>
                    <Tabs.Tab id="inactive">비액티브</Tabs.Tab>
                    <Tabs.Tab id="graduation">졸업</Tabs.Tab>
                    <Tabs.Tab id="withdrawal">탈퇴</Tabs.Tab>
                </Tabs.List>
            </StyledTabsListContainer>
            <Tabs.Panel value="active">
                <Table />
            </Tabs.Panel>
            <Tabs.Panel value="inactive">
                <Table />
            </Tabs.Panel>
            <Tabs.Panel value="graduation">
                <Table />
            </Tabs.Panel>
            <Tabs.Panel value="withdrawal">
                <Table />
            </Tabs.Panel>
        </Tabs>
    </div>
}