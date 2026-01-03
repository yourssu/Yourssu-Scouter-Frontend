import { api } from '@/apis/api.ts';
import { TemplateItem } from '@/query/template/schema';
import { Variable } from '@/types/editor';
import { transformContentToBodyHtml, transformVariables } from '@/utils/transformTemplate.ts';

interface PutTemplateParams {
  content: string;
  id: number;
  title: string;
  variables: Variable[];
}

export const putTemplate = (params: PutTemplateParams) => {
  const formattedParams = {
    title: params.title,
    bodyHtml: transformContentToBodyHtml(params.content),
    variables: transformVariables(params.variables),
  };

  return api
    .put<TemplateItem>(`api/mails/templates/${params.id}`, { json: formattedParams })
    .json();
};
