export type CalendarModeType = '면접일정' | '수동생성' | '자동생성';

export const interviewDurationOptions = ['30분', '1시간'] as const;
export type InterviewDurationType = (typeof interviewDurationOptions)[number];

export type InterviewAutoScheduleStrategyType = '밀집형' | '분산형';
