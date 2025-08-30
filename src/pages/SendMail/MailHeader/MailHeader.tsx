import { IcArrowsChevronDownLine, useTabs } from '@yourssu/design-system-react';
import { ReactNode, useState } from 'react';

import { HeaderType, Recipient, RecipientId } from '../mail.type';
import {
  HeaderContainer,
  HeaderLabel,
  TabsContainer,
  VariableAddButton,
  VariableSection,
} from './MailHeader.style';
import { VariableChip } from '@/components/VariableChip/VariableChip';
import {
  VariableDialog,
  VariableType,
} from '@/components/VariableDialog/VariableDialog';

// 변수 타입 정의
interface Variable {
  id: string;
  type: VariableType;
  name: string;
  differentForEachPerson: boolean;
}

interface MailHeaderProps {
  children?: ReactNode;
  onTabChange?: (id: RecipientId) => void;
  recipients?: Recipient[];
  type: HeaderType;
}

export const MailHeader = ({
  type = 'normal',
  recipients = [],
  onTabChange,
  children,
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
  const handleAddVariable = (
    type: VariableType,
    name: string,
    differentForEachPerson: boolean,
  ) => {
    const newVariable: Variable = {
      id: Date.now().toString(), // 간단한 ID 생성
      type,
      name,
      differentForEachPerson,
    };
    setVariables((prev) => [...prev, newVariable]);
  };

  // 변수 삭제 핸들러 (옵션)
  // const handleRemoveVariable = (id: string) => {
  //   setVariables((prev) => prev.filter((variable) => variable.id !== id));
  // };

  // 변수 타입을 VariableChip의 type으로 변환
  const getChipType = (variableType: VariableType) => {
    switch (variableType) {
      case '사람':
        return 'applicant';
      case '텍스트':
        return 'part';
      default:
        return 'part'; // 기본값
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
              type={getChipType(variable.type)}
              label={variable.name}
              // onRemove={() => handleRemoveVariable(variable.id)} // 삭제 기능 추가시
            />
          ))}
        </VariableSection>

        <VariableDialog
          onSelect={handleAddVariable}
          trigger={
            <VariableAddButton
              variant="filledPrimary"
              size="small"
              rightIcon={<IcArrowsChevronDownLine />}
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
