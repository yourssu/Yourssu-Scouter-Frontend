import { VariableType } from '@/types/editor';
export const fixedVariableTypes: VariableType[] = ['텍스트/파트명', '사람/지원자'];

export const checkIsDeletable = (type: VariableType): boolean => {
  return !fixedVariableTypes.includes(type);
};
