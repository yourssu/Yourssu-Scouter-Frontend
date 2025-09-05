import { IcArrowsChevronDownLine, useTabs } from '@yourssu/design-system-react';
import { ReactNode, useState } from 'react';

import { getChipType, VariableChip } from '@/components/VariableChip/VariableChip';
import { VariableDialog, VariableType } from '@/components/VariableDialog/VariableDialog';

import { HeaderType, Recipient, RecipientId } from '../mail.type';
import {
  HeaderContainer,
  HeaderLabel,
  TabsContainer,
  VariableAddButton,
  VariableSection,
} from './MailHeader.style';

// 변수 타입 정의
interface Variable {
  differentForEachPerson: boolean;
  id: string;
  name: string;
  type: VariableType;
}

interface MailHeaderProps {
  children?: ReactNode;
  onTabChange?: (id: RecipientId) => void;
  onVariableAdd?: (type: VariableType, name: string, differentForEachPerson: boolean) => void;
  onVariableClick?: (variable: Variable) => void;
  onVariableDelete?: (variable: Variable) => void;
  recipients?: Recipient[];
  type: HeaderType;
  variables?: Variable[];
}

export const MailHeader = ({
  type = 'normal',
  recipients = [],
  onTabChange,
  children,
  variables = [],
  onVariableAdd,
  onVariableClick,
  onVariableDelete,
}: MailHeaderProps) => {
  const [activeTabId, setActiveTabId] = useState<RecipientId>('recipient-0');

  const [Tabs] = useTabs<RecipientId>({
    defaultTab: activeTabId,
    scrollable: true,
  });

  const handleTabClick = (id: RecipientId) => {
    setActiveTabId(id);
    if (onTabChange) {
      onTabChange(id);
    }
  };

  const handleVariableChipAdd = (
    type: VariableType,
    name: string,
    differentForEachPerson: boolean,
  ) => {
    // console.log('MailHeader를 거쳐 변수 추가:', { type, name });
    if (onVariableAdd) {
      onVariableAdd(type, name, differentForEachPerson);
    }
  };

  const handleVariableChipClick = (variable: Variable) => {
    if (onVariableClick) {
      onVariableClick(variable);
    }
  };

  const handleVariableChipDelete = (variable: Variable) => {
    if (onVariableDelete) {
      onVariableDelete(variable);
    }
  };

  if (type === 'normal') {
    return (
      <HeaderContainer>
        <VariableSection>
          <HeaderLabel>변수 :</HeaderLabel>
          {variables.map((variable) => (
            <VariableChip
              key={variable.id}
              label={variable.name}
              onClick={() => handleVariableChipClick(variable)}
              onDelete={() => handleVariableChipDelete(variable)}
              type={getChipType(variable.type, variable.name)}
            />
          ))}
        </VariableSection>
        <VariableDialog
          onSelect={handleVariableChipAdd}
          trigger={
            <VariableAddButton
              rightIcon={<IcArrowsChevronDownLine />}
              size="small"
              variant="filledPrimary"
            >
              변수 추가하기
            </VariableAddButton>
          }
        />
      </HeaderContainer>
    );
  }

  if (type === 'tabs') {
    return (
      <TabsContainer>
        <Tabs>
          <Tabs.List>
            {recipients.map((recipient) => (
              <Tabs.Tab
                id={recipient.id}
                key={recipient.id}
                onClick={() => handleTabClick(recipient.id)}
              >
                {recipient.name}
              </Tabs.Tab>
            ))}
          </Tabs.List>
          {children}
        </Tabs>
      </TabsContainer>
    );
  }
};
