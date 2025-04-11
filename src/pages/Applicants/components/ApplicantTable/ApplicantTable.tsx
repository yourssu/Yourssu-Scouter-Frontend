import { getCoreRowModel, useReactTable } from '@tanstack/react-table';
import { ApplicantState } from '@/query/applicant/schema.ts';
import Table from '@/components/Table/Table.tsx';
import { useInvalidateApplicants } from '@/query/applicant/hooks/useInvalidateApplicants.ts';
import { useMutation, useSuspenseQuery } from '@tanstack/react-query';
import { applicantOptions } from '@/query/applicant/options.ts';
import { patchApplicant } from '@/query/applicant/mutations/patchApplicant.ts';
import {
  PatchApplicantHandler,
  useApplicantColumns,
} from '@/query/applicant/hooks/useApplicantColumns.tsx';
import { useSnackbar } from '@yourssu/design-system-react';

interface ApplicantTableProps {
  state: ApplicantState;
  semesterId: number;
  partId: number | null;
  name: string;
}

const ApplicantTable = ({
  state,
  semesterId,
  name,
  partId,
}: ApplicantTableProps) => {
  const { data } = useSuspenseQuery(
    applicantOptions({ state, semesterId, name, partId }),
  );

  const { snackbar } = useSnackbar();

  const invalidateApplicants = useInvalidateApplicants({
    state,
    name,
    semesterId,
    partId,
  });

  const { mutate: patchApplicantMutate } = useMutation({
    mutationFn: patchApplicant,
    onSuccess: async (_, { applicantId }) => {
      await invalidateApplicants();

      const applicant = data.find((d) => d.applicantId === applicantId);

      if (!applicant) return;

      snackbar({
        type: 'info',
        width: '400px',
        message: `지원자 ${applicant.name}님의 정보가 변경되었습니다.`,
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

  const handlePatchApplicant: PatchApplicantHandler = (
    applicantId,
    field,
    value,
  ) =>
    patchApplicantMutate({
      applicantId,
      params: { [field]: value },
    });

  const columns = useApplicantColumns(handlePatchApplicant);

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
