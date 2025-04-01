import { getCoreRowModel, useReactTable } from '@tanstack/react-table';
import Table from '@/components/Table/Table.tsx';
import { MemberState } from '@/query/member/schema.ts';
import { useMemberColumns } from '@/query/member/hooks/useMemberColumns.tsx';

interface MemberTableFallbackProps {
  state: MemberState;
}

const MemberTableFallback = ({ state }: MemberTableFallbackProps) => {
  const columns = useMemberColumns(state);

  const table = useReactTable({
    data: [],
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
