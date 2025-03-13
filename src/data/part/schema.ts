import { z } from 'zod';

const PartSchema = z.object({
  partId: z.number(),
  partName: z.string(),
});

export const PartArraySchema = z.array(PartSchema);

export type Part = z.infer<typeof PartSchema>;
