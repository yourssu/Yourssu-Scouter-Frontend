import { useGetMembers } from '@/data/members/hooks/useGetMembers';
import { SearchBar } from '@yourssu/design-system-react';
import { Popover } from 'radix-ui';
import { useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import {
  StyledButton,
  StyledContent,
  StyledGroup,
  StyledItem,
  StyledWrapper,
} from './SearchedMemberDialog.style';

interface SearchedMemberDialogProps {
  onSelect: (nickname: string) => void;
  trigger: React.ReactNode;
}

interface FormValues {
  searchText: string;
}

export const SearchedMemberDialog = ({
  onSelect,
  trigger,
}: SearchedMemberDialogProps) => {
  const [open, setOpen] = useState(false);
  const [debouncedSearchText, setDebouncedSearchText] = useState('');

  const methods = useForm<FormValues>({
    defaultValues: {
      searchText: '',
    },
  });

  const { register, watch, reset } = methods;
  const searchText = watch('searchText');
  const { data: members = [] } = useGetMembers('액티브', debouncedSearchText);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchText(searchText);
    }, 300);
    return () => clearTimeout(timer);
  }, [searchText]);

  const handleSelectMember = (nickname: string) => {
    onSelect(nickname);
    setOpen(false);
    reset({ searchText: '' });
  };

  return (
    <StyledWrapper>
      <FormProvider {...methods}>
        <Popover.Root open={open} onOpenChange={setOpen}>
          <Popover.Anchor onClick={() => setOpen(true)}>
            {trigger}
          </Popover.Anchor>
          <StyledContent>
            <SearchBar>
              <SearchBar.Input
                {...register('searchText')}
                placeholder="사람 변수 검색"
                autoFocus
              />
            </SearchBar>
            <StyledGroup>
              {members.map((member) => (
                <StyledItem key={member.memberId}>
                  <StyledButton
                    onClick={() => handleSelectMember(member.nickname)}
                    size="medium"
                    variant="textSecondary"
                  >
                    {member.nickname} [
                    {member.parts.map((p) => p.part).join('/')}]
                  </StyledButton>
                </StyledItem>
              ))}
            </StyledGroup>
          </StyledContent>
        </Popover.Root>
      </FormProvider>
    </StyledWrapper>
  );
};
