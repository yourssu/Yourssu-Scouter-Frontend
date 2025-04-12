import { BoxButton } from '@yourssu/design-system-react';
import { Popover } from 'radix-ui';
import { useState } from 'react';
import styled from 'styled-components';

const StyledWrapper = styled.div`
  display: inline-block;
  width: 100%;
`;

const StyledContent = styled(Popover.Content)`
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
  padding: 16px;
  z-index: 1000;
`;

const StyledTitle = styled.h3`
  font-size: 16px;
  margin-top: 0;
  margin-bottom: 16px;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 8px;
  margin-top: 16px;
`;

interface CalendarDialogProps {
  onSelect: (date: string) => void;
  trigger: React.ReactNode;
  selectedDate?: string;
}

export const CalendarDialog = ({
  onSelect,
  trigger,
  selectedDate = '',
}: CalendarDialogProps) => {
  const [open, setOpen] = useState(false);

  const handleSelectDate = (date: string) => {
    onSelect(date);
    setOpen(false);
  };

  // 오늘 날짜를 MM/DD(요일) HH:MM 형식으로 반환
  const getTodayFormatted = () => {
    const now = new Date();
    const days = ['일', '월', '화', '수', '목', '금', '토'];
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const date = String(now.getDate()).padStart(2, '0');
    const day = days[now.getDay()];
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');

    return `${month}/${date}(${day}) ${hours}:${minutes}`;
  };

  return (
    <StyledWrapper>
      <Popover.Root open={open} onOpenChange={setOpen}>
        <Popover.Anchor asChild>
          <div onClick={() => setOpen(true)}>{trigger}</div>
        </Popover.Anchor>
        <StyledContent>
          <StyledTitle>날짜 선택</StyledTitle>
          <p>선택된 날짜: {selectedDate || '없음'}</p>
          <p>이곳에 캘린더 컴포넌트가 들어갈 예정입니다.</p>
          <ButtonGroup>
            <BoxButton
              size="small"
              variant="filledPrimary"
              onClick={() => handleSelectDate(getTodayFormatted())}
            >
              오늘 날짜 선택
            </BoxButton>
            <BoxButton
              size="small"
              variant="outlined"
              onClick={() => setOpen(false)}
            >
              닫기
            </BoxButton>
          </ButtonGroup>
        </StyledContent>
      </Popover.Root>
    </StyledWrapper>
  );
};
