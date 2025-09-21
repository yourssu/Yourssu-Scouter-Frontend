import { VariableType } from '@/types/editor';

export const getChipType = (variableType: VariableType) => {
  switch (variableType) {
    case '날짜':
      return 'date';
    case '링크':
      return 'link';
    case '사람':
      return 'person';
    case '지원자':
      return 'applicant';
    case '텍스트':
      return 'text';
    case '파트명':
      return 'part';
    default:
      return 'part';
  }
};
