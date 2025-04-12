export type VariableType = 'name' | 'date' | 'text' | 'link';

// 공통 데이터인데 바뀔 수 있음
export interface VariableItem {
  label?: string;
  value: string;
}

export interface BaseVariableCardProps {
  title: string;
  count?: number;
}

export interface NameVariableCardProps extends BaseVariableCardProps {
  names: string[];
  onAddName?: (name: string) => void;
  onRemoveName?: (name: string) => void;
}

export interface DateVariableCardProps extends BaseVariableCardProps {
  dates: VariableItem[];
  onDateChange?: (index: number, value: string) => void;
}
