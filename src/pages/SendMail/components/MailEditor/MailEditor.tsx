import { Suspense } from 'react';

import { useMailData } from '@/pages/SendMail/hooks/useMailData';
import { useRecipientData } from '@/pages/SendMail/hooks/useRecipientData';
import { Part } from '@/query/part/schema';

import { MailEditorContent } from '../MailEditorContent/MailEditorContent';
import { MailHeader } from '../MailHeader/MailHeader';
import { EditorContainer } from './MailEditor.style';

interface MailEditorProps {
  selectedPart: Part;
  selectedTemplateId?: number;
}

export const MailEditor = ({ selectedPart, selectedTemplateId }: MailEditorProps) => {
  const { recipients, currentRecipientId, currentRecipientName, setCurrentRecipientId } =
    useRecipientData(selectedPart);

  const { currentContent, handleContentChange } = useMailData(
    selectedTemplateId,
    currentRecipientId,
  );

  const handleTabChange = (id: string) => {
    setCurrentRecipientId(id);
  };

  return (
    <EditorContainer>
      <MailHeader
        activeTabId={currentRecipientId}
        onTabChange={handleTabChange}
        recipients={recipients}
        type="tabs"
      />
      <Suspense fallback={<div>에디터 로딩 중...</div>}>
        <MailEditorContent
          initialContent={currentContent}
          key={currentRecipientId} // 탭 변경 시 컴포넌트 리렌더링을 위한 key 설정
          onContentChange={handleContentChange}
          recipientName={currentRecipientName}
        />
      </Suspense>
    </EditorContainer>
  );
};
