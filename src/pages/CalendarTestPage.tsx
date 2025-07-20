import { CalendarDialog, formatDate } from '@/components/CalendarDialog/CalendarDialog';
import { DateField } from '@/components/CalendarDialog/DateField';
import { useState } from 'react';

const CalendarTestPage = () => {
  const [selectedDate, setSelectedDate] = useState(undefined as Date | undefined);

  return (
    <div style={{ padding: '40px' }}>
      <h2>📅 캘린더 다이얼로그 예제</h2>

      <CalendarDialog
        onSelect={(date) => setSelectedDate(date)}
        selectedDate={selectedDate}
        trigger={<DateField date={new Date()}/>}
      />

      <p style={{ marginTop: '20px' }}>
        선택된 날짜: <strong>{selectedDate ? formatDate(selectedDate) : '없음'}</strong>
      </p>
    </div>
  );
};

export default CalendarTestPage;