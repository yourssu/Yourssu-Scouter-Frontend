export type VariableType = '날짜' | '링크' | '사람' | '사람/지원자' | '텍스트' | '텍스트/파트명';

export interface Variable {
  differentForEachPerson: boolean;
  id: string;
  name: string;
  type: VariableType;
}

export const defaultVariables: Variable[] = [
  { id: '1', type: '텍스트/파트명', name: '파트명', differentForEachPerson: false },
  { id: '2', type: '사람/지원자', name: '지원자', differentForEachPerson: true },
];
