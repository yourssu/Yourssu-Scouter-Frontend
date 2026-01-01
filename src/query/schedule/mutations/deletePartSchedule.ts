import { api } from '@/apis/api';

export const deletePartSchedule = (partId: number) => {
  return api.delete(`recruiter/schedule/part/${partId}`);
};
