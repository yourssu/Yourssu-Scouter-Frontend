import { z } from 'zod';

// "YYYY.MM.DD HH:MM" 형식의 날짜-시간 스키마
const DateTimeSchema = z.string().refine(
  (value) => {
    // "YYYY.MM.DD HH:MM" 형식에 대한 정규식 패턴
    const pattern = /^\d{4}\.\d{2}\.\d{2} \d{2}:\d{2}$/;
    if (!pattern.test(value)) return false;

    // 날짜와 시간 구성요소 추출
    const [datePart, timePart] = value.split(' ');
    const [year, month, day] = datePart.split('.').map(Number);
    const [hour, minute] = timePart.split(':').map(Number);

    // 날짜 구성요소 유효성 검사
    const isValidYear = year >= 1000 && year <= 9999;
    const isValidMonth = month >= 1 && month <= 12;

    // 월별 일 수 확인 (윤년 로직 포함)
    const daysInMonth = [
      31, // 1월
      year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0) ? 29 : 28, // 2월
      31, // 3월
      30, // 4월
      31, // 5월
      30, // 6월
      31, // 7월
      31, // 8월
      30, // 9월
      31, // 10월
      30, // 11월
      31, // 12월
    ];

    const isValidDay = day >= 1 && day <= daysInMonth[month - 1];

    // 시간 구성요소 유효성 검사
    const isValidHour = hour >= 0 && hour <= 23;
    const isValidMinute = minute >= 0 && minute <= 59;

    return (
      isValidYear && isValidMonth && isValidDay && isValidHour && isValidMinute
    );
  },
  {
    message:
      '잘못된 날짜-시간 형식입니다. 예상 형식: YYYY.MM.DD HH:MM (예: 2025.04.11 22:40)',
  },
);

export const LastUpdatedTimeSchema = z.object({
  lastUpdatedTime: z.union([DateTimeSchema, z.null()]),
});
