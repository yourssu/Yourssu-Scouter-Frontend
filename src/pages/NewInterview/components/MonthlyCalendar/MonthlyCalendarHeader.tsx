import clsx from 'clsx';

const weekDaysKo = ['일', '월', '화', '수', '목', '금', '토'] as const;

export const MonthlyCalendarHeader = () => {
  return (
    <div
      className={clsx(
        'calendar-header-lighting-gradient sticky top-24 z-30 grid grid-cols-7 border-b border-[#f2f4f6] bg-[#ffffff] pb-2',
      )}
    >
      {weekDaysKo.map((day, index) => (
        <div
          className={clsx('text-15 pl-2', {
            'text-[#f66570]': index === 0,
            'text-[#8b95a1]': index !== 0,
          })}
          key={day}
        >
          {day}
        </div>
      ))}
    </div>
  );
};
