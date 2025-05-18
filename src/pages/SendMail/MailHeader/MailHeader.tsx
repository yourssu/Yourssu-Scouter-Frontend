import { useTabs } from '@yourssu/design-system-react';
import { ReactNode, useState } from 'react';
import { HeaderType, Recipient, RecipientId } from '../mail.type';
import {
  HeaderContainer,
  HeaderLabel,
  TabsContainer,
  VariableAddButton,
  VariableChip,
} from './MailHeader.style';

interface MailHeaderProps {
  type: HeaderType;
  recipients?: Recipient[];
  onTabChange?: (id: RecipientId) => void;
  children?: ReactNode;
}

export const MailHeader = ({
  type = 'normal',
  recipients = [],
  onTabChange,
  children,
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

  if (type === 'normal') {
    return (
      <HeaderContainer>
        <HeaderLabel>변수 :</HeaderLabel>
        <VariableChip>⚙️ 파트명</VariableChip>
        <VariableChip>⭐ 지원자</VariableChip>
        <VariableAddButton>변수 추가하기</VariableAddButton>
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
                key={recipient.id}
                id={recipient.id}
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
