import { useTabs } from '@yourssu/design-system-react';
import { ReactNode } from 'react';
import { HeaderType, Recipient, RecipientId } from '../mock';
import {
  HeaderContainer,
  HeaderLabel,
  TabsContainer,
  VariableAddButton,
  VariableChip,
} from './MailEditor.style';

interface MailHeaderProps {
  type: HeaderType;
  recipients?: Recipient[];
  onTabChange?: (id: RecipientId) => void;
  children?: ReactNode;
}

export const MailHeader = ({
  type = 'normal',
  recipients = [],
  children,
}: MailHeaderProps) => {
  const Tabs = useTabs<RecipientId>({
    defaultTab: recipients.length > 0 ? recipients[0].id : 'recipient-0',
    scrollable: true,
  });

  if (type === 'empty') {
    return (
      <>
        <HeaderContainer />
        {children}
      </>
    );
  }

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
              <Tabs.Tab key={recipient.id} id={recipient.id}>
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
