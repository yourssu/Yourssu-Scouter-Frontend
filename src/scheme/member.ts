import {z} from 'zod';

const PartSchema = z.object({
    division: z.string(),
    part: z.string(),
});

const PeriodSchema = z.object({
    startSemester: z.string(),
    endSemester: z.string(),
})

const MemberRoleSchema = z.enum(['Lead', 'ViceLead', 'Member']);

const MemberStateSchema = z.enum(['액티브', '비액티브', '졸업', '탈퇴']);

const BaseMemberSchema = z.object({
    memberId: z.number(),
    parts: z.array(PartSchema),
    role: MemberRoleSchema,
    name: z.string(),
    nickname: z.string(),
    email: z.string(),
    phoneNumber: z.string(),
    department: z.string(),
    studentId: z.string(),
    birthDate: z.string(),
    joinDate: z.string(),
    note: z.string(),
});

const ActiveMemberSchema = BaseMemberSchema.extend({
    membershipFee: z.boolean(),
    state: z.literal('액티브'),
})

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
})

const WithdrawnMemberSchema = BaseMemberSchema.extend({
    state: z.literal('탈퇴'),
});

const MemberSchema = z.discriminatedUnion('state', [
    ActiveMemberSchema,
    InactiveMemberSchema,
    GraduatedMemberSchema,
    WithdrawnMemberSchema
]);

export const MemberRoleArraySchema = z.array(MemberRoleSchema);

export const MemberArraySchema = z.array(MemberSchema);

export const MemberStateArraySchema = z.array(MemberStateSchema);

export type MemberState = z.infer<typeof MemberStateSchema>

export type Member = z.infer<typeof MemberSchema>