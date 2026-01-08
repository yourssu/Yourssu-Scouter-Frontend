export type VariableType = '날짜' | '링크' | '사람' | '사람/지원자' | '텍스트' | '텍스트/파트명';
export type VariableKeyType = `var-${string}`;

export interface Variable {
  displayName: string;
  key: VariableKeyType;
  perRecipient: boolean;
  type: VariableType;
}

export const getDefaultVariables = (): Variable[] => [
  {
    key: `var-${crypto.randomUUID()}`,
    type: '텍스트/파트명',
    displayName: '파트명',
    perRecipient: false,
  },
  {
    key: `var-${crypto.randomUUID()}`,
    type: '사람/지원자',
    displayName: '지원자',
    perRecipient: true,
  },
];
