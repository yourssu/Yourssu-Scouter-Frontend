import { useState } from 'react';

import { CalendarDialog } from '@/components/CalendarDialog/CalendarDialog';
import { formatTemplates } from '@/components/CalendarDialog/date';
import { DateField } from '@/components/CalendarDialog/DateField';

const CalendarTestPage = () => {
  const [selectedDate, setSelectedDate] = useState(undefined as Date | undefined);

  return (
    <div style={{ padding: '40px' }}>
      <h2>📅 캘린더 다이얼로그 예제</h2>

      <CalendarDialog
        onSelect={(date) => setSelectedDate(date)}
        selectedDate={selectedDate}
        trigger={<DateField date={new Date()} />}
      />

      <p style={{ marginTop: '20px' }}>
        선택된 날짜:{' '}
        <strong>{selectedDate ? formatTemplates['01/01(월) 00:00'](selectedDate) : '없음'}</strong>
      </p>
    </div>
  );
};

export default CalendarTestPage;
