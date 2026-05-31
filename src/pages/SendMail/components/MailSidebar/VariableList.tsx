import { SwitchCase } from 'react-simplikit';

import { DateVariableCard } from '@/components/VariableCard/DateVariableCard';
import { LinkVariableCard } from '@/components/VariableCard/LinkVariableCard';
import { NameVariableCard } from '@/components/VariableCard/NameVariableCard';
import { TextVariableCard } from '@/components/VariableCard/TextVariableCard';
import { useMailInfoContext } from '@/pages/SendMail/context';
import { useMailData } from '@/pages/SendMail/hooks/useMailData';
import { useRecipientData } from '@/pages/SendMail/hooks/useRecipientData';
import { useVariableList } from '@/pages/SendMail/hooks/useVariableList';

interface VariableListProps {
  partId: number;
  templateId: number;
}

export const VariableList = ({ templateId }: VariableListProps) => {
  const { variableCardData } = useVariableList(templateId);
  const { currentRecipientId } = useRecipientData(); // 현재 선택된 지원자 ID
  const { currentContent } = useMailData(templateId, currentRecipientId); // 현재 본문 데이터
  const { mailInfo } = useMailInfoContext();

  const keyOrder: string[] = [];

  // 1. 제목(subject)에서 {{var-key}} 패턴으로 추출
  if (mailInfo?.subject) {
    const subjectRegex = /{{(var-[^}]+)}}/g;
    let match;
    while ((match = subjectRegex.exec(mailInfo.subject)) !== null) {
      keyOrder.push(match[1]);
    }
  }

  // 2. 본문(HTML)에서 data-key들을 순서대로 추출
  if (currentContent) {
    const bodyRegex = /data-key="([^"]+)"/g;
    let match;
    while ((match = bodyRegex.exec(currentContent)) !== null) {
      keyOrder.push(match[1]);
    }
  }

  // 3. 중복 키 제거 (제목/본문에 등장하는 첫 번째 위치 기준)
  const uniqueKeyOrder = [...new Set(keyOrder)];

  // 3. 추출된 순서에 따라 variableCardData 정렬
  const sortedVariableData = [...variableCardData].sort((a, b) => {
    const indexA = uniqueKeyOrder.indexOf(a.key);
    const indexB = uniqueKeyOrder.indexOf(b.key);

    // 본문에 없는 변수는 맨 뒤(Infinity)로 보냄
    const posA = indexA === -1 ? Infinity : indexA;
    const posB = indexB === -1 ? Infinity : indexB;

    return posA - posB;
  });

  return (
    <div className="flex flex-col gap-4 p-4">
      {sortedVariableData.map((card) => (
        <SwitchCase
          caseBy={{
            날짜: () => (
              <DateVariableCard
                dates={card.items}
                onDateChange={card.handleUpdate}
                title={card.title}
              />
            ),
            링크: () => (
              <LinkVariableCard
                links={card.items}
                onValueChange={card.handleUpdate}
                title={card.title}
              />
            ),
            사람: () => (
              <NameVariableCard
                names={card.names}
                onAddName={(val) => !card.isIndividual && card.handleUpdate(0, val)}
                title={card.title}
              />
            ),
            텍스트: () => (
              <TextVariableCard
                onValueChange={card.handleUpdate}
                texts={card.items}
                title={card.title}
              />
            ),
          }}
          key={card.key}
          value={card.type}
        />
      ))}
    </div>
  );
};
