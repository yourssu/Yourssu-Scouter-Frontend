import { VariableType } from '@/types/editor';

export const getChipType = (variableType: VariableType, variableName: string) => {
  switch (variableType) {
    case '링크':
      return 'link';
    case '사람':
      if (variableName === '지원자') {
        return 'applicant';
      } else {
        return 'person';
      }
    case '텍스트':
      if (variableName === '파트명') {
        return 'part';
      } else {
        return 'text';
      }
    case '날짜':
      return 'date';
    default:
      return 'part';
  }
};
