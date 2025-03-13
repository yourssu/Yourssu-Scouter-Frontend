import { useMutation } from '@tanstack/react-query';
import { api } from '@/apis/api.ts';
import { MEMBER_URI } from '@/constants/uri.ts';
import {
  MemberState,
  PatchMember,
  PatchMemberSchema,
} from '@/data/members/schema.ts';

interface PatchMemberParams {
  memberId: number;
  params: PatchMember;
}

export const usePatchMember = (state: MemberState) => {
  return useMutation({
    mutationFn: ({ memberId, params }: PatchMemberParams) => {
      return api.patch(`members/${MEMBER_URI[state]}/${memberId}`, {
        body: JSON.stringify(PatchMemberSchema.parse(params)),
      });
    },
  });
};
