import { SearchBar } from '@yourssu/design-system-react';
import { useFormContext } from 'react-hook-form';

import { StyledSearchBarContainer } from '@/components/TableSearchBar/TableSearchBar.style.ts';

interface TableSearchBarProps {
  placeholder?: string;
}

const TableSearchBar = ({ placeholder }: TableSearchBarProps) => {
  const { register } = useFormContext();

  return (
    <StyledSearchBarContainer>
      <SearchBar>
        <SearchBar.Input {...register('search')} placeholder={placeholder} />
      </SearchBar>
    </StyledSearchBarContainer>
  );
};

export default TableSearchBar;
