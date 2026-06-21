import { parseISO } from 'date-fns';

import { DraftSchedule } from '@/pages/NewInterview/NewInterviewNew/types';
import { Applicant } from '@/query/applicant/schema';
import { Schedule } from '@/query/schedule/schema';

/**
 * 이미 저장된 면접 일정(Schedule)을 draft 일정으로 변환합니다.
 *
 * NOTE: `Schedule` 스키마에는 `applicantId`가 없고 `name`/`part`만 있어요.
 * 따라서 기존 `WeeklyCalendarGrid`와 동일하게 `applicant.name === schedule.name`
 * 기준으로 지원자를 매칭합니다. 파트별로 이미 조회된 `applicants`(선택 파트) 안에서
 * 매칭하므로 동일 파트 내 동명이인이 없다고 가정해요.
 * 매칭되지 않은 일정(심사 진행 중이 아닌 지원자 등)은 무시해요.
 */
export const convertSchedulesToDrafts = (
  schedules: Schedule[],
  applicants: Applicant[],
  partId: number,
): DraftSchedule[] => {
  const drafts: DraftSchedule[] = [];

  for (const schedule of schedules) {
    const applicant = applicants.find((a) => a.name === schedule.name && a.part === schedule.part);
    if (!applicant) {
      continue;
    }

    drafts.push({
      applicantId: applicant.applicantId,
      applicantName: schedule.name,
      endTime: parseISO(schedule.endTime),
      partId,
      startTime: parseISO(schedule.startTime),
    });
  }

  return drafts;
};
