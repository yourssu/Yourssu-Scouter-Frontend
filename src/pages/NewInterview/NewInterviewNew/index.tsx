import { BoxButton } from '@yourssu/design-system-react';
import { Suspense } from 'react';
import { MdArrowBack } from 'react-icons/md';
import { useNavigate } from 'react-router';

import { SaveScheduleButton } from '@/pages/NewInterview/NewInterviewNew/components/SaveScheduleButton';
import { ScheduleCreationView } from '@/pages/NewInterview/NewInterviewNew/components/ScheduleCreationView';
import { ScheduleCreationProvider } from '@/pages/NewInterview/NewInterviewNew/context';

// NOTE: legacy의 PageLayout.Content(maxWidth/right) 는 이 레포에 없어 마크업으로 대체.
const ScheduleNewPageContent = () => {
  // NOTE: legacy는 @tanstack/react-router 의 useRouter().history.back() 을 사용했으나,
  // 이 레포는 react-router 를 사용해 useNavigate()(-1) 로 변경.
  const navigate = useNavigate();

  return (
    <div className="flex w-full flex-col pr-6 pl-10">
      <div className="flex w-full justify-between">
        <BoxButton
          leftIcon={<MdArrowBack />}
          onClick={() => navigate(-1)}
          size="small"
          variant="filledSecondary"
        >
          뒤로가기
        </BoxButton>
        <div className="flex gap-2">
          <SaveScheduleButton />
        </div>
      </div>
      <Suspense>
        <ScheduleCreationView />
      </Suspense>
    </div>
  );
};

export const NewInterviewNewPage = () => {
  return (
    <ScheduleCreationProvider>
      <Suspense>
        <ScheduleNewPageContent />
      </Suspense>
    </ScheduleCreationProvider>
  );
};
