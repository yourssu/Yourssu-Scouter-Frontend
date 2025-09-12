import { getCoreRowModel, useReactTable } from '@tanstack/react-table';

import Table from '@/components/Table/Table.tsx';
import { useApplicantColumns } from '@/query/applicant/hooks/useApplicantColumns.tsx';

const ApplicantTableFallback = () => {
  const columns = useApplicantColumns();

  const table = useReactTable({
    data: [],
    columns,
    getCoreRowModel: getCoreRowModel(),
    enableColumnResizing: true,
  });

  return (
    <Table>
      <Table.Header headerGroups={table.getHeaderGroups()} />
    </Table>
  );
};

export default ApplicantTableFallback;
