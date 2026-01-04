import { BoxButton } from '@yourssu/design-system-react';
import { assert } from 'es-toolkit';
import { CgArrowsExchange } from 'react-icons/cg';

import { useAlertDialog } from '@/hooks/useAlertDialog';
import { useInterviewCalendarModeContext } from '@/pages/Interview/context';

export const ScheduleModeToggleButton = () => {
  const { calendarMode, setCalendarMode } = useInterviewCalendarModeContext();
  assert(
    calendarMode === '수동생성' || calendarMode === '자동생성',
    'ScheduleModeToggleButton은 수동생성/자동생성 모드에서만 사용할 수 있어요.',
  );

  const openAlertDialog = useAlertDialog();

  const nextMode = calendarMode === '수동생성' ? '자동생성' : '수동생성';

  const onClick = async () => {
    const answer = await openAlertDialog({
      title: `시간표 ${nextMode} 모드로 변경할까요?`,
      content: '변경한 내용은 저장되지 않아요.',
      primaryButtonText: '변경하기',
      secondaryButtonText: '취소',
    });
    if (answer) {
      setCalendarMode(nextMode);
    }
  };

  return (
    <BoxButton leftIcon={<CgArrowsExchange />} onClick={onClick} size="small" variant="outlined">
      시간표 {nextMode} 하기
    </BoxButton>
  );
};
