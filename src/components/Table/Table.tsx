import { flexRender,  HeaderGroup, Row} from "@tanstack/react-table";
import {
    StyledBorder,
    StyledBasis, StyledBodyCell, StyledBodyCellData, StyledCell,
    StyledEditIcon, StyledList,
    StyledTable, StyledTableContainer, StyledTableContainerContainer, StyledThead, StyledBorderBox, StyledOuterBorder
} from "@/components/Table/Table.style.ts";
import {IcEditLine} from "@yourssu/design-system-react";
import {ReactNode} from "react";

const specialCols = ['role', 'state', 'department', 'membershipFee'];

const Header = ({ headerGroups }: {headerGroups: HeaderGroup<unknown>[]}) => (
    <StyledThead>
        {headerGroups.map(headerGroup => (
            <StyledBasis key={headerGroup.id}>
                {headerGroup.headers.map(header => (
                    <StyledCell $minWidth={header.getSize()} key={header.id}>
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
);

const Body = ({ rows }: {rows: Row<unknown>[]}) => (
    <tbody>
    {rows.map(row => (
        <StyledList key={row.id}>
            {row.getVisibleCells().map(cell => (
                <StyledBodyCell key={cell.id}>
                    <StyledBodyCellData
                        $special={specialCols.includes(cell.column.id)}
                        style={{minWidth: `${cell.column.getSize()}px`}}
                    >
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                        {!specialCols.includes(cell.column.id) && (
                            <StyledEditIcon>
                                <IcEditLine width={20} height={20}/>
                            </StyledEditIcon>
                        )}
                    </StyledBodyCellData>
                </StyledBodyCell>
            ))}
        </StyledList>
    ))}
    </tbody>
);

const Table = ({ children }: {children: ReactNode}) => (
    <StyledTableContainerContainer>
        <StyledTableContainer>
            <StyledTable>
                {children}
            </StyledTable>
        </StyledTableContainer>
        <StyledBorder/>
        <StyledBorderBox>
            <StyledOuterBorder />
        </StyledBorderBox>
    </StyledTableContainerContainer>
);

Table.Header = Header;
Table.Body = Body;

export default Table;