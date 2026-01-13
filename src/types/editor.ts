export type VariableType = '날짜' | '링크' | '사람' | '사람/지원자' | '텍스트' | '텍스트/파트명';
export type VariableKeyType = `var-${string}`;

export interface BaseVariable {
  displayName: string;
  key: VariableKeyType;
  perRecipient: boolean;
  type: VariableType;
}

export interface Variable extends Omit<BaseVariable, 'items' | 'type'> {
  items: { value: string }[];
  type: VariableType;
}

export const getDefaultVariables = (): Variable[] => [
  {
    key: `var-${crypto.randomUUID()}`,
    type: '텍스트/파트명',
    displayName: '파트명',
    perRecipient: false,
    items: [{ value: '' }],
  },
  {
    key: `var-${crypto.randomUUID()}`,
    type: '사람/지원자',
    displayName: '지원자',
    perRecipient: true,
    items: [],
  },
];

export const InputFieldTypes = ['받는 사람', '보내는 사람', '숨은 참조', '제목'] as const;
export type InputFieldKey = (typeof InputFieldTypes)[number];
