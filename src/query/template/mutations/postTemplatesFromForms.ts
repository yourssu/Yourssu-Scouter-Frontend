import { api } from '@/apis/api.ts';
import { TemplateItem } from '@/query/template/schema.ts';
import { Variable } from '@/types/editor';
import { AttachmentType } from '@/utils/buildMailRequest';
import { transformContentToBodyHtml, transformVariables } from '@/utils/transformTemplate.ts';

interface PostTemplateParams {
  attachments?: AttachmentType[];
  content: string;
  title: string;
  variables: Variable[];
}

export const postTemplateFromForms = (params: PostTemplateParams) => {
  const formattedParams = {
    title: params.title,
    bodyHtml: transformContentToBodyHtml(params.content),
    variables: transformVariables(params.variables),
    attachmentReferences: params.attachments?.map((a) => ({ fileId: a.fileId })) || [],
    inlineImageReferences: [],
  };

  return api.post<TemplateItem>('api/mails/templates', { json: formattedParams }).json();
};
