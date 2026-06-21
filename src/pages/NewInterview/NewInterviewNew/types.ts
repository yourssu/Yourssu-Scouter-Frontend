/**
 * 드래그로 생성 중인 임시 일정(draft)의 타입입니다.
 *
 * NOTE: legacy 레포의 `@/types/schedule` 에 정의되어 있던 `DraftScheduleType` 을
 * 사용처(context/hooks/SaveScheduleButton)에서 추론한 구조를 로컬에 정의해둔 것입니다.
 * 정확한 필드/타입은 백엔드 스펙과 함께 확인 필요 — TODO: 사용자 확인.
 */
export interface DraftSchedule {
  applicantId: number;
  applicantName: string;
  endTime: Date;
  partId: number;
  startTime: Date;
}
