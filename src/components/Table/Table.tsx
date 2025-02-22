import {flexRender, HeaderGroup, Row} from "@tanstack/react-table";
import {
    StyledBorder,
    StyledBasis, StyledBodyCell, StyledBodyCellData, StyledCell,
    StyledList,
    StyledTable, StyledTableContainer, StyledTableContainerContainer, StyledThead, StyledBorderBox, StyledOuterBorder
} from "@/components/Table/Table.style.ts";
import {ReactNode} from "react";

const Header = ({headerGroups}: { headerGroups: HeaderGroup<unknown>[] }) => (
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

const Body = ({rows}: { rows: Row<unknown>[] }) => (
    <tbody>
    {rows.map(row => (
        <StyledList key={row.id}>
            {row.getVisibleCells().map(cell => (
                <StyledBodyCell $special={false} key={cell.id}>
                    <StyledBodyCellData
                        style={{minWidth: `${cell.column.getSize()}px`}}
                    >
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </StyledBodyCellData>
                </StyledBodyCell>
            ))}
        </StyledList>
    ))}
    </tbody>
);

const Table = ({children}: { children: ReactNode }) => (
    <StyledTableContainerContainer>
        <StyledTableContainer>
            <StyledTable>
                {children}
            </StyledTable>
        </StyledTableContainer>
        <StyledBorder/>
        <StyledBorderBox>
            <StyledOuterBorder/>
        </StyledBorderBox>
    </StyledTableContainerContainer>
);

Table.Header = Header;
Table.Body = Body;

export default Table;