import {z} from 'zod';

export const PartArraySchema = z.array(z.object({
    partId: z.number(),
    partName: z.string(),
}));

