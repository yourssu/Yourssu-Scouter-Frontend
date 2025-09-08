import { api } from '@/apis/api.ts';
import { MEMBER_URI } from '@/constants/uri.ts';
import { MemberState, PatchMember, PatchMemberSchema } from '@/query/member/schema.ts';

interface PatchMemberParams {
  memberId: number;
  params: PatchMember;
  state: MemberState;
}

export const patchMember = ({ state, memberId, params }: PatchMemberParams) => {
  return api.patch(`members/${MEMBER_URI[state]}/${memberId}`, {
    body: JSON.stringify(PatchMemberSchema.parse(params)),
  });
};
