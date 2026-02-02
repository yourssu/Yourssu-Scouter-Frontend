// 메일 에디터 타입
// normal: 일반 에디터, tabs: 수신자별 탭이 나눠진 에디터
export const EDITOR_TYPES = ['normal', 'tabs'] as const;
export type EditorType = (typeof EDITOR_TYPES)[number];

export type RecipientId = string;

export interface Recipient {
  id: RecipientId;
  name: string;
}
