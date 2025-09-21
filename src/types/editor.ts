export type VariableType = '날짜' | '링크' | '사람' | '지원자' | '텍스트' | '파트명';

export interface Variable {
  differentForEachPerson: boolean;
  id: string;
  name: string;
  type: VariableType;
}
