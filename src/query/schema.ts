import { z } from 'zod';

export const LastUpdatedTimeSchema = z.object({
  lastUpdatedTime: z.union([z.iso.datetime(), z.null()]),
});
