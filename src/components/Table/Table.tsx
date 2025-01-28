import {createColumnHelper, flexRender, getCoreRowModel, useReactTable} from "@tanstack/react-table";
import {useState} from "react";
import {
    StyledBasis, StyledBodyCell, StyledCell,
    StyledContainer,
    StyledSearchBarContainer,
    StyledTable, StyledThead
} from "@/components/Table/Table.style.ts";
import {TextField} from "@yourssu/design-system-react";

interface Member {
    memberId: number;
    division: string;
    part: string;
    role: string;
    name: string;
    nickname: string;
    state: string;
    email: string;
    phoneNumber: string;
    department: string;
    studentId: string;
    birthDate: string;
    joinDate: string;
    membershipFee: boolean;
    note: string;
}

const defaultData: Member[] = [
    {
        memberId: 1,
        division: "운영",
        part: "HR Leader",
        role: "Lead",
        name: "이수빈",
        nickname: "Dali(달리)",
        state: "액티브",
        email: "dali.urssu@gmail.com",
        phoneNumber: "010-3333-3333",
        department: "평생교육학과",
        studentId: "20203333",
        birthDate: "2003.03.03",
        joinDate: "2023.03.31",
        membershipFee: true,
        note: "비액티브 후 24-2 컴백",
    },
    {
        memberId: 2,
        division: "개발",
        part: "Web FE",
        role: "Member",
        name: "김민지",
        nickname: "민지(Minji)",
        state: "액티브",
        email: "minji.urssu@gmail.com",
        phoneNumber: "010-1111-1111",
        department: "컴퓨터과학과",
        studentId: "20201111",
        birthDate: "2001.01.01",
        joinDate: "2023.01.15",
        membershipFee: true,
        note: "",
    },
    {
        memberId: 3,
        division: "디자인",
        part: "UIUX",
        role: "Lead",
        name: "박서연",
        nickname: "서연(Seoyeon)",
        state: "비액티브",
        email: "seoyeon.urssu@gmail.com",
        phoneNumber: "010-2222-2222",
        department: "시각디자인학과",
        studentId: "20202222",
        birthDate: "2002.02.02",
        joinDate: "2022.09.01",
        membershipFee: false,
        note: "24-1 휴학 예정",
    },
    {
        memberId: 4,
        division: "개발",
        part: "Mobile",
        role: "Member",
        name: "정하준",
        nickname: "하준(Hajun)",
        state: "액티브",
        email: "hajun.urssu@gmail.com",
        phoneNumber: "010-4444-4444",
        department: "소프트웨어학과",
        studentId: "20204444",
        birthDate: "2002.04.04",
        joinDate: "2023.09.15",
        membershipFee: true,
        note: "신입 기수",
    },
    {
        memberId: 5,
        division: "운영",
        part: "회계",
        role: "Member",
        name: "최윤서",
        nickname: "윤서(Yunseo)",
        state: "액티브",
        email: "yunseo.urssu@gmail.com",
        phoneNumber: "010-5555-5555",
        department: "경영학과",
        studentId: "20205555",
        birthDate: "2002.05.05",
        joinDate: "2023.03.31",
        membershipFee: true,
        note: "",
    }
];

const columnHelper = createColumnHelper<Member>()

const columns = [
    columnHelper.accessor('division', {
        cell: info => info.getValue(),
        header: "구분",
        size: 101,
    }),
    columnHelper.accessor('part', {
        cell: info => info.getValue(),
        header: "파트",
        size: 196,
    }),
    columnHelper.accessor('role', {
        header: "역할",
        cell: info => info.renderValue(),
    }),
    columnHelper.accessor('name', {
        header: "이름",
    }),
    columnHelper.accessor('nickname', {
        header: "닉네임(발음)",
    }),
    columnHelper.accessor('state', {
        header: "상태",
        cell: info => (
            <span
                className={info.getValue() === '액티브' ? 'text-green-500' : 'text-red-500'}
            >
               {info.getValue()}
           </span>
        ),
    }),
    columnHelper.accessor('email', {
        header: "유어슈 이메일",
    }),
    columnHelper.accessor('phoneNumber', {
        header: "연락처",
    }),
    columnHelper.accessor('department', {
        header: "전공",
    }),
    columnHelper.accessor('studentId', {
        header: "학번",
    }),
    columnHelper.accessor('birthDate', {
        header: "생년월일",
    }),
    columnHelper.accessor('joinDate', {
        header: "가입일",
    }),
    columnHelper.accessor('membershipFee', {
        header: "회비 납부",
        cell: info => (
            <span>{info.getValue() ? 'Paid' : 'Unpaid'}</span>
        ),
    }),
    columnHelper.accessor('note', {
        header: "비고",
    }),
];

const Table = () => {
    const [data, _setData] = useState(() => [...defaultData]);

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        enableColumnResizing: true,
    })

    return <StyledContainer>
        <StyledSearchBarContainer>
            <TextField placeholder="이름 혹은 닉네임으로 검색"/>
        </StyledSearchBarContainer>
        <div style={{width: "100%", overflowX: "auto"}}>
            <StyledTable>
                <StyledThead>
                    {table.getHeaderGroups().map(headerGroup => (
                        <StyledBasis key={headerGroup.id}>
                            {headerGroup.headers.map(header => (
                                <StyledCell
                                    style={{width: `${header.getSize()}px`}}
                                    key={header.id}
                                >
                                    {header.isPlaceholder
                                        ? null
                                        : flexRender(
                                            header.column.columnDef.header,
                                            header.getContext()
                                        )}
                                </StyledCell>
                            ))}
                        </StyledBasis>
                    ))}
                </StyledThead>
                <tbody>
                {table.getRowModel().rows.map(row => (
                    <tr key={row.id}>
                        {row.getVisibleCells().map(cell => (
                            <StyledBodyCell
                                key={cell.id}
                                style={{minWidth: `${cell.column.getSize()}px`}}
                            >
                                {flexRender(cell.column.columnDef.cell, cell.getContext())}
                            </StyledBodyCell>
                        ))}
                    </tr>
                ))}
                </tbody>
            </StyledTable>
        </div>
    </StyledContainer>
}

export default Table;