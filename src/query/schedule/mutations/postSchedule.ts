import { api } from '@/apis/api';

interface PostScheduleParams {
  schedules: Array<{
    applicantId: number;
    endTime: string;
    partId: number;
    startTime: string;
  }>;
}

export const postSchedule = (params: PostScheduleParams) => {
  return api.post('recruiter/schedule', {
    json: params.schedules,
  });
};
