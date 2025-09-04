import { IcArrowsChevronDownLine, useTabs } from '@yourssu/design-system-react';
import { ReactNode, useState } from 'react';

import { VariableChip } from '@/components/VariableChip/VariableChip';
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
  onVariableClick?: (variable: Variable) => void; // 추가
  recipients?: Recipient[];
  type: HeaderType;
}

export const MailHeader = ({
  type = 'normal',
  recipients = [],
  onTabChange,
  children,
  onVariableClick, // 추가
}: MailHeaderProps) => {
  const [activeTabId, setActiveTabId] = useState<RecipientId>('recipient-0');
  const [variables, setVariables] = useState<Variable[]>([
    { id: '1', type: '텍스트', name: '파트명', differentForEachPerson: false },
    { id: '2', type: '사람', name: '지원자', differentForEachPerson: true },
  ]);

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

  // 변수 추가 핸들러
  const handleAddVariable = (type: VariableType, name: string, differentForEachPerson: boolean) => {
    const newVariable: Variable = {
      id: Date.now().toString(),
      type,
      name,
      differentForEachPerson,
    };
    setVariables((prev) => [...prev, newVariable]);
    // console.log('Variable added to MailHeader:', newVariable); // 추가
  };

  // 변수 타입을 VariableChip의 type으로 변환
  const getChipType = (variableType: VariableType, variableName: string) => {
    switch (variableType) {
      case '날짜':
        return 'date';
      case '링크':
        return 'link';
      case '사람':
        if (variableName === '지원자') return 'applicant';
        else return 'person';
      case '텍스트':
        if (variableName === '파트명') return 'part';
        else return 'text';
      case '날짜':
        return 'date';
      case '링크':
        return 'link';
      default:
        return 'part';
    }
  };

  // 추가: 변수 클릭 핸들러
  const handleVariableChipClick = (variable: Variable) => {
    if (onVariableClick) {
      onVariableClick(variable);
    }
  };

  console.log(variables);

  if (type === 'normal') {
    return (
      <HeaderContainer>
        <VariableSection>
          <HeaderLabel>변수 :</HeaderLabel>
          {variables.map((variable) => (
            <VariableChip
              key={variable.id}
              type={getChipType(variable.type, variable.name)}
              label={variable.name}
              onClick={() => handleVariableChipClick(variable)} // 추가
            />
          ))}
        </VariableSection>
        <VariableDialog
          onSelect={handleAddVariable}
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
