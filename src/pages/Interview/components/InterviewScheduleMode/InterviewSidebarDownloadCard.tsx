import { BoxButton } from '@yourssu/design-system-react';
import { useLoading } from 'react-simplikit';

import { useAlertDialog } from '@/hooks/useAlertDialog';
import { useInterviewScheduleCalendarRefContext } from '@/pages/Interview/components/InterviewScheduleMode/context';

export const InterviewSidebarDownloadCard = () => {
  const openAlertDialog = useAlertDialog();
  const [loading, startLoading] = useLoading();
  const { convert } = useInterviewScheduleCalendarRefContext();

  const onClick = async () => {
    const png = await startLoading(
      convert((el) => {
        const rect = el.getBoundingClientRect();
        return {
          width: rect.width,
          height: rect.height,
          backgroundColor: 'var(--color-bg-basicDefault)',
          skipFonts: true, // 폰트 에셋 fetching을 방지해서 html-to-image의 css cross origin 이슈를 막아요.
        };
      }),
    );

    const answer = await openAlertDialog({
      title: '시간표',
      content: <img alt="wow" className="w-[520px]" src={png} />,
      primaryButtonText: '저장하기',
      secondaryButtonText: '취소',
      closeableWithOutside: false,
    });

    if (answer) {
      const a = document.createElement('a');
      a.download = '시간표.png';
      a.href = png;
      a.click();
    }
  };

  return (
    <div className="bg-bg-basicDefault border-line-basicMedium flex w-full shrink-0 flex-col items-start gap-3 rounded-[14px] border p-4">
      <div className="flex shrink-0 items-center">
        <p className="typo-b1_sb_16 text-text-basicSecondary text-center">면접 일정 저장</p>
      </div>
      <div className="flex w-full shrink-0 flex-col py-2.5">
        <p className="typo-b1_rg_16 text-text-basicTertiary truncate text-left">
          Jpeg로 저장된 면접 일정을 다운로드 할 수 있어요!
        </p>
      </div>
      <BoxButton
        className="w-full"
        disabled={loading}
        onClick={onClick}
        size="small"
        variant="filledPrimary"
      >
        {loading ? '시간표를 변환하고 있어요...' : '시간표 저장하기'}
      </BoxButton>
    </div>
  );
};
