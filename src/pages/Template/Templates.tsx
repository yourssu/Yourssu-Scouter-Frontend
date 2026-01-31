import { useTabs } from '@yourssu/design-system-react';

import { TemplateTab } from '@/pages/Template/components/TemplateTab/TemplateTab';

import { StyledContainer, StyledTabsListContainer, StyledTitle } from './Templates.style';

const templateTypes = ['메일'] as const;
type TabType = (typeof templateTypes)[number];

export const Templates = () => {
  const [Tabs] = useTabs<TabType>({
    defaultTab: templateTypes[0],
    scrollable: true,
  });

  return (
    <StyledContainer>
      <StyledTitle>템플릿</StyledTitle>
      <Tabs>
        <StyledTabsListContainer>
          <Tabs.List size="large">
            {templateTypes.map((type) => (
              <Tabs.Tab id={type} key={type}>
                {type}
              </Tabs.Tab>
            ))}
          </Tabs.List>
        </StyledTabsListContainer>
        {templateTypes.map((type) => (
          <Tabs.Panel key={type} value={type}>
            <TemplateTab />
          </Tabs.Panel>
        ))}
      </Tabs>
    </StyledContainer>
  );
};
