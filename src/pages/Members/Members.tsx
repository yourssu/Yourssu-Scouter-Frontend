import {StyledContainer, StyledTabsListContainer, StyledTitle} from "@/pages/Members/Members.style.ts";
import {useTabs} from "@yourssu/design-system-react";
import Table from "@/components/Table/Table.tsx";

type TabType = 'active' | 'inactive' | 'graduation' | 'withdrawal';

const tabItems: Record<TabType, '액티브' | '비액티브' | '졸업' | '탈퇴'> = {
    'active': '액티브',
    'inactive': '비액티브',
    'graduation': '졸업',
    'withdrawal': '탈퇴'
}

export const Members = () => {
    const Tabs = useTabs<TabType>({defaultTab: 'active', scrollable: true});

    return <StyledContainer>
        <StyledTitle>유어슈 멤버</StyledTitle>
        <Tabs>
            <StyledTabsListContainer>
                <Tabs.List size="large">
                    {
                        (Object.keys(tabItems) as TabType[]).map((key) =>
                            <Tabs.Tab key={key} id={key}>{tabItems[key]}</Tabs.Tab>
                        )
                    }
                </Tabs.List>
            </StyledTabsListContainer>
            {
                (Object.keys(tabItems) as TabType[]).map((key) =>
                    <Tabs.Panel key={key} value={key}>
                        <Table tabType={tabItems[key]}/>
                    </Tabs.Panel>
                )
            }
        </Tabs>
    </StyledContainer>
}