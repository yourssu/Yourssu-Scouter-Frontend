import { Variable } from '@/types/editor';

export interface Template {
  content: string;
  date: string;
  id: number;
  title: string;
  variables: Variable[];
}
