import { Extension } from '@tiptap/core';
import { Plugin, PluginKey } from '@tiptap/pm/state';
import { EditorView } from '@tiptap/pm/view';

/**
 * 외부에서 붙여넣은 콘텐츠는 plain text로만 삽입하고,
 * 에디터 내부에서 복사한 콘텐츠(링크, 변수칩 등)는 서식을 그대로 유지하는 Extension.
 *
 * ProseMirror는 에디터 내부 복사 시 클립보드 HTML에 `data-pm-slice` 속성을 포함하므로,
 * 이를 기준으로 내부/외부 복사를 구분합니다.
 *
 * Link extension의 autolink/linkOnPaste에 의한 URL 자동 링크 변환을 방지하기 위해,
 * insertText 대신 텍스트 노드를 직접 생성하고 paste 메타를 제거합니다.
 */

/**
 * plain text를 링크 변환 없이 삽입한다.
 * - schema.text()로 마크 없는 텍스트 노드를 생성
 * - paste/uiEvent 메타를 false로 설정하여 Link extension의 linkOnPaste 우회
 */
function insertPlainText(view: EditorView, text: string) {
  const { tr, schema } = view.state;
  const textNode = schema.text(text);
  tr.replaceSelectionWith(textNode, false);
  tr.setMeta('paste', false);
  tr.setMeta('uiEvent', false);
  view.dispatch(tr);
}

export const PlainTextPaste = Extension.create({
  name: 'plainTextPaste',

  addProseMirrorPlugins() {
    return [
      new Plugin({
        key: new PluginKey('plainTextPaste'),
        props: {
          handlePaste(view, event) {
            const clipboardData = event.clipboardData;
            if (!clipboardData) {
              return false;
            }

            const html = clipboardData.getData('text/html');
            const text = clipboardData.getData('text/plain');

            // HTML이 없고 plain text만 있는 경우
            if (!html) {
              // URL 패턴이면 linkOnPaste에 의한 자동 링크 변환을 방지하기 위해 직접 삽입
              // (크롬 "하이라이트 링크 복사" 등이 HTML 없이 URL만 넣는 경우 대응)
              if (text && /^https?:\/\/\S+$/i.test(text.trim())) {
                event.preventDefault();
                insertPlainText(view, text);
                return true;
              }
              return false;
            }

            // 에디터 내부에서 복사한 경우 → 기본 동작 유지 (서식 보존)
            if (html.includes('data-pm-slice')) {
              return false;
            }

            // 외부에서 복사한 HTML이 있는 경우 → plain text로만 삽입
            if (text) {
              event.preventDefault();
              insertPlainText(view, text);
              return true;
            }

            return false;
          },
        },
      }),
    ];
  },
});
