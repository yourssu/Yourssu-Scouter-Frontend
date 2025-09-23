import { Editor } from '@tiptap/react';

import ChangeBold from '@/assets/SendMail/ChangeBold.svg';
import ChangeItalic from '@/assets/SendMail/ChangeItalic.svg';
import ChangeLink from '@/assets/SendMail/ChangeLink.svg';
import ChangeOrdered_list from '@/assets/SendMail/ChangeOrdered-list.svg';
import ChangePhoto from '@/assets/SendMail/ChangePhoto.svg';
import ChangeStrike from '@/assets/SendMail/ChangeStrike.svg';
import ChangeText_align_left from '@/assets/SendMail/ChangeText-align-left.svg';
import ChangeText_align_right from '@/assets/SendMail/ChangeText-align-right.svg';
import ChangeText_align from '@/assets/SendMail/ChangeText-align.svg';
import ChangeUnderline from '@/assets/SendMail/ChangeUnderline.svg';
import ChangeUnordered_list from '@/assets/SendMail/ChangeUnordered-list.svg';
import { IcArrowsChevronDownFilled } from '@yourssu/design-system-react';
import {
  ColorButton,
  Divider,
  FontFamilySelect,
  FontSizeSelect,
  ToolbarButton,
  ToolbarContainer,
  ToolbarGroup,
} from './MailToolbar.style';

interface MailToolbarProps {
  editor: Editor | null;
}

export const MailToolbar = ({ editor }: MailToolbarProps) => {
  if (!editor) {
    return null;
  }

  const colors = ['#000000', '#334155', '#5736F5'];
  const fontSizes = ['12px', '14px', '16px', '18px', '20px', '24px'];
  const fontFamilies = ['Arial', 'Times New Roman', 'Courier New', 'Georgia', 'Verdana'];

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
        <IcArrowsChevronDownFilled
          color={'#98A2B3'}
          width={16}
          height={16}
          style={{
            position: 'absolute',
            right: '8px',
            pointerEvents: 'none',
          }}
        />
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
        <IcArrowsChevronDownFilled
          color={'#98A2B3'}
          width={16}
          height={16}
          style={{
            position: 'absolute',
            right: '8px',
            pointerEvents: 'none',
          }}
        />
      </ToolbarGroup>

      <Divider />

      <ToolbarGroup>
        {colors.map((color) => (
          <ColorButton
            className={editor.isActive('textStyle', { color }) ? 'is-active' : ''}
            color={color}
            key={color}
            onClick={() => editor.chain().focus().setColor(color).run()}
          />
        ))}
      </ToolbarGroup>

      <ToolbarGroup>
        <ToolbarButton
          className={editor.isActive('bold') ? 'is-active' : ''}
          onClick={() => editor.chain().focus().toggleBold().run()}
          title="Bold"
          type="button"
        >
          <img alt="Bold" src={ChangeBold} />
        </ToolbarButton>
        <ToolbarButton
          className={editor.isActive('italic') ? 'is-active' : ''}
          onClick={() => editor.chain().focus().toggleItalic().run()}
          title="Italic"
          type="button"
        >
          <img alt="Italic" src={ChangeItalic} />
        </ToolbarButton>
        <ToolbarButton
          className={editor.isActive('underline') ? 'is-active' : ''}
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          title="Underline"
          type="button"
        >
          <img alt="Underline" src={ChangeUnderline} />
        </ToolbarButton>
        <ToolbarButton
          className={editor.isActive('strike') ? 'is-active' : ''}
          onClick={() => editor.chain().focus().toggleStrike().run()}
          title="Strike"
          type="button"
        >
          <img alt="Strike" src={ChangeStrike} />
        </ToolbarButton>
      </ToolbarGroup>

      <Divider />

      <ToolbarGroup>
        <ToolbarButton
          className={editor.isActive({ textAlign: 'left' }) ? 'is-active' : ''}
          onClick={() => editor.chain().focus().setTextAlign('left').run()}
          title="Align Left"
          type="button"
        >
          <img alt="Align Left" src={ChangeText_align_left} />
        </ToolbarButton>
        <ToolbarButton
          className={editor.isActive({ textAlign: 'center' }) ? 'is-active' : ''}
          onClick={() => editor.chain().focus().setTextAlign('center').run()}
          title="Align Center"
          type="button"
        >
          <img alt="Align Center" src={ChangeText_align} />
        </ToolbarButton>
        <ToolbarButton
          className={editor.isActive({ textAlign: 'right' }) ? 'is-active' : ''}
          onClick={() => editor.chain().focus().setTextAlign('right').run()}
          title="Align Right"
          type="button"
        >
          <img alt="Align Right" src={ChangeText_align_right} />
        </ToolbarButton>
      </ToolbarGroup>

      <Divider />

      <ToolbarGroup>
        <ToolbarButton
          className={editor.isActive('orderedList') ? 'is-active' : ''}
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          title="Ordered List"
          type="button"
        >
          <img alt="Ordered List" src={ChangeOrdered_list} />
        </ToolbarButton>
        <ToolbarButton
          className={editor.isActive('bulletList') ? 'is-active' : ''}
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          title="Bullet List"
          type="button"
        >
          <img alt="Bullet List" src={ChangeUnordered_list} />
        </ToolbarButton>
      </ToolbarGroup>

      <Divider />

      <ToolbarGroup>
        <ToolbarButton
          onClick={() => {
            // 이미지 업로드 로직 구현 필요
            const url = window.prompt('이미지 URL 입력:');
            if (url) {
              editor.chain().focus().setImage({ src: url }).run();
            }
          }}
          title="Insert Img"
          type="button"
        >
          <img alt="Insert Img" src={ChangePhoto} />
        </ToolbarButton>

        <ToolbarButton
          className={editor.isActive('link') ? 'is-active' : ''}
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
              editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run();
            } catch (error) {
              console.error(error);
            }
          }}
          title="Insert Link"
          type="button"
        >
          <img alt="Insert Link" src={ChangeLink} />
        </ToolbarButton>
      </ToolbarGroup>
    </ToolbarContainer>
  );
};
