import { getCoreRowModel, useReactTable } from '@tanstack/react-table';
import Table from '@/components/Table/Table.tsx';

const ApplicantTableFallback = () => {
  const table = useReactTable({
    [],
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

export default ApplicantTableFallback;
