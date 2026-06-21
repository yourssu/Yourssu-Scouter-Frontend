import { isSameDay } from 'date-fns';

import {
  minutesToPixelHeight,
  minutesToPixelTop,
} from '@/pages/NewInterview/NewInterviewNew/utils/dragPosition';

// NOTE: legacy에서는 `@/styles/__generated__/colors.gen` 의 `vars.violet600` 를 사용했으나
// 이 레포에는 해당 모듈이 없어 Design.css 의 --violet600(#4a3fe0) 값을 직접 주입합니다.
const previewColor = '#4a3fe0';

interface DragPreviewProps {
  date: Date;
  dragCurrent: null | { date: Date; minutes: number };
  dragStart: null | { date: Date; minutes: number };
  isDragging: boolean;
}

/**
 * 드래그 중 미리보기 영역을 렌더링하는 컴포넌트입니다.
 */
export const DragPreview = ({ date, isDragging, dragStart, dragCurrent }: DragPreviewProps) => {
  if (!isDragging || !dragStart || !dragCurrent || !isSameDay(dragStart.date, date)) {
    return null;
  }

  const startMinutes = Math.min(dragStart.minutes, dragCurrent.minutes);
  const endMinutes = Math.max(dragStart.minutes, dragCurrent.minutes);
  const top = minutesToPixelTop(startMinutes);
  const height = minutesToPixelHeight(endMinutes - startMinutes);

  // 드래그 방향에 따라 그라데이션 방향 결정
  const isDraggingUp = dragCurrent.minutes < dragStart.minutes;
  const gradientDirection = isDraggingUp ? 'to top' : 'to bottom';

  return (
    <div
      className="pointer-events-none absolute right-0.5 left-0.5 rounded"
      style={{
        top: `${top}px`,
        height: `${height}px`,
        background: `linear-gradient(${gradientDirection}, color-mix(in srgb, ${previewColor} 60%, transparent), color-mix(in srgb, ${previewColor} 10%, transparent))`,
        border: `2px dashed ${previewColor}`,
      }}
    />
  );
};
