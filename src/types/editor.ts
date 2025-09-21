export type VariableType = '날짜' | '링크' | '사람' | '텍스트';

export interface Variable {
  differentForEachPerson: boolean;
  id: string;
  name: string;
  type: VariableType;
}
