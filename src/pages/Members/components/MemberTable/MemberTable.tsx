import { MemberState } from '@/query/member/schema.ts';
import { getCoreRowModel, useReactTable } from '@tanstack/react-table';
import Table from '@/components/Table/Table.tsx';
import { useInvalidateMembers } from '@/query/member/hooks/useInvalidateMembers.ts';
import { useMutation, useSuspenseQuery } from '@tanstack/react-query';
import { memberOptions } from '@/query/member/options.ts';
import { patchMember } from '@/query/member/mutations/patchMember.ts';
import { useMemberColumns } from '@/query/member/hooks/useMemberColumns.tsx';

interface MemberTableProps {
  state: MemberState;
  search: string;
}

const MemberTable = ({ state, search }: MemberTableProps) => {
  const invalidateMembers = useInvalidateMembers(state);
  const patchMemberMutation = useMutation({
    mutationFn: patchMember,
    onSuccess: invalidateMembers,
  });

  const { data } = useSuspenseQuery(memberOptions(state, { search }));

  const columns = useMemberColumns(state, (memberId, field, value) =>
    patchMemberMutation.mutate({
      memberId,
      params: { [field]: value },
      state,
    }),
  );

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    enableColumnResizing: true,
  });

  return (
    <Table>
      <Table.Header headerGroups={table.getHeaderGroups()} />
      <Table.Body rows={table.getRowModel().rows} />
    </Table>
  );
};

export default MemberTable;
