export type VariableType = '날짜' | '링크' | '사람' | '사람/지원자' | '텍스트' | '텍스트/파트명';

export interface Variable {
  displayName: string;
  isFixed: boolean;
  key: string;
  perRecipient: boolean;
  type: VariableType;
}

export const defaultVariables: Variable[] = [
  {
    key: 'partName',
    type: '텍스트/파트명',
    displayName: '파트명',
    perRecipient: false,
    isFixed: true,
  },
  {
    key: 'applicant',
    type: '사람/지원자',
    displayName: '지원자',
    perRecipient: true,
    isFixed: true,
  },
];
