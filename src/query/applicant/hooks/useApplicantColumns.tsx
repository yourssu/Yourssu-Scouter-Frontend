import { useSuspenseQuery } from '@tanstack/react-query';
import { createColumnHelper } from '@tanstack/react-table';

import Cell from '@/components/Cell/Cell.tsx';
import DepartmentCell from '@/components/Cell/DepartmentCell.tsx';
import InputCell from '@/components/Cell/InputCell.tsx';
import PartsCell from '@/components/Cell/PartsCell.tsx';
import { ApplicantStateButton } from '@/components/StateButton';
import { Applicant, PatchApplicant } from '@/query/applicant/schema.ts';
import { partOptions } from '@/query/part/options.ts';

const columnHelper = createColumnHelper<Applicant>();

export type PatchApplicantHandler = (
  applicantId: number,
  field: keyof PatchApplicant,
  value: unknown,
) => void;

export const useApplicantColumns = (handlePatchApplicant?: PatchApplicantHandler) => {
  const { data: partWithIds } = useSuspenseQuery(partOptions());

  return [
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
          onSelect={(value) => {
            const partId = partWithIds.find((p) => p.partName === value)?.partId;
            if (partId && handlePatchApplicant) {
              handlePatchApplicant(info.row.original.applicantId, 'partId', partId);
            }
          }}
          tooltipContent={`${info.row.original.name} 정보 수정`}
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
          defaultValue={info.getValue()}
          handleSubmit={(value) => {
            if (handlePatchApplicant) {
              handlePatchApplicant(info.row.original.applicantId, 'name', value);
            }
          }}
          tooltipContent={`${info.row.original.name} 정보 수정`}
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
            contentProps={{
              align: 'start',
            }}
            onStateChange={(state) => {
              if (handlePatchApplicant) {
                handlePatchApplicant(info.row.original.applicantId, 'state', state);
              }
            }}
            selectedValue={info.getValue()}
          />
        </Cell>
      ),
    }),
    columnHelper.accessor('applicationDate', {
      header: '지원일',
      size: 138,
      cell: (info) => (
        <InputCell
          defaultValue={info.getValue()}
          handleSubmit={(value) => {
            if (handlePatchApplicant) {
              handlePatchApplicant(info.row.original.applicantId, 'applicationDate', value);
            }
          }}
          tooltipContent={`${info.row.original.name} 정보 수정`}
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
          defaultValue={info.getValue()}
          handleSubmit={(value) => {
            if (handlePatchApplicant) {
              handlePatchApplicant(info.row.original.applicantId, 'email', value);
            }
          }}
          tooltipContent={`${info.row.original.name} 정보 수정`}
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
          defaultValue={info.getValue()}
          handleSubmit={(value) => {
            if (handlePatchApplicant) {
              handlePatchApplicant(info.row.original.applicantId, 'phoneNumber', value);
            }
          }}
          tooltipContent={`${info.row.original.name} 정보 수정`}
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
          onSelect={(value) => {
            if (handlePatchApplicant) {
              handlePatchApplicant(info.row.original.applicantId, 'departmentId', value);
            }
          }}
          tooltipContent={`${info.row.original.name} 정보 수정`}
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
          defaultValue={info.getValue()}
          handleSubmit={(value) => {
            if (handlePatchApplicant) {
              handlePatchApplicant(info.row.original.applicantId, 'studentId', value);
            }
          }}
          tooltipContent={`${info.row.original.name} 정보 수정`}
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
          defaultValue={info.getValue()}
          handleSubmit={(value) => {
            if (handlePatchApplicant) {
              handlePatchApplicant(info.row.original.applicantId, 'academicSemester', value);
            }
          }}
          tooltipContent={`${info.row.original.name} 정보 수정`}
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
          defaultValue={info.getValue()}
          handleSubmit={(value) => {
            if (handlePatchApplicant) {
              handlePatchApplicant(info.row.original.applicantId, 'age', value);
            }
          }}
          tooltipContent={`${info.row.original.name} 정보 수정`}
        >
          {info.getValue()}
        </InputCell>
      ),
    }),
  ];
};
