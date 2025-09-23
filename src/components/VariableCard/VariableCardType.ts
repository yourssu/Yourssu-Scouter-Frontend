// 공통 데이터인데 바뀔 수 있음
export interface VariableItem {
  label?: string;
  value: string;
}

export interface BaseVariableCardProps {
  count?: number;
  title: string;
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

export interface TextVariableCardProps extends BaseVariableCardProps {
  onValueChange?: (index: number, value: string) => void;
  texts: VariableItem[];
}

export interface LinkVariableCardProps extends BaseVariableCardProps {
  links: VariableItem[];
  onValueChange?: (index: number, value: string) => void;
}
