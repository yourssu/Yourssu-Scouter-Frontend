import ChangeBold from '@/assets/SendMail/ChangeBold.svg';
import ChangeItalic from '@/assets/SendMail/ChangeItalic.svg';
import { Editor } from '@tiptap/react';
import {
  ColorButton,
  Divider,
  FontFamilySelect,
  FontSizeSelect,
  ToolbarButton,
  ToolbarContainer,
  ToolbarGroup,
} from './MailToolbar.style';

import ChangeLink from '@/assets/SendMail/ChangeLink.svg';
import ChangeOrdered_list from '@/assets/SendMail/ChangeOrdered-list.svg';
import ChangePhoto from '@/assets/SendMail/ChangePhoto.svg';
import ChangeStrike from '@/assets/SendMail/ChangeStrike.svg';
import ChangeText_align_left from '@/assets/SendMail/ChangeText-align-left.svg';
import ChangeText_align_right from '@/assets/SendMail/ChangeText-align-right.svg';
import ChangeText_align from '@/assets/SendMail/ChangeText-align.svg';
import ChangeUnderline from '@/assets/SendMail/ChangeUnderline.svg';
import ChangeUnordered_list from '@/assets/SendMail/ChangeUnordered-list.svg';

interface MailToolbarProps {
  editor: Editor | null;
}

export const MailToolbar = ({ editor }: MailToolbarProps) => {
  if (!editor) {
    return null;
  }

  const colors = ['#000000', '#334155', '#5736F5'];
  const fontSizes = ['12px', '14px', '16px', '18px', '20px', '24px'];
  const fontFamilies = [
    'Arial',
    'Times New Roman',
    'Courier New',
    'Georgia',
    'Verdana',
  ];

  const handleFontSizeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const size = e.target.value;
    editor.chain().focus().setFontSize(size).run();
  };

  const handleFontFamilyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const font = e.target.value;
    editor.chain().focus().setFontFamily(font).run();
  };

  return (
    <ToolbarContainer>
      <ToolbarGroup>
        <FontSizeSelect onChange={handleFontSizeChange} title="Font Size">
          <option value="">Size</option>
          {fontSizes.map((size) => (
            <option key={size} value={size}>
              {size}
            </option>
          ))}
        </FontSizeSelect>
      </ToolbarGroup>

      <ToolbarGroup>
        <FontFamilySelect onChange={handleFontFamilyChange} title="Font Family">
          <option value="">Font</option>
          {fontFamilies.map((font) => (
            <option key={font} value={font}>
              {font}
            </option>
          ))}
        </FontFamilySelect>
      </ToolbarGroup>

      <Divider />

      <ToolbarGroup>
        {colors.map((color) => (
          <ColorButton
            key={color}
            color={color}
            onClick={() => editor.chain().focus().setColor(color).run()}
            className={
              editor.isActive('textStyle', { color }) ? 'is-active' : ''
            }
          />
        ))}
      </ToolbarGroup>

      <ToolbarGroup>
        <ToolbarButton
          type="button"
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={editor.isActive('bold') ? 'is-active' : ''}
          title="Bold"
        >
          <img src={ChangeBold} alt="Bold" />
        </ToolbarButton>
        <ToolbarButton
          type="button"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={editor.isActive('italic') ? 'is-active' : ''}
          title="Italic"
        >
          <img src={ChangeItalic} alt="Italic" />
        </ToolbarButton>
        <ToolbarButton
          type="button"
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          className={editor.isActive('underline') ? 'is-active' : ''}
          title="Underline"
        >
          <img src={ChangeUnderline} alt="Underline" />
        </ToolbarButton>
        <ToolbarButton
          type="button"
          onClick={() => editor.chain().focus().toggleStrike().run()}
          className={editor.isActive('strike') ? 'is-active' : ''}
          title="Strike"
        >
          <img src={ChangeStrike} alt="Strike" />
        </ToolbarButton>
      </ToolbarGroup>

      <Divider />

      <ToolbarGroup>
        <ToolbarButton
          type="button"
          onClick={() => editor.chain().focus().setTextAlign('left').run()}
          className={editor.isActive({ textAlign: 'left' }) ? 'is-active' : ''}
          title="Align Left"
        >
          <img src={ChangeText_align_left} alt="Align Left" />
        </ToolbarButton>
        <ToolbarButton
          type="button"
          onClick={() => editor.chain().focus().setTextAlign('center').run()}
          className={
            editor.isActive({ textAlign: 'center' }) ? 'is-active' : ''
          }
          title="Align Center"
        >
          <img src={ChangeText_align} alt="Align Center" />
        </ToolbarButton>
        <ToolbarButton
          type="button"
          onClick={() => editor.chain().focus().setTextAlign('right').run()}
          className={editor.isActive({ textAlign: 'right' }) ? 'is-active' : ''}
          title="Align Right"
        >
          <img src={ChangeText_align_right} alt="Align Right" />
        </ToolbarButton>
      </ToolbarGroup>

      <Divider />

      <ToolbarGroup>
        <ToolbarButton
          type="button"
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={editor.isActive('orderedList') ? 'is-active' : ''}
          title="Ordered List"
        >
          <img src={ChangeOrdered_list} alt="Ordered List" />
        </ToolbarButton>
        <ToolbarButton
          type="button"
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={editor.isActive('bulletList') ? 'is-active' : ''}
          title="Bullet List"
        >
          <img src={ChangeUnordered_list} alt="Bullet List" />
        </ToolbarButton>
      </ToolbarGroup>

      <Divider />

      <ToolbarGroup>
        <ToolbarButton
          type="button"
          onClick={() => {
            // 이미지 업로드 로직 구현 필요
            const url = window.prompt('이미지 URL 입력:');
            if (url) {
              editor.chain().focus().setImage({ src: url }).run();
            }
          }}
          title="Insert Img"
        >
          <img src={ChangePhoto} alt="Insert Img" />
        </ToolbarButton>

        <ToolbarButton
          type="button"
          onClick={() => {
            const previousUrl = editor.getAttributes('link').href;
            const url = window.prompt('URL 입력:', previousUrl);

            if (url === null) {
              return;
            }

            if (url === '') {
              editor.chain().focus().extendMarkRange('link').unsetLink().run();
              return;
            }

            try {
              editor
                .chain()
                .focus()
                .extendMarkRange('link')
                .setLink({ href: url })
                .run();
            } catch (error) {
              console.log(error);
            }
          }}
          className={editor.isActive('link') ? 'is-active' : ''}
          title="Insert Link"
        >
          <img src={ChangeLink} alt="Insert Link" />
        </ToolbarButton>
      </ToolbarGroup>
    </ToolbarContainer>
  );
};
