import { useSuspenseQuery } from '@tanstack/react-query';
import { Suspense } from 'react';

import { PageLayout } from '@/components/layouts/PageLayout';
import ScouterErrorBoundary from '@/components/ScouterErrorBoundary.tsx';
import { Tab } from '@/components/Tab';
import ApplicantTab from '@/pages/Applicants/components/ApplicantTab/ApplicantTab.tsx';
import { applicantStateOptions } from '@/query/applicant/applicantState/options.ts';

export const Applicants = () => {
  const { data: memberStates } = useSuspenseQuery(applicantStateOptions());

  return (
    <PageLayout title="리쿠르팅 지원자">
      <Tab defaultTab="심사 진행 중" tabListClassName="px-10" tabs={memberStates}>
        {({ tab }) => (
          <div className="border-line-basicLight border-t px-10 pb-12">
            <ScouterErrorBoundary>
              <Suspense>
                <ApplicantTab state={tab} />
              </Suspense>
            </ScouterErrorBoundary>
          </div>
        )}
      </Tab>
    </PageLayout>
  );
};
