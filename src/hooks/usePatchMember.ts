import { useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '@/apis/api.ts';
import { MEMBER_URI } from '@/constants/uri.ts';
import {
  MemberState,
  PatchMember,
  PatchMemberSchema,
} from '@/scheme/member.ts';

interface PatchMemberParams {
  memberId: number;
  params: PatchMember;
}

interface UsePatchMemberProps {
  state: MemberState;
  refetchAfterPatch: boolean;
}

export const usePatchMember = ({
  state,
  refetchAfterPatch,
}: UsePatchMemberProps) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ memberId, params }: PatchMemberParams) => {
      await api.patch(`members/${MEMBER_URI[state]}/${memberId}`, {
        body: JSON.stringify(PatchMemberSchema.parse(params)),
      });
    },
    onSuccess: async () => {
      if (refetchAfterPatch)
        await queryClient.invalidateQueries({ queryKey: ['members', state] });
    },
  });
};
