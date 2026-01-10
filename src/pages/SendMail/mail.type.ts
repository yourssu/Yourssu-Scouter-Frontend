// 메일 에디터 타입
// normal: 일반 에디터, tabs: 수신자별 탭이 나눠진 에디터
export const EDITOR_TYPES = ['normal', 'tabs'] as const;
export type EditorType = (typeof EDITOR_TYPES)[number];

export const RECIPIENT_IDS = ['recipient-0', 'recipient-1', 'recipient-2'] as const;

export type RecipientId = (typeof RECIPIENT_IDS)[number];

export interface Recipient {
  id: RecipientId;
  name: string;
}
