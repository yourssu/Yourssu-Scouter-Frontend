type ScheduleCreationPayload = {
  partId: number;
  scheduleDuration: '1시간' | '30분';
};

export type CalendarModeType =
  | { payload: ScheduleCreationPayload; type: '일정수동지정' }
  | { payload: ScheduleCreationPayload; type: '일정자동생성' }
  | { type: '면접일정보기' }
  | { type: '희망일정보기' };
