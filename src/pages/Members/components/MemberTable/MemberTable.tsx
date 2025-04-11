import { MemberState } from '@/query/member/schema.ts';
import { getCoreRowModel, useReactTable } from '@tanstack/react-table';
import Table from '@/components/Table/Table.tsx';
import { useInvalidateMembers } from '@/query/member/hooks/useInvalidateMembers.ts';
import { useMutation, useSuspenseQuery } from '@tanstack/react-query';
import { memberOptions } from '@/query/member/options.ts';
import { patchMember } from '@/query/member/mutations/patchMember.ts';
import { useSnackbar } from '@yourssu/design-system-react';
import {
  PatchMemberHandler,
  useMemberColumns,
} from '@/query/member/hooks/useMemberColumns.tsx';

interface MemberTableProps {
  state: MemberState;
  search: string;
}

const MemberTable = ({ state, search }: MemberTableProps) => {
  const invalidateMembers = useInvalidateMembers(state);
  const { snackbar } = useSnackbar();

  const { mutate: patchMemberMutate } = useMutation({
    mutationFn: patchMember,
    onSuccess: async (_, { memberId }) => {
      await invalidateMembers();

      const member = data.find((d) => d.memberId === memberId);

      if (!member) return;

      snackbar({
        type: 'info',
        width: '400px',
        message: `${member.nickname}님의 정보가 변경되었습니다.`,
        duration: 3000,
        position: 'center',
      });
    },
    onError: () => {
      snackbar({
        type: 'error',
        width: '400px',
        message: '입력 형식이 올바르지 않습니다.',
        duration: 3000,
        position: 'center',
      });
    },
  });

  const { data } = useSuspenseQuery(memberOptions(state, { search }));

  const handlePatchMember: PatchMemberHandler = (memberId, field, value) =>
    patchMemberMutate({
      memberId,
      params: { [field]: value },
      state,
    });

  const columns = useMemberColumns(state, handlePatchMember);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    enableColumnResizing: true,
    manualFiltering: true,
  });

  return (
    <Table>
      <Table.Header headerGroups={table.getHeaderGroups()} />
      <Table.Body rows={table.getRowModel().rows} />
    </Table>
  );
};

export default MemberTable;
