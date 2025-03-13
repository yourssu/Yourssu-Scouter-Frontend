import { Popover } from 'radix-ui';
import {
  StyledButton,
  StyledContent,
  StyledGroup,
  StyledItem,
} from '@/components/DepartmentSearchDialog/DepartmentSearchDialog.style.ts';
import { useGetDepartments } from '@/data/department/useGetDepartments.ts';
import { SearchBar } from '@yourssu/design-system-react';
import { useForm } from 'react-hook-form';
import { useMemo } from 'react';

interface DepartmentSearchDialogProps {
  onSelect: (value: number) => void;
}

const DepartmentSearchDialog = ({ onSelect }: DepartmentSearchDialogProps) => {
  const { data: departments } = useGetDepartments();
  const { register, watch } = useForm({
    defaultValues: {
      department: '',
    },
  });

  const departmentSearch = watch('department');

  const filteredDepartments = useMemo(() => {
    if (departmentSearch === '') return [];
    return departments.filter((department) =>
      department.departmentName.includes(departmentSearch),
    );
  }, [departments, departmentSearch]);

  return (
    <Popover.Portal>
      <StyledContent
        $gap={filteredDepartments.length > 0}
        side="top"
        sideOffset={6}
      >
        <StyledGroup>
          {filteredDepartments.map((department) => (
            <StyledItem key={department.departmentId}>
              <Popover.Close asChild>
                <StyledButton
                  size="medium"
                  variant="textSecondary"
                  onClick={() => onSelect(department.departmentId)}
                >
                  {department.departmentName}
                </StyledButton>
              </Popover.Close>
            </StyledItem>
          ))}
        </StyledGroup>
        <SearchBar>
          <SearchBar.Input
            {...register('department')}
            placeholder={'학과 이름 검색'}
          />
        </SearchBar>
      </StyledContent>
    </Popover.Portal>
  );
};

export default DepartmentSearchDialog;
