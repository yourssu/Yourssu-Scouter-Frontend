import { z } from 'zod';
import { DateSchema, EmailSchema, PhoneNumberSchema } from '@/scheme/common.ts';

const DivisionSchema = z.enum(['운영', '개발', '디자인']);

export const ApplicantStateSchema = z.enum([
  '심사 진행 중',
  '서류 불합',
  '면접 불합',
  '인큐베이팅 불합',
  '최종 합격',
]);

export const ApplicantSchema = z.object({
  applicantId: z.number(),
  division: DivisionSchema,
  part: z.string(),
  name: z.string(),
  state: ApplicantStateSchema,
  applicationDate: DateSchema,
  email: EmailSchema,
  phoneNumber: PhoneNumberSchema,
  department: z.string(),
  studentId: z.string(),
  semester: z.string(),
  age: z.string(),
});

export const PatchApplicantSchema = ApplicantSchema.omit({
  applicantId: true,
  part: true,
  division: true,
  department: true,
  semester: true,
})
  .extend({
    partId: z.number(),
    departmentId: z.number(),
    academicSemester: z.string(),
  })
  .partial();

export const ApplicantStateArraySchema = z.array(ApplicantStateSchema);

export const ApplicantArraySchema = z.array(ApplicantSchema);

export type ApplicantState = z.infer<typeof ApplicantStateSchema>;

export type Applicant = z.infer<typeof ApplicantSchema>;

export type PatchApplicant = z.infer<typeof PatchApplicantSchema>;
