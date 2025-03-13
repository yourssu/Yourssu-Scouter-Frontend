import {
  createColumnHelper,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';
import {
  Applicant,
  ApplicantState,
  PatchApplicant,
} from '@/data/applicants/schema.ts';
import Table from '@/components/Table/Table.tsx';
import { useGetApplicants } from '@/data/applicants/hooks/useGetApplicants.ts';
import Cell from '@/components/Cell/Cell.tsx';
import { ApplicantStateButton } from '@/components/StateButton';
import PartsCell from '@/components/Cell/PartsCell.tsx';
import InputCell from '@/components/Cell/InputCell.tsx';
import { usePatchApplicant } from '@/data/applicants/hooks/usePatchApplicant.ts';
import { useGetParts } from '@/data/part/hooks/useGetParts.ts';
import DepartmentCell from '@/components/Cell/DepartmentCell.tsx';
import { useInvalidateApplicants } from '@/data/applicants/hooks/useInvalidateApplicants.ts';

const columnHelper = createColumnHelper<Applicant>();

interface ApplicantTableProps {
  state: ApplicantState;
  semesterId: number;
  name: string;
}

const ApplicantTable = ({ state, semesterId, name }: ApplicantTableProps) => {
  const { data } = useGetApplicants(state, semesterId, name);

  const patchApplicantMutation = usePatchApplicant();
  const invalidateApplicants = useInvalidateApplicants();

  const patchApplicant = async (
    applicantId: number,
    field: keyof PatchApplicant,
    value: unknown,
  ) => {
    await patchApplicantMutation.mutateAsync({
      applicantId,
      params: { [field]: value },
    });
    await invalidateApplicants();
  };

  const { data: partWithIds } = useGetParts();

  const columns = [
    columnHelper.accessor('division', {
      header: '구분',
      size: 97,
      cell: (info) => <Cell>{info.getValue()}</Cell>,
    }),
    columnHelper.accessor('part', {
      header: '파트',
      size: 196,
      cell: (info) => (
        <PartsCell
          tooltipContent={`${info.row.original.name} 정보 수정`}
          onSelect={async (value) => {
            const partId = partWithIds.find(
              (p) => p.partName === value,
            )?.partId;
            if (partId) {
              await patchApplicant(
                info.row.original.applicantId,
                'partId',
                partId,
              );
            }
          }}
        >
          {info.getValue()}
        </PartsCell>
      ),
    }),
    columnHelper.accessor('name', {
      header: '이름',
      size: 111,
      cell: (info) => (
        <InputCell
          tooltipContent={`${info.row.original.name} 정보 수정`}
          defaultValue={info.getValue()}
          handleSubmit={async (value) => {
            await patchApplicant(info.row.original.applicantId, 'name', value);
          }}
        >
          {info.getValue()}
        </InputCell>
      ),
    }),
    columnHelper.accessor('state', {
      header: '상태',
      size: 171,
      cell: (info) => (
        <Cell>
          <ApplicantStateButton
            selectedValue={info.getValue()}
            onStateChange={async (state) => {
              await patchApplicant(
                info.row.original.applicantId,
                'state',
                state,
              );
            }}
          />
        </Cell>
      ),
    }),
    columnHelper.accessor('applicationDate', {
      header: '지원일',
      size: 138,
      cell: (info) => (
        <InputCell
          tooltipContent={`${info.row.original.name} 정보 수정`}
          defaultValue={info.getValue()}
          handleSubmit={async (value) => {
            await patchApplicant(
              info.row.original.applicantId,
              'applicationDate',
              value,
            );
          }}
        >
          {info.getValue()}
        </InputCell>
      ),
    }),
    columnHelper.accessor('email', {
      header: '이메일',
      size: 284,
      cell: (info) => (
        <InputCell
          tooltipContent={`${info.row.original.name} 정보 수정`}
          defaultValue={info.getValue()}
          handleSubmit={async (value) => {
            await patchApplicant(info.row.original.applicantId, 'email', value);
          }}
        >
          {info.getValue()}
        </InputCell>
      ),
    }),
    columnHelper.accessor('phoneNumber', {
      header: '연락처',
      size: 171,
      cell: (info) => (
        <InputCell
          tooltipContent={`${info.row.original.name} 정보 수정`}
          defaultValue={info.getValue()}
          handleSubmit={async (value) => {
            await patchApplicant(
              info.row.original.applicantId,
              'phoneNumber',
              value,
            );
          }}
        >
          {info.getValue()}
        </InputCell>
      ),
    }),
    columnHelper.accessor('department', {
      header: '학과',
      size: 260,
      cell: (info) => (
        <DepartmentCell
          tooltipContent={`${info.row.original.name} 정보 수정`}
          onSelect={(value) =>
            patchApplicant(info.row.original.applicantId, 'departmentId', value)
          }
        >
          {info.getValue()}
        </DepartmentCell>
      ),
    }),
    columnHelper.accessor('studentId', {
      header: '학번',
      size: 132,
      cell: (info) => (
        <InputCell
          tooltipContent={`${info.row.original.name} 정보 수정`}
          defaultValue={info.getValue()}
          handleSubmit={async (value) => {
            await patchApplicant(
              info.row.original.applicantId,
              'studentId',
              value,
            );
          }}
        >
          {info.getValue()}
        </InputCell>
      ),
    }),
    columnHelper.accessor('semester', {
      header: '재학 학기',
      size: 99,
      cell: (info) => (
        <InputCell
          tooltipContent={`${info.row.original.name} 정보 수정`}
          defaultValue={info.getValue()}
          handleSubmit={async (value) => {
            await patchApplicant(
              info.row.original.applicantId,
              'academicSemester',
              value,
            );
          }}
        >
          {info.getValue()}
        </InputCell>
      ),
    }),
    columnHelper.accessor('age', {
      header: '나이',
      size: 106,
      cell: (info) => (
        <InputCell
          tooltipContent={`${info.row.original.name} 정보 수정`}
          defaultValue={info.getValue()}
          handleSubmit={async (value) => {
            await patchApplicant(info.row.original.applicantId, 'age', value);
          }}
        >
          {info.getValue()}
        </InputCell>
      ),
    }),
  ];

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
