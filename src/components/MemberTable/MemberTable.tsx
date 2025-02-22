import {Member, MemberState} from "@/scheme/member.ts";
import {createColumnHelper, getCoreRowModel, useReactTable} from "@tanstack/react-table";
import {useGetMembers} from "@/hooks/useGetMembers.ts";
import {Checkbox} from "@yourssu/design-system-react";
import {transformBoolean} from "@/utils/common.ts";
import {MemberStateButton, RoleStateButton} from "@/components/StateButton";
import Table from "@/components/Table/Table.tsx";

interface MemberTableProps {
    state: MemberState;
    search: string;
}

const columnHelper = createColumnHelper<Member>();

const MemberTable = ({state, search}: MemberTableProps) => {
    const handleSelect = (a: string, b: number) => {
        console.log(a, b);
    }

    const {data} = useGetMembers(state, search);

    const columns = [
        columnHelper.accessor('parts', {
            id: 'division',
            cell: info => {
                const parts = info.getValue();
                if (!Array.isArray(parts)) return '-';
                return <div style={{display: "flex", flexDirection: "column"}}>
                    {parts.map(p => <div key={p.division}>{p.division}</div>)}
                </div>
            },
            header: "구분",
            size: 196,
        }),
        columnHelper.accessor('parts', {
            id: 'part',
            cell: info => {
                const parts = info.getValue();
                if (!Array.isArray(parts)) return '-';
                return <div style={{display: "flex", flexDirection: "column"}}>
                    {parts.map(p => <div key={p.part}>{p.part}</div>)}
                </div>
            },
            header: "파트",
            size: 101,
        }),
        columnHelper.accessor('role', {
            header: "역할",
            cell: info => (
                <RoleStateButton selectedValue={info.getValue()} onStateChange={() => {

                }}/>
            ),
            size: 146,
        }),
        columnHelper.accessor('name', {
            header: "이름",
            size: 115,
        }),
        columnHelper.accessor('nickname', {
            header: "닉네임(발음)",
            size: 192,
        }),
        columnHelper.accessor('state', {
            header: "상태",
            cell: info => (
                <MemberStateButton selectedValue={info.getValue()}
                                   onStateChange={() => handleSelect("state", info.row.original.memberId)}/>
            ),
            size: 144,
        }),
        columnHelper.accessor('email', {
            header: "유어슈 이메일",
            size: 235,
        }),
        columnHelper.accessor('phoneNumber', {
            header: "연락처",
            size: 175,
        }),
        columnHelper.accessor('department', {
            header: "전공",
            size: 260,
        }),
        columnHelper.accessor('studentId', {
            header: "학번",
            size: 136,
        }),
        columnHelper.accessor('birthDate', {
            header: "생년월일",
            size: 142,
        }),
        columnHelper.accessor('joinDate', {
            header: "가입일",
            size: 142,
        }),
        columnHelper.accessor('membershipFee', {
            header: "회비 납부",
            cell: info => (
                <Checkbox size="large" selected={transformBoolean(info.getValue())}>{""}</Checkbox>
            ),
            size: 139,
        }),
        ...((state === '비액티브' || state === '졸업') ? [columnHelper.accessor('activePeriod', {
            header: '활동 기간',
            cell: info => {
                const member = info.row.original;
                if (member.state === '비액티브' || member.state === '졸업') {
                    return `${member.activePeriod.startSemester} ~ ${member.activePeriod.endSemester}`;
                }
            },
            size: 185,
        })] : []),
        ...(state === '비액티브' ? [columnHelper.accessor('expectedReturnSemester', {
            header: '복귀 희망 학기',
            cell: info => {
                const member = info.row.original;
                if (member.state === '비액티브') {
                    return `${member.expectedReturnSemester}`;
                }
            },
            size: 137,
        })] : []),
        ...(state === '비액티브' ? [columnHelper.accessor('inactivePeriod', {
            header: '비액티브 기간',
            cell: info => {
                const member = info.row.original;
                if (member.state === '비액티브') {
                    return `${member.inactivePeriod.startSemester} ~ ${member.inactivePeriod.endSemester}`;
                }
            },
            size: 185,
        })] : []),
        columnHelper.accessor('note', {
            header: "비고",
        }),
    ];

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        enableColumnResizing: true,
    })

    return <Table>
        <Table.Header headerGroups={table.getHeaderGroups()} />
        <Table.Body rows={table.getRowModel().rows} />
    </Table>
};

export default MemberTable;