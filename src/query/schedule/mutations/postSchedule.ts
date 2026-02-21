import { api } from '@/apis/api';

interface PostScheduleParams {
  schedules: Array<{
    applicantId: number;
    endTime: string;
    locationDetail?: string;
    locationType: '강의실' | '기타' | '동방' | '비대면';
    partId: number;
    startTime: string;
  }>;
}

export const postSchedule = (params: PostScheduleParams) => {
  return api.post('recruiter/schedule', {
    json: params.schedules,
  });
};
