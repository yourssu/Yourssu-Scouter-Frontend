import { useEffect, useState } from 'react';

import { PageLayout } from '@/components/layouts/PageLayout';
import { useNavigationContext } from '@/components/Main/Navigation/NavigationContext';
import { Tab } from '@/components/Tab';
import { SendMail } from '@/pages/SendMail/SendMail';

const MailStates = ['예약됨', '전송 완료'];

export const MailPage = () => {
  const [isComposing, setIsComposing] = useState(false);
  const { setBackAction, clearBackAction } = useNavigationContext();

  useEffect(() => {
    if (isComposing) {
      setBackAction(() => setIsComposing(false));
    } else {
      clearBackAction();
    }
    return () => clearBackAction();
  }, [isComposing, setBackAction, clearBackAction]);

  if (isComposing) {
    return <SendMail />;
  }

  return (
    <PageLayout title="메일">
      <Tab defaultTab="예약됨" tabListClassName="px-10" tabs={MailStates}>
        {({ tab }) => (
          <div className="border-line-basicLight border-t px-10 pb-12">
            {tab === '예약됨' ? <div>예약된 메일</div> : <div>전송된 메일</div>}
          </div>
        )}
      </Tab>
    </PageLayout>
  );
};
