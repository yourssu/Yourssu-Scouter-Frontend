import { IcArrowsChevronDownLine } from '@yourssu/design-system-react';
import { useState } from 'react';

import { Tab } from '@/components/Tab';
import { getChipType } from '@/components/VariableChip/utils';
import { VariableChip } from '@/components/VariableChip/VariableChip';
import { VariableDialog } from '@/components/VariableDialog/VariableDialog';
import { Variable, VariableType } from '@/types/editor';

import { EditorType, Recipient, RecipientId } from '../../mail.type';
import {
  HeaderContainer,
  HeaderLabel,
  TabsContainer,
  VariableAddButton,
  VariableSection,
} from './MailHeader.style';

interface MailHeaderProps {
  onTabChange?: (id: RecipientId) => void;
  onVariableAdd?: (type: VariableType, name: string, perRecipient: boolean) => void;
  onVariableClick?: (variable: Variable) => void;
  onVariableDelete?: (variable: Variable) => void;
  recipients?: Recipient[];
  type: EditorType;
  variables?: Variable[];
}

export const MailHeader = ({
  type = 'normal',
  recipients = [],
  onTabChange,
  variables = [],
  onVariableAdd,
  onVariableClick,
  onVariableDelete,
}: MailHeaderProps) => {
  const [activeTabId, setActiveTabId] = useState<RecipientId>(recipients[0]?.id);

  const handleTabClick = (id: RecipientId) => {
    setActiveTabId(id);
    if (onTabChange) {
      onTabChange(id);
    }
  };

  const handleVariableChipAdd = (type: VariableType, name: string, perRecipient: boolean) => {
    if (onVariableAdd) {
      onVariableAdd(type, name, perRecipient);
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
              key={variable.key}
              label={variable.displayName}
              onClick={() => handleVariableChipClick(variable)}
              onDelete={() => handleVariableChipDelete(variable)}
              type={getChipType(variable.type)}
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
        <Tab
          defaultTab={activeTabId}
          onTabChange={handleTabClick}
          tabs={recipients.map(({ name }) => name)}
        >
          {() => {
            return undefined;
          }}
        </Tab>
      </TabsContainer>
    );
  }
};
