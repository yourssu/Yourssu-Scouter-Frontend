import { UUID } from 'crypto';

import { AutoSchedule } from '@/query/schedule/schema';

export type AutoScheduleCandidate = {
  id: UUID;
  schedules: AutoSchedule[];
};
