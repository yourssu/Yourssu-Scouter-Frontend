import { Editor } from '@tiptap/react';
import { IcArrowsChevronDownFilled } from '@yourssu/design-system-react';
import { useRef } from 'react';

import { IcChangeBold } from '@/components/Icons/Editor/IcChangeBold';
import { IcChangeItalic } from '@/components/Icons/Editor/IcChangeItalic';
import { IcChangeLink } from '@/components/Icons/Editor/IcChangeLink';
import { IcChangeOrderedList } from '@/components/Icons/Editor/IcChangeOrderedList';
import { IcChangePhoto } from '@/components/Icons/Editor/IcChangePhoto';
import { IcChangeStrike } from '@/components/Icons/Editor/IcChangeStrike';
import { IcChangeTextAlign } from '@/components/Icons/Editor/IcChangeTextAlign';
import { IcChangeTextAlignLeft } from '@/components/Icons/Editor/IcChangeTextAlignLeft';
import { IcChangeTextAlignRight } from '@/components/Icons/Editor/IcChangeTextAlignRight';
import { IcChangeUnderline } from '@/components/Icons/Editor/IcChangeUnderline';
import { IcChangeUnorderedList } from '@/components/Icons/Editor/IcChangeUnorderedList';

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
  const imageInputRef = useRef<HTMLInputElement>(null);

  if (!editor) {
    return null;
  }

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) {
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      const dataUrl = reader.result as string;
      editor.chain().focus().setImage({ src: dataUrl }).run();
    };
    reader.readAsDataURL(file);

    // input 초기화 (같은 파일 다시 선택 가능하도록)
    event.target.value = '';
  };

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
          height={16}
          style={{
            position: 'absolute',
            right: '8px',
            pointerEvents: 'none',
          }}
          width={16}
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
          height={16}
          style={{
            position: 'absolute',
            right: '8px',
            pointerEvents: 'none',
          }}
          width={16}
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
          <IcChangeBold />
        </ToolbarButton>
        <ToolbarButton
          className={editor.isActive('italic') ? 'is-active' : ''}
          onClick={() => editor.chain().focus().toggleItalic().run()}
          title="Italic"
          type="button"
        >
          <IcChangeItalic />
        </ToolbarButton>
        <ToolbarButton
          className={editor.isActive('underline') ? 'is-active' : ''}
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          title="Underline"
          type="button"
        >
          <IcChangeUnderline />
        </ToolbarButton>
        <ToolbarButton
          className={editor.isActive('strike') ? 'is-active' : ''}
          onClick={() => editor.chain().focus().toggleStrike().run()}
          title="Strike"
          type="button"
        >
          <IcChangeStrike />
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
          <IcChangeTextAlignLeft />
        </ToolbarButton>
        <ToolbarButton
          className={editor.isActive({ textAlign: 'center' }) ? 'is-active' : ''}
          onClick={() => editor.chain().focus().setTextAlign('center').run()}
          title="Align Center"
          type="button"
        >
          <IcChangeTextAlign />
        </ToolbarButton>
        <ToolbarButton
          className={editor.isActive({ textAlign: 'right' }) ? 'is-active' : ''}
          onClick={() => editor.chain().focus().setTextAlign('right').run()}
          title="Align Right"
          type="button"
        >
          <IcChangeTextAlignRight />
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
          <IcChangeOrderedList />
        </ToolbarButton>
        <ToolbarButton
          className={editor.isActive('bulletList') ? 'is-active' : ''}
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          title="Bullet List"
          type="button"
        >
          <IcChangeUnorderedList />
        </ToolbarButton>
      </ToolbarGroup>

      <Divider />

      <ToolbarGroup>
        <input
          accept="image/png,image/jpeg,image/gif,image/webp"
          onChange={handleImageUpload}
          ref={imageInputRef}
          style={{ display: 'none' }}
          type="file"
        />
        <ToolbarButton
          onClick={() => imageInputRef.current?.click()}
          title="Insert Img"
          type="button"
        >
          <IcChangePhoto />
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
          <IcChangeLink />
        </ToolbarButton>
      </ToolbarGroup>
    </ToolbarContainer>
  );
};
