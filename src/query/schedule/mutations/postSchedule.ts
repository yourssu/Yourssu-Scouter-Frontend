import { api } from '@/apis/api';
import { LocationType } from '@/types/location';

interface PostScheduleParams {
  schedules: Array<{
    applicantId: number;
    endTime: string;
    locationDetail?: string;
    locationType: LocationType;
    partId: number;
    startTime: string;
  }>;
}

export const postSchedule = (params: PostScheduleParams) => {
  return api.post('recruiter/schedule', {
    json: params.schedules,
  });
};
