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
  const { defaultContent } = useMailData(selectedTemplateId!);

  // 탭 변경 시 컨텍스트 상태 업데이트
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
          // 사용자가 수정한 내용이 있으면 그걸 보여주고, 없으면 템플릿 기본값 사용
          initialContent={defaultContent}
          key={currentRecipientId} // ID가 바뀔 때마다 에디터를 새로 그려서 내용을 교체함
          recipientName={currentRecipientName}
        />
      </Suspense>
    </EditorContainer>
  );
};
