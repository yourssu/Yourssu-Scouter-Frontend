import { useSuspenseQuery } from '@tanstack/react-query';
import { useTabs } from '@yourssu/design-system-react';
import { Suspense } from 'react';

import { PageLayout } from '@/components/layouts/PageLayout';
import ScouterErrorBoundary from '@/components/ScouterErrorBoundary.tsx';
import MemberTab from '@/pages/Members/components/MemberTab/MemberTab.tsx';
import { memberStateOptions } from '@/query/member/memberState/options.ts';
import { MemberState } from '@/query/member/schema.ts';
import { StyledTabsListContainer } from '@/styles/pages/table.ts';

export const Members = () => {
  const [Tabs] = useTabs<MemberState>({
    defaultTab: '액티브',
    scrollable: true,
  });
  const { data: memberStates } = useSuspenseQuery(memberStateOptions());

  return (
    <PageLayout title="유어슈 멤버">
      <Tabs>
        <StyledTabsListContainer>
          <Tabs.List size="large">
            {memberStates.map((state) => (
              <Tabs.Tab id={state} key={state}>
                {state}
              </Tabs.Tab>
            ))}
          </Tabs.List>
        </StyledTabsListContainer>
        {memberStates.map((state) => (
          <Tabs.Panel key={state} value={state}>
            <ScouterErrorBoundary>
              <Suspense>
                <MemberTab state={state} />
              </Suspense>
            </ScouterErrorBoundary>
          </Tabs.Panel>
        ))}
      </Tabs>
    </PageLayout>
  );
};
