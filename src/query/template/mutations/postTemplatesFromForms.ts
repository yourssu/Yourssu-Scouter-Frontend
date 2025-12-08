import { api } from '@/apis/api.ts';
import { TemplateItem } from '@/query/template/schema.ts';
import { Variable } from '@/types/editor';
import { transformContentToBodyHtml, transformVariables } from '@/utils/transformTemplate.ts';

interface PostTemplateParams {
  content: string;
  title: string;
  variables: Variable[];
}

export const postTemplateFromForms = (params: PostTemplateParams) => {
  const formattedParams = {
    title: params.title,
    bodyHtml: transformContentToBodyHtml(params.content),
    variables: transformVariables(params.variables),
  };

  return api.post<TemplateItem>('api/mails/templates', { json: formattedParams }).json();
};
