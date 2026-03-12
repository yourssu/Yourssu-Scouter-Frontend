import { Chip, TextField } from '@yourssu/design-system-react';

import { VariableCard } from './VariableCard';
import { InputContainer } from './VariableCard.style';
import { LinkVariableCardProps } from './VariableCardType';

export const LinkVariableCard = ({ title, links, onValueChange }: LinkVariableCardProps) => {
  const hasLabels = links.some((link) => link.label);
  const count = hasLabels ? links.length : undefined;

  const handleValueChange = (index: number, text: string, url: string) => {
    if (onValueChange) {
      if (!text && !url) {
        onValueChange(index, '');
      } else {
        onValueChange(index, JSON.stringify({ text, url }));
      }
    }
  };

  return (
    <VariableCard count={count} title={title}>
      {links.map((link, index) => {
        let text = '';
        let url = link.value;

        try {
          const parsed = JSON.parse(link.value);
          if (parsed && typeof parsed === 'object' && 'url' in parsed) {
            text = parsed.text || '';
            url = parsed.url || '';
          }
        } catch {
          // Fallback to old format
        }

        return (
          <InputContainer key={index} style={{ alignItems: 'flex-start' }}>
            {link.label && (
              <Chip role="input" size="medium" style={{ whiteSpace: 'nowrap', marginTop: '12px' }}>
                {link.label}
              </Chip>
            )}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', width: '100%' }}>
              <TextField
                onChange={(e) => handleValueChange(index, e.target.value, url)}
                onClearButtonClick={() => handleValueChange(index, '', url)}
                placeholder="(선택) 링크 텍스트 입력"
                value={text}
              />
              <TextField
                onChange={(e) => handleValueChange(index, text, e.target.value)}
                onClearButtonClick={() => handleValueChange(index, text, '')}
                placeholder="링크 URL 입력"
                type="url"
                value={url}
              />
            </div>
          </InputContainer>
        );
      })}
    </VariableCard>
  );
};
