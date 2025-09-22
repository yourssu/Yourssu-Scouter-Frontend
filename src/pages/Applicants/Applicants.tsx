import { useSuspenseQuery } from '@tanstack/react-query';
import { useTabs } from '@yourssu/design-system-react';
import { Suspense } from 'react';

import { PageLayout } from '@/components/layouts/PageLayout';
import ScouterErrorBoundary from '@/components/ScouterErrorBoundary.tsx';
import ApplicantTab from '@/pages/Applicants/components/ApplicantTab/ApplicantTab.tsx';
import { applicantStateOptions } from '@/query/applicant/applicantState/options.ts';
import { ApplicantState } from '@/query/applicant/schema.ts';
import { StyledTabsListContainer } from '@/styles/pages/table.ts';

export const Applicants = () => {
  const [Tabs] = useTabs<ApplicantState>({
    defaultTab: '심사 진행 중',
    scrollable: true,
  });
  const { data: memberStates } = useSuspenseQuery(applicantStateOptions());

  return (
    <PageLayout title="리쿠르팅 지원자">
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
                <ApplicantTab state={state} />
              </Suspense>
            </ScouterErrorBoundary>
          </Tabs.Panel>
        ))}
      </Tabs>
    </PageLayout>
  );
};
