import {createColumnHelper, flexRender, getCoreRowModel, useReactTable} from "@tanstack/react-table";
import {useEffect, useState} from "react";
import {
    StyledBasis, StyledBodyCell, StyledBodyCellData, StyledCell,
    StyledContainer, StyledEditIcon, StyledList,
    StyledSearchBarContainer,
    StyledTable, StyledTableContainer, StyledTableContainerContainer, StyledThead
} from "@/components/Table/Table.style.ts";
import {Checkbox, IcEditLine, SearchBar} from "@yourssu/design-system-react";
import {MemberStateButton, RoleStateButton} from "@/components/StateButton";

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
    },
    {
        memberId: 6,
        division: "개발",
        part: "Web BE",
        role: "Lead",
        name: "김지훈",
        nickname: "지훈(Jihun)",
        state: "액티브",
        email: "jihun.urssu@gmail.com",
        phoneNumber: "010-6666-6666",
        department: "컴퓨터공학과",
        studentId: "20206666",
        birthDate: "2002.06.06",
        joinDate: "2022.03.31",
        membershipFee: true,
        note: "",
    },
    {
        memberId: 7,
        division: "디자인",
        part: "브랜딩",
        role: "Member",
        name: "이하은",
        nickname: "하은(Haeun)",
        state: "액티브",
        email: "haeun.urssu@gmail.com",
        phoneNumber: "010-7777-7777",
        department: "산업디자인학과",
        studentId: "20207777",
        birthDate: "2002.07.07",
        joinDate: "2023.09.15",
        membershipFee: true,
        note: "신입 기수",
    },
    {
        memberId: 8,
        division: "개발",
        part: "Web FE",
        role: "Member",
        name: "박도현",
        nickname: "도현(Dohyun)",
        state: "비액티브",
        email: "dohyun.urssu@gmail.com",
        phoneNumber: "010-8888-8888",
        department: "정보통신공학과",
        studentId: "20208888",
        birthDate: "2002.08.08",
        joinDate: "2022.09.01",
        membershipFee: false,
        note: "24-1학기 군휴학",
    },
    {
        memberId: 9,
        division: "운영",
        part: "홍보",
        role: "Member",
        name: "장서진",
        nickname: "서진(Seojin)",
        state: "액티브",
        email: "seojin.urssu@gmail.com",
        phoneNumber: "010-9999-9999",
        department: "미디어커뮤니케이션학과",
        studentId: "20209999",
        birthDate: "2002.09.09",
        joinDate: "2023.03.31",
        membershipFee: true,
        note: "",
    },
    {
        memberId: 10,
        division: "디자인",
        part: "UIUX",
        role: "Member",
        name: "임수아",
        nickname: "수아(Sua)",
        state: "액티브",
        email: "sua.urssu@gmail.com",
        phoneNumber: "010-1010-1010",
        department: "디지털콘텐츠학과",
        studentId: "20201010",
        birthDate: "2002.10.10",
        joinDate: "2023.09.15",
        membershipFee: true,
        note: "신입 기수",
    }
];

const specialCols = ['role', 'state', 'department', 'membershipFee'];

const columnHelper = createColumnHelper<Member>()

interface TableProps {
    tabType: '액티브' | '비액티브' | '졸업' | '탈퇴';
}

const Table = ({tabType}: TableProps) => {
    const [data, setData] = useState(() => [...defaultData]);
    const [filteredData, setFilteredData] = useState(() => [...defaultData]);
    const [searchValue, setSearchValue] = useState("");

    const handleSelect = (type: keyof Member, memberId: number) => (value: string) => {
        setData(prevData =>
            prevData.map(member =>
                member.memberId === memberId
                    ? { ...member, [type]: value }
                    : member
            )
        );

        console.log(type, memberId, value);
    };

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
                <MemberStateButton selectedValue={info.getValue()} onStateChange={handleSelect("state", info.row.original.memberId)} />
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
                <Checkbox size="large" selected={info.getValue()}>{""}</Checkbox>
            ),
            size: 139,
        }),
        columnHelper.accessor('note', {
            header: "비고",
        }),
    ];

    const table = useReactTable({
        data: filteredData,
        columns,
        getCoreRowModel: getCoreRowModel(),
        enableColumnResizing: true,
    })

    useEffect(() => {
        setFilteredData(data.filter(({state, name, nickname}) =>
            state === tabType &&
            (name.includes(searchValue) || nickname.includes(searchValue))
        ));
    }, [searchValue, data, tabType]);

    return <StyledContainer>
        <StyledSearchBarContainer>
            <SearchBar>
                <SearchBar.Input
                    value={searchValue}
                    onChange={(e) => setSearchValue(e.target.value)}
                    placeholder="이름 혹은 닉네임으로 검색"
                />
            </SearchBar>
        </StyledSearchBarContainer>
        <StyledTableContainerContainer>
            <StyledTableContainer>
                <StyledTable>
                    <StyledThead>
                        {table.getHeaderGroups().map(headerGroup => (
                            <StyledBasis key={headerGroup.id}>
                                {headerGroup.headers.map(header => (
                                    <StyledCell
                                        $minWidth={header.getSize()}
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
                        <StyledList key={row.id}>
                            {row.getVisibleCells().map(cell => (
                                <StyledBodyCell key={cell.id}>
                                    <StyledBodyCellData
                                        $special={specialCols.includes(cell.column.id)}
                                        style={{minWidth: `${cell.column.getSize()}px`}}
                                    >
                                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                        {
                                            !specialCols.includes(cell.column.id) &&
                                            <StyledEditIcon>
                                                <IcEditLine width={20} height={20}/>
                                            </StyledEditIcon>
                                        }
                                    </StyledBodyCellData>
                                </StyledBodyCell>
                            ))}
                        </StyledList>
                    ))}
                    </tbody>
                </StyledTable>
            </StyledTableContainer>
        </StyledTableContainerContainer>
    </StyledContainer>
}

export default Table;