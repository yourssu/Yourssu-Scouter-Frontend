import { api } from '@/apis/api.ts';
import { Variable } from '@/types/editor';
import { transformBodyHtml, transformVariables } from '@/utils/transformTemplate.ts';

interface PostTemplateParams {
  content: string;
  title: string;
  variables: Variable[];
}

export const postTemplateFromForms = (params: PostTemplateParams) => {
  const formattedParams = {
    title: params.title,
    bodyHtml: transformBodyHtml(params.content),
    variables: transformVariables(params.variables),
  };

  return api.post('api/mails/templates', { json: formattedParams }).json();
};
