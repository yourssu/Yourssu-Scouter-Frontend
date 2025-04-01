import { getCoreRowModel, useReactTable } from '@tanstack/react-table';
import Table from '@/components/Table/Table.tsx';
import { MemberState } from '@/query/member/schema.ts';
import { useQueryClient } from '@tanstack/react-query';
import { memberOptions } from '@/query/member/options.ts';
import { useMemberColumns } from '@/query/member/hooks/useMemberColumns.tsx';

interface MemberTableFallbackProps {
  state: MemberState;
}

const MemberTableFallback = ({ state }: MemberTableFallbackProps) => {
  const queryClient = useQueryClient();
  const data =
    queryClient.getQueryData(memberOptions(state).queryKey) || ([] as const);

  console.log('tableData', data);

  const columns = useMemberColumns(state);

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

export default MemberTableFallback;
