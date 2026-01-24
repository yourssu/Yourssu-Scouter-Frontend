import { IcArrowsChevronDownLine } from '@yourssu/design-system-react';

import { Tab } from '@/components/Tab';
import { getChipType } from '@/components/VariableChip/utils';
import { VariableChip } from '@/components/VariableChip/VariableChip';
import { VariableDialog } from '@/components/VariableDialog/VariableDialog';
import { useAlertDialog } from '@/hooks/useAlertDialog';
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
  activeTabId?: RecipientId;
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
  activeTabId,
}: MailHeaderProps) => {
  const activeTabName = recipients.find((r) => r.id === activeTabId)?.name || recipients[0]?.name;
  const openAlertDialog = useAlertDialog();

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

  const handleVariableChipDelete = async (variable: Variable) => {
    if (onVariableDelete) {
      const answer = await openAlertDialog({
        title: `${variable.displayName} 변수를 삭제하시겠습니까?`,
        content: '변수를 삭제하면 본문 내 해당 변수도 함께 삭제됩니다.',
        primaryButtonText: '삭제',
        secondaryButtonText: '취소',
      });
      if (answer) {
        onVariableDelete(variable);
      }
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
          defaultTab={activeTabName}
          onTabChange={(name) => {
            const target = recipients.find((r) => r.name === name);
            if (target) {
              onTabChange?.(target.id);
            }
          }}
          tabs={recipients.map(({ name }) => name)}
        >
          {() => undefined}
        </Tab>
      </TabsContainer>
    );
  }
};
