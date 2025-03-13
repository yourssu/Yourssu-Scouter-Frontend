import { z } from 'zod';

export const SemesterSchema = z.object({
  semesterId: z.number(),
  semester: z.string(),
});

export const SemesterArraySchema = z.array(SemesterSchema);

export type Schema = z.infer<typeof SemesterSchema>;
