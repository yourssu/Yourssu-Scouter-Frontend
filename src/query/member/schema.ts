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

const NicknameSchema = z
  .string()
  .regex(/^[a-zA-Z]+\([가-힣]+\)$/, '영어(한글) 형식으로 입력해주세요');

const YourssuEmailSchema = z
  .string()
  .regex(
    /^[a-zA-Z0-9._-]+\.urssu@gmail\.com$/,
    '~.urssu@gmail.com 형식으로 입력해주세요',
  );

const MemberRoleSchema = z.enum(['Lead', 'ViceLead', 'Member']);

const MemberStateSchema = z.enum(['액티브', '비액티브', '졸업', '탈퇴']);

const BaseMemberSchema = z.object({
  memberId: z.number(),
  parts: z.array(PartSchema),
  role: MemberRoleSchema,
  name: z.string(),
  nickname: NicknameSchema,
  email: YourssuEmailSchema,
  phoneNumber: PhoneNumberSchema,
  department: z.string(),
  studentId: z.string(),
  birthDate: DateSchema,
  joinDate: DateSchema,
  note: z.string(),
});

const ActiveMemberSchema = BaseMemberSchema.extend({
  membershipFee: z.boolean(),
  state: z.literal('액티브'),
});

const InactiveMemberSchema = BaseMemberSchema.extend({
  activePeriod: PeriodSchema,
  expectedReturnSemester: z.string(),
  inactivePeriod: PeriodSchema,
  state: z.literal('비액티브'),
});

const GraduatedMemberSchema = BaseMemberSchema.extend({
  activePeriod: PeriodSchema,
  isAdvisorDesired: z.boolean(),
  state: z.literal('졸업'),
});

const WithdrawnMemberSchema = BaseMemberSchema.extend({
  state: z.literal('탈퇴'),
});

const MemberSchema = z.discriminatedUnion('state', [
  ActiveMemberSchema,
  InactiveMemberSchema,
  GraduatedMemberSchema,
  WithdrawnMemberSchema,
]);

export const PatchMemberSchema = z
  .object({})
  .merge(ActiveMemberSchema)
  .merge(InactiveMemberSchema)
  .merge(GraduatedMemberSchema)
  .merge(WithdrawnMemberSchema)
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

export const MemberRoleArraySchema = z.array(MemberRoleSchema);

export const MemberArraySchema = z.array(MemberSchema);

export const MemberStateArraySchema = z.array(MemberStateSchema);

export type MemberState = z.infer<typeof MemberStateSchema>;

export type Member = z.infer<typeof MemberSchema>;

export type PatchMember = z.infer<typeof PatchMemberSchema>;
