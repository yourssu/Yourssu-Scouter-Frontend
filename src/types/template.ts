import { Variable } from '@/types/editor';

export interface Template {
  attachments: { fileId: number; name: string }[];
  content: string;
  date: string;
  id: number;
  subject: string;
  title: string;
  variables: Variable[];
}
