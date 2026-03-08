import { z } from 'zod';

import { DateSchema, PhoneNumberSchema } from '@/scheme/common.ts';

const PartSchema = z.object({
  division: z.string(),
  part: z.string(),
});

const PeriodSchema = z.object({
  startSemester: z.string(),
  endSemester: z.string(),
});

const MemberRoleSchema = z.enum(['Lead', 'ViceLead', 'Member']);

const MemberStateSchema = z.enum(['액티브', '비액티브', '졸업', '탈퇴', '수료']);

const BaseMemberSchema = z.object({
  memberId: z.number(),
  parts: z.array(PartSchema),
  role: MemberRoleSchema,
  name: z.string(),
  nickname: z.string(),
  email: z.email(),
  phoneNumber: PhoneNumberSchema.nullable(),
  department: z.string(),
  studentId: z.string().nullable(),
  birthDate: DateSchema.nullable(),
  joinDate: DateSchema,
  note: z.string().nullable(),
});

export const MeSchema = BaseMemberSchema.omit({
  note: true,
}).extend({
  profileImageUrl: z.url(),
  stateUpdatedTime: z.iso.datetime(),
});

const ActiveMemberSchema = BaseMemberSchema.extend({
  membershipFee: z.boolean().nullable(),
  state: z.literal('액티브'),
});

const InactiveMemberSchema = BaseMemberSchema.extend({
  activePeriod: PeriodSchema.nullable(),
  expectedReturnSemester: z.string().nullable(),
  inactivePeriod: PeriodSchema.nullable(),
  state: z.literal('비액티브'),
});

const GraduatedMemberSchema = BaseMemberSchema.extend({
  activePeriod: PeriodSchema.nullable(),
  isAdvisorDesired: z.boolean().nullable(),
  state: z.literal('졸업'),
});

const CompletedMemberSchema = BaseMemberSchema.extend({
  activePeriod: PeriodSchema.nullable(),
  isAdvisorDesired: z.boolean().nullable(),
  state: z.literal('수료'),
});

const WithdrawnMemberSchema = BaseMemberSchema.extend({
  state: z.literal('탈퇴'),
});

const MemberSchema = z.discriminatedUnion('state', [
  ActiveMemberSchema,
  InactiveMemberSchema,
  GraduatedMemberSchema,
  WithdrawnMemberSchema,
  CompletedMemberSchema,
]);

export const PatchMemberSchema = z
  .object({})
  .merge(ActiveMemberSchema)
  .merge(InactiveMemberSchema)
  .merge(GraduatedMemberSchema)
  .merge(WithdrawnMemberSchema)
  .merge(CompletedMemberSchema)
  .omit({
    memberId: true,
    state: true,
    department: true,
    expectedReturnSemester: true,
  })
  .extend({
    partIds: z.array(z.number()),
    state: MemberStateSchema,
    departmentId: z.number(),
    expectedReturnSemesterId: z.number(),
  })
  .omit({ parts: true })
  .partial();

export const MemberResponseSchema = z.object({
  isSensitiveMasked: z.boolean(),
  members: z.array(MemberSchema),
});

export const MemberRoleArraySchema = z.array(MemberRoleSchema);

export const MemberStateArraySchema = z.array(MemberStateSchema);

export type MemberState = z.infer<typeof MemberStateSchema>;

export type Member = z.infer<typeof MemberSchema>;

export type PatchMember = z.infer<typeof PatchMemberSchema>;
