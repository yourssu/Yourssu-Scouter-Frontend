import { useSuspenseQuery } from '@tanstack/react-query';
import { Suspense } from 'react';

import { PageLayout } from '@/components/layouts/PageLayout';
import ScouterErrorBoundary from '@/components/ScouterErrorBoundary.tsx';
import { Tab } from '@/components/Tab';
import MemberTab from '@/pages/Members/components/MemberTab/MemberTab.tsx';
import { memberStateOptions } from '@/query/member/memberState/options.ts';

export const Members = () => {
  const { data: memberStates } = useSuspenseQuery(memberStateOptions());

  return (
    <PageLayout title="유어슈 멤버">
      <Tab defaultTab="액티브" tabListClassName="px-10" tabs={memberStates}>
        {({ tab }) => (
          <div className="border-line-basicLight border-t px-10 pb-12">
            <ScouterErrorBoundary>
              <Suspense>
                <MemberTab state={tab} />
              </Suspense>
            </ScouterErrorBoundary>
          </div>
        )}
      </Tab>
    </PageLayout>
  );
};
