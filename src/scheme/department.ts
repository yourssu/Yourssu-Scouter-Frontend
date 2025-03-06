import {z} from "zod";

export const DepartmentArraySchema =  z.array(z.object({
    departmentId : z.number(),
    departmentName : z.string(),
}));

