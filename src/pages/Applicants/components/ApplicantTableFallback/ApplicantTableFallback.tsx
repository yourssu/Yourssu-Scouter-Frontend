import { getCoreRowModel, useReactTable } from '@tanstack/react-table';
import Table from '@/components/Table/Table.tsx';
import { useQueryClient } from '@tanstack/react-query';
import { applicantOptions } from '@/query/applicant/options.ts';
import { useApplicantColumns } from '@/query/applicant/hooks/useApplicantColumns.tsx';

const ApplicantTableFallback = () => {
  const queryClient = useQueryClient();

  const data =
    queryClient.getQueryData(applicantOptions().queryKey) ?? ([] as const);

  const columns = useApplicantColumns();

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

export default ApplicantTableFallback;
