import {z} from "zod";

export const SemesterArraySchema =  z.array(z.object({
    semesterId: z.number(),
    semester: z.string(),
}));

