import { z } from 'zod';

import { partNames } from '@/types/part';

export const ScheduleSchema = z.object({
  id: z.number(),
  name: z.string(),
  part: z.enum(partNames),
  startTime: z.string(),
  endTime: z.string(),
});

export const AutoScheduleSchema = z.object({
  applicantId: z.number(),
  applicantName: z.string(),
  part: z.enum(partNames),
  startTime: z.string(),
  endTime: z.string(),
});

export const ScheduleArraySchema = z.array(ScheduleSchema);
export const AutoScheduleArraySchema = z.array(AutoScheduleSchema);

export type Schedule = z.infer<typeof ScheduleSchema>;
export type AutoSchedule = z.infer<typeof AutoScheduleSchema>;
