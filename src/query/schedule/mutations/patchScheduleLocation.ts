import { api } from '@/apis/api';
import { LocationType } from '@/types/location';

interface PatchScheduleLocationParams {
  locationDetail?: string;
  locationType: LocationType;
  scheduleId: number;
}

export const patchScheduleLocation = ({ scheduleId, ...body }: PatchScheduleLocationParams) => {
  return api.patch(`recruiter/schedule/${scheduleId}/location`, {
    json: body,
  });
};
