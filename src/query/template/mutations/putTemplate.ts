import { api } from '@/apis/api.ts';
import { TemplateItem } from '@/query/template/schema';
import { Variable } from '@/types/editor';
import { AttachmentType } from '@/utils/buildMailRequest';
import { transformContentToBodyHtml, transformVariables } from '@/utils/transformTemplate.ts';

interface PutTemplateParams {
  attachments?: AttachmentType[];
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
    attachmentReferences: params.attachments?.map((a) => ({ fileId: a.fileId })) || [],
    inlineImageReferences: [],
  };

  return api
    .put<TemplateItem>(`api/mails/templates/${params.id}`, { json: formattedParams })
    .json();
};
