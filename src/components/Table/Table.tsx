import { flexRender, HeaderGroup, Row } from '@tanstack/react-table';
import {
  StyledBorder,
  StyledBasis,
  StyledBodyCell,
  StyledCell,
  StyledList,
  StyledTable,
  StyledTableContainer,
  StyledTableContainerContainer,
  StyledThead,
  StyledBorderBox,
  StyledOuterBorder,
} from '@/components/Table/Table.style.ts';
import { PropsWithChildren, useEffect, useRef, useState } from 'react';

const Header = ({ headerGroups }: { headerGroups: HeaderGroup<unknown>[] }) => (
  <StyledThead>
    {headerGroups.map((headerGroup) => (
      <StyledBasis key={headerGroup.id}>
        {headerGroup.headers.map((header) => (
          <StyledCell $minWidth={header.getSize()} key={header.id}>
            {header.isPlaceholder
              ? null
              : flexRender(header.column.columnDef.header, header.getContext())}
          </StyledCell>
        ))}
      </StyledBasis>
    ))}
  </StyledThead>
);

const Body = ({ rows }: { rows: Row<unknown>[] }) => (
  <tbody>
    {rows.map((row) => (
      <StyledList key={row.id}>
        {row.getVisibleCells().map((cell) => (
          <StyledBodyCell
            key={cell.id}
            style={{ minWidth: `${cell.column.getSize()}px` }}
          >
            {flexRender(cell.column.columnDef.cell, cell.getContext())}
          </StyledBodyCell>
        ))}
      </StyledList>
    ))}
  </tbody>
);

const Table = ({ children }: PropsWithChildren) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const [hasScroll, setHasScroll] = useState(true);

  const checkForScroll = () => {
    if (containerRef.current) {
      setHasScroll(
        containerRef.current.scrollWidth > containerRef.current.clientWidth,
      );
    }
  };

  useEffect(() => {
    checkForScroll();

    window.addEventListener('resize', checkForScroll);

    return () => {
      window.removeEventListener('resize', checkForScroll);
    };
  }, []);

  return (
    <StyledTableContainerContainer>
      <StyledTableContainer ref={containerRef}>
        <StyledTable>{children}</StyledTable>
      </StyledTableContainer>
      <StyledBorder $hasScroll={hasScroll} />
      {hasScroll && (
        <StyledBorderBox>
          <StyledOuterBorder />
        </StyledBorderBox>
      )}
    </StyledTableContainerContainer>
  );
};

Table.Header = Header;
Table.Body = Body;

export default Table;
