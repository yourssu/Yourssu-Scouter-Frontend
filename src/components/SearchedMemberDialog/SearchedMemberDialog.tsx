import { useSuspenseQuery } from '@tanstack/react-query';
import { SearchBar } from '@yourssu/design-system-react';
import { Popover } from 'radix-ui';
import { useMemo, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import { memberOptions } from '@/query/member/options.ts';

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

export const SearchedMemberDialog = ({ onSelect, trigger }: SearchedMemberDialogProps) => {
  const [open, setOpen] = useState(false);

  const methods = useForm<FormValues>({
    defaultValues: {
      searchText: '',
    },
  });

  const { register, watch, reset } = methods;
  const searchText = watch('searchText');

  const { data: allMembers } = useSuspenseQuery(memberOptions('액티브'));

  const members = useMemo(() => {
    if (!searchText) {
      return allMembers;
    }
    return allMembers.filter((member) => member.nickname.includes(searchText));
  }, [allMembers, searchText]);

  const handleSelectMember = (nickname: string) => {
    onSelect(nickname);
    setOpen(false);
    reset({ searchText: '' });
  };

  return (
    <StyledWrapper>
      <FormProvider {...methods}>
        <Popover.Root onOpenChange={setOpen} open={open}>
          <Popover.Anchor onClick={() => setOpen(true)}>{trigger}</Popover.Anchor>
          <StyledContent>
            <SearchBar>
              <SearchBar.Input {...register('searchText')} autoFocus placeholder="사람 변수 검색" />
            </SearchBar>
            <StyledGroup>
              {members.map((member) => (
                <StyledItem key={member.memberId}>
                  <StyledButton
                    onClick={() => handleSelectMember(member.nickname)}
                    size="medium"
                    variant="textSecondary"
                  >
                    {member.nickname} [{member.parts.map((p) => p.part).join('/')}]
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
