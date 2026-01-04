import { z } from 'zod';

import { VariableKeyType } from '@/types/editor';

const VariableType = ['PERSON', 'DATE', 'LINK', 'TEXT', 'APPLICANT', 'PARTNAME'] as const;
export type VariableTypeName = (typeof VariableType)[number];

const VariableKeyTypeSchema = z.custom<VariableKeyType>(
  (val) => typeof val === 'string' && val.startsWith('var-'),
  {
    message: "key는 반드시 'var-'로 시작해야 합니다.",
  },
);

const VariableSchema = z.object({
  key: VariableKeyTypeSchema,
  type: z.enum(VariableType),
  displayName: z.string(),
  perRecipient: z.boolean(),
});

export const VariablePayloadSchema = VariableSchema.extend({
  key: z.custom<VariableKeyType>((val) => typeof val === 'string' && val.startsWith('var-'), {
    message: "서버에 저장하려면 key가 'var-'로 시작해야 합니다.",
  }),
});

export const BaseTemplateSchema = z.object({
  id: z.number(),
  title: z.string(),
  bodyHtml: z.string(),
  variables: z.array(VariableSchema),
  updatedAt: z.string(),
});

export const TemplateItemSchema = BaseTemplateSchema.pick({
  id: true,
  title: true,
  updatedAt: true,
});

export const TemplateListResponseSchema = z.object({
  content: z.array(TemplateItemSchema),
  page: z.number(),
  size: z.number(),
  totalElements: z.number(),
  totalPages: z.number(),
});

export const TemplatePayloadSchema = BaseTemplateSchema.omit({
  id: true,
  updatedAt: true,
});

export type Template = z.infer<typeof BaseTemplateSchema>;
export type TemplateItem = z.infer<typeof TemplateItemSchema>;
export type TemplatePayload = z.infer<typeof TemplatePayloadSchema>;
export type TemplateListResponse = z.infer<typeof TemplateListResponseSchema>;
