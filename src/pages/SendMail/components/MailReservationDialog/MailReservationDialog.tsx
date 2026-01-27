import { useState } from 'react';

import { CalendarContent } from '@/components/CalendarDialog/CalendarDialog';
import { MiniDateField } from '@/components/CalendarDialog/MiniDateField';
import { MiniTimeField } from '@/components/CalendarDialog/MiniTimeField';
import { Dialog } from '@/components/dialog';

export const MailReservationDialog = ({ open, onClose, onReserve }: any) => {
  const today = new Date();
  const [selectedDate, setSelectedDate] = useState<Date>(today);

  return (
    <Dialog onClose={onClose} open={open}>
      <Dialog.Header onClickCloseButton={onClose}>
        <Dialog.Title>메일 예약하기</Dialog.Title>
      </Dialog.Header>

      <Dialog.Content className="flex flex-row items-start gap-[20px]">
        <CalendarContent onSelect={setSelectedDate} selectedDate={selectedDate} />
        <div className="flex w-[240px] flex-col gap-4 pt-12">
          <div className="flex w-full flex-col gap-2">
            <MiniDateField date={selectedDate} />
            <MiniTimeField date={selectedDate} onDateChange={setSelectedDate} />
          </div>
        </div>
      </Dialog.Content>

      <Dialog.ButtonGroup>
        <Dialog.Button
          className="h-[52px] w-[95px]"
          onClick={() => onReserve(selectedDate)}
          size="large"
          variant="filledPrimary"
        >
          예약하기
        </Dialog.Button>
      </Dialog.ButtonGroup>
    </Dialog>
  );
};
