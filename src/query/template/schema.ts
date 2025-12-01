import { z } from 'zod';

export const VariableNames = ['PERSON', 'DATE', 'LINK', 'TEXT'] as const;
export type VariableNames = (typeof VariableNames)[number];

const VariableSchema = z.object({
  key: z.string(),
  type: z.enum(VariableNames).optional().nullable(),
  displayName: z.string(),
  perRecipient: z.boolean(),
});

export const BaseTemplateSchema = z.object({
  id: z.number(),
  title: z.string(),
  bodyHtml: z.string(),
  variables: z.array(VariableSchema),
  updatedAt: z.string(),
});

export const TemplateListItemSchema = BaseTemplateSchema.pick({
  id: true,
  title: true,
  updatedAt: true,
});

export const TemplateListResponseSchema = z.object({
  content: z.array(TemplateListItemSchema),
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
export type TemplateListItem = z.infer<typeof TemplateListItemSchema>;
export type TemplatePayload = z.infer<typeof TemplatePayloadSchema>;
export type TemplateListResponse = z.infer<typeof TemplateListResponseSchema>;
