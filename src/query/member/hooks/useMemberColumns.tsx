import { useSuspenseQueries } from '@tanstack/react-query';
import { createColumnHelper } from '@tanstack/react-table';
import { Checkbox } from '@yourssu/design-system-react';

import Cell from '@/components/Cell/Cell.tsx';
import DepartmentCell from '@/components/Cell/DepartmentCell.tsx';
import InputCell from '@/components/Cell/InputCell.tsx';
import PartsCell from '@/components/Cell/PartsCell.tsx';
import { MemberStateButton, RoleStateButton } from '@/components/StateButton';
import { SemesterStateButton } from '@/components/StateButton/SemesterStateButton.tsx';
import {
  ActivePeriod,
  InactivePeriod,
} from '@/pages/Members/components/MemberTable/MemberTable.style.ts';
import { Member, MemberState, PatchMember } from '@/query/member/schema.ts';
import { partOptions } from '@/query/part/options.ts';
import { semesterOptions } from '@/query/semester/options.ts';

const columnHelper = createColumnHelper<Member>();

export type PatchMemberHandler = (
  memberId: number,
  field: keyof PatchMember,
  value: unknown,
) => void;

export const useMemberColumns = (state: MemberState, handlePatchMember?: PatchMemberHandler) => {
  const [{ data: partWithIds }, { data: semesters }] = useSuspenseQueries({
    queries: [partOptions(), semesterOptions()],
  });

  return [
    columnHelper.accessor('parts', {
      id: 'division',
      cell: (info) => {
        const parts = info.getValue();
        return (
          <Cell>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              {parts.map((p) => (
                <div key={`${p.division} ${p.part}`}>{p.division}</div>
              ))}
            </div>
          </Cell>
        );
      },
      header: '구분',
      size: 101,
    }),
    columnHelper.accessor('parts', {
      id: 'part',
      cell: (info) => {
        const parts = info.getValue();
        return (
          <PartsCell
            onSelect={(value) => {
              const included = parts.some((p) => p.part === value);
              if (handlePatchMember) {
                handlePatchMember(
                  info.row.original.memberId,
                  'partIds',
                  partWithIds
                    .filter((partWithId) => {
                      const baseCondition = parts.some((part) => part.part === partWithId.partName);
                      if (included) {
                        return baseCondition && partWithId.partName !== value;
                      }
                      return baseCondition || partWithId.partName === value;
                    })
                    .map((p) => p.partId),
                );
              }
            }}
            tooltipContent={`${info.row.original.name} 정보 수정`}
          >
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              {parts.map((p) => (
                <div key={`${p.division} ${p.part}`}>{p.part}</div>
              ))}
            </div>
          </PartsCell>
        );
      },
      header: '파트',
      size: 214,
    }),
    columnHelper.accessor('role', {
      header: '역할',
      cell: (info) => {
        return (
          <Cell>
            <RoleStateButton
              onStateChange={(state) => {
                if (handlePatchMember) {
                  handlePatchMember(info.row.original.memberId, 'role', state);
                }
              }}
              selectedValue={info.getValue()}
            />
          </Cell>
        );
      },
      size: 146,
    }),
    columnHelper.accessor('name', {
      header: '이름',
      cell: (info) => (
        <InputCell
          defaultValue={info.getValue()}
          handleSubmit={(value) => {
            if (handlePatchMember) {
              handlePatchMember(info.row.original.memberId, 'name', value);
            }
          }}
          tooltipContent={`${info.row.original.name} 정보 수정`}
        >
          {info.getValue()}
        </InputCell>
      ),
      size: 115,
    }),
    columnHelper.accessor('nickname', {
      header: '닉네임(발음)',
      cell: (info) => (
        <InputCell
          bold={true}
          defaultValue={info.getValue()}
          handleSubmit={(value) => {
            if (handlePatchMember) {
              handlePatchMember(info.row.original.memberId, 'nickname', value);
            }
          }}
          tooltipContent={`${info.row.original.name} 정보 수정`}
        >
          {info.getValue()}
        </InputCell>
      ),
      size: 192,
    }),
    columnHelper.accessor('state', {
      header: '상태',
      cell: (info) => (
        <Cell>
          <MemberStateButton
            onStateChange={(value) => {
              if (handlePatchMember) {
                handlePatchMember(info.row.original.memberId, 'state', value);
              }
            }}
            selectedValue={info.getValue()}
          />
        </Cell>
      ),
      size: 144,
    }),
    columnHelper.accessor('email', {
      header: '유어슈 이메일',
      cell: (info) => (
        <InputCell
          defaultValue={info.getValue()}
          handleSubmit={(value) => {
            if (handlePatchMember) {
              handlePatchMember(info.row.original.memberId, 'email', value);
            }
          }}
          tooltipContent={`${info.row.original.name} 정보 수정`}
        >
          {info.getValue()}
        </InputCell>
      ),
      size: 235,
    }),
    columnHelper.accessor('phoneNumber', {
      header: '연락처',
      cell: (info) => (
        <InputCell
          defaultValue={info.getValue()}
          handleSubmit={(value) => {
            if (handlePatchMember) {
              handlePatchMember(info.row.original.memberId, 'phoneNumber', value);
            }
          }}
          tooltipContent={`${info.row.original.name} 정보 수정`}
        >
          {info.getValue()}
        </InputCell>
      ),
      size: 175,
    }),
    columnHelper.accessor('department', {
      header: '전공',
      cell: (info) => (
        <DepartmentCell
          onSelect={(value) => {
            if (handlePatchMember) {
              handlePatchMember(info.row.original.memberId, 'departmentId', value);
            }
          }}
          tooltipContent={`${info.row.original.name} 정보 수정`}
        >
          {info.getValue()}
        </DepartmentCell>
      ),
      size: 260,
    }),
    columnHelper.accessor('studentId', {
      header: '학번',
      cell: (info) => (
        <InputCell
          defaultValue={info.getValue()}
          handleSubmit={(value) => {
            if (handlePatchMember) {
              handlePatchMember(info.row.original.memberId, 'studentId', value);
            }
          }}
          tooltipContent={`${info.row.original.name} 정보 수정`}
        >
          {info.getValue()}
        </InputCell>
      ),
      size: 136,
    }),
    columnHelper.accessor('birthDate', {
      header: '생년월일',
      cell: (info) => (
        <InputCell
          defaultValue={info.getValue()}
          handleSubmit={(value) => {
            if (handlePatchMember) {
              handlePatchMember(info.row.original.memberId, 'birthDate', value);
            }
          }}
          tooltipContent={`${info.row.original.name} 정보 수정`}
        >
          {info.getValue()}
        </InputCell>
      ),
      size: 142,
    }),
    columnHelper.accessor('joinDate', {
      header: '가입일',
      cell: (info) => (
        <InputCell
          defaultValue={info.getValue()}
          handleSubmit={(value) => {
            if (handlePatchMember) {
              handlePatchMember(info.row.original.memberId, 'joinDate', value);
            }
          }}
          tooltipContent={`${info.row.original.name} 정보 수정`}
        >
          {info.getValue()}
        </InputCell>
      ),
      size: 142,
    }),
    ...(state === '액티브'
      ? [
          columnHelper.accessor('membershipFee', {
            header: () => (
              <div
                style={{
                  width: '100%',
                  display: 'flex',
                  justifyContent: 'center',
                  paddingRight: 16,
                }}
              >
                회비 납부
              </div>
            ),
            cell: (info) => (
              <Cell>
                <div
                  style={{
                    paddingLeft: 8,
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'center',
                  }}
                >
                  <Checkbox
                    onChange={(e) => {
                      if (handlePatchMember) {
                        handlePatchMember(
                          info.row.original.memberId,
                          'membershipFee',
                          e.currentTarget.checked,
                        );
                      }
                    }}
                    selected={Boolean(info.getValue())}
                    size="large"
                  >
                    {''}
                  </Checkbox>
                </div>
              </Cell>
            ),
            size: 139,
          }),
        ]
      : []),
    ...(state === '비액티브' || state === '졸업'
      ? [
          columnHelper.accessor('activePeriod', {
            header: '활동 기간',
            cell: (info) => {
              const member = info.row.original;
              if (member.state === '비액티브' || member.state === '졸업') {
                return (
                  <Cell>
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 4,
                      }}
                    >
                      <ActivePeriod size="small" variant="filledSecondary">
                        {member.activePeriod.startSemester}
                      </ActivePeriod>
                      ~
                      <ActivePeriod
                        size="small"
                        style={{ pointerEvents: 'none' }}
                        variant="filledSecondary"
                      >
                        {member.activePeriod.endSemester}
                      </ActivePeriod>
                    </div>
                  </Cell>
                );
              }
            },
            size: 185,
          }),
        ]
      : []),
    ...(state === '비액티브'
      ? [
          columnHelper.accessor('expectedReturnSemester', {
            header: '복귀 희망 학기',
            cell: (info) => {
              const member = info.row.original;
              if (member.state === '비액티브') {
                return (
                  <Cell>
                    <SemesterStateButton
                      onStateChange={(value) => {
                        const semesterId = semesters.find((s) => s.semester === value)?.semesterId;
                        if (semesterId && handlePatchMember) {
                          handlePatchMember(
                            member.memberId,
                            'expectedReturnSemesterId',
                            semesterId,
                          );
                        }
                      }}
                      selectedValue={member.expectedReturnSemester}
                    />
                  </Cell>
                );
              }
            },
            size: 137,
          }),
        ]
      : []),
    ...(state === '비액티브'
      ? [
          columnHelper.accessor('inactivePeriod', {
            header: '비액티브 기간',
            cell: (info) => {
              const member = info.row.original;
              if (member.state === '비액티브') {
                return (
                  <Cell>
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 4,
                      }}
                    >
                      <InactivePeriod disabled size="small" variant="filledSecondary">
                        {member.inactivePeriod.startSemester}
                      </InactivePeriod>
                      ~
                      <InactivePeriod
                        disabled
                        size="small"
                        style={{ pointerEvents: 'none' }}
                        variant="filledSecondary"
                      >
                        {member.inactivePeriod.endSemester}
                      </InactivePeriod>
                    </div>
                  </Cell>
                );
              }
            },
            size: 185,
          }),
        ]
      : []),
    ...(state === '졸업'
      ? [
          columnHelper.accessor('isAdvisorDesired', {
            header: '어드바이저 희망',
            cell: (info) => (
              <Cell>
                <div
                  style={{
                    paddingLeft: 8,
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'center',
                  }}
                >
                  <Checkbox
                    onChange={(e) => {
                      if (handlePatchMember) {
                        handlePatchMember(
                          info.row.original.memberId,
                          'isAdvisorDesired',
                          e.currentTarget.checked,
                        );
                      }
                    }}
                    selected={Boolean(info.getValue())}
                    size="large"
                  >
                    {''}
                  </Checkbox>
                </div>
              </Cell>
            ),
            size: 131,
          }),
        ]
      : []),
    columnHelper.accessor('note', {
      header: '비고',
      cell: (info) => (
        <InputCell
          defaultValue={info.getValue()}
          handleSubmit={(value) => {
            if (handlePatchMember) {
              handlePatchMember(info.row.original.memberId, 'note', value);
            }
          }}
          tooltipContent={`${info.row.original.name} 정보 수정`}
        >
          {info.getValue()}
        </InputCell>
      ),
      size: 216,
    }),
  ];
};
