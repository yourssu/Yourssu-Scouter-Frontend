import { getCoreRowModel, useReactTable } from '@tanstack/react-table';
import { ApplicantState, PatchApplicant } from '@/query/applicant/schema.ts';
import Table from '@/components/Table/Table.tsx';
import { useInvalidateApplicants } from '@/query/applicant/hooks/useInvalidateApplicants.ts';
import { useMutation, useSuspenseQuery } from '@tanstack/react-query';
import { applicantOptions } from '@/query/applicant/options.ts';
import { patchApplicant } from '@/query/applicant/mutations/patchApplicant.ts';
import { useApplicantColumns } from '@/query/applicant/hooks/useApplicantColumns.tsx';

interface ApplicantTableProps {
  state: ApplicantState;
  semesterId: number;
  name: string;
}

const ApplicantTable = ({ state, semesterId, name }: ApplicantTableProps) => {
  const { data } = useSuspenseQuery(
    applicantOptions({ state, semesterId, name }),
  );

  const invalidateApplicants = useInvalidateApplicants({
    state,
    name,
    semesterId,
  });

  const patchApplicantMutation = useMutation({
    mutationFn: patchApplicant,
    onSuccess: invalidateApplicants,
  });

  const handleClick = (
    applicantId: number,
    field: keyof PatchApplicant,
    value: unknown,
  ) => {
    patchApplicantMutation.mutate({
      applicantId,
      params: { [field]: value },
    });
  };

  const columns = useApplicantColumns(handleClick);

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

export default ApplicantTable;
