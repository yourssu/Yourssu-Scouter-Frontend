import { z } from 'zod';

export const ScheduleSchema = z.object({
  id: z.number(),
  name: z.string(),
  part: z.string(),
  startTime: z.string(),
  endTime: z.string(),
});

export const ScheduleArraySchema = z.array(ScheduleSchema);

export type Schedule = z.infer<typeof ScheduleSchema>;
