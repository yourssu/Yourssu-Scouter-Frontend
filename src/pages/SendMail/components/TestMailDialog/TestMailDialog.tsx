import { useMutation, useSuspenseQuery } from '@tanstack/react-query';
import { TextField } from '@yourssu/design-system-react';
import { useState } from 'react';

import { Dialog } from '@/components/dialog';
import { MailContentData, MailInfoData } from '@/pages/SendMail/context';
import { postMailReservation } from '@/query/mail/mutation/postMailReservation';
import { meOption } from '@/query/member/me/options';
import { buildMailRequest } from '@/utils/buildMailRequest';

export interface TestMailDialogProps {
  close: ({ error, success }: { error?: unknown; success: boolean }) => void;
  content: string;
  getVariableValue: (
    key: string,
    perRecipient: boolean,
    label: string,
    targetId?: string,
  ) => string | undefined;
  isOpen: boolean;
  mailContent: MailContentData;
  mailInfo: MailInfoData;
}

export const TestMailDialog = ({
  close,
  content,
  getVariableValue,
  isOpen,
  mailContent,
  mailInfo,
}: TestMailDialogProps) => {
  const { data: me } = useSuspenseQuery(meOption());
  const [email, setEmail] = useState(me.email);

  const { mutateAsync: sendTestMail, isPending: loading } = useMutation({
    mutationFn: postMailReservation,
  });

  const handleSend = async () => {
    if (!email) {
      return;
    }

    const inlineImageReferences: { contentId: string; fileId: number }[] = [];
    const parser = new DOMParser();
    const doc = parser.parseFromString(content, 'text/html');

    // 변수 칩 처리
    const chips = doc.querySelectorAll('span[data-variable-chip]');
    chips.forEach((chip) => {
      const label = chip.getAttribute('data-label') || '';
      const key = chip.getAttribute('data-key') || '';
      const isPerRecipient = chip.getAttribute('data-per-recipient') === 'true';

      if (isPerRecipient) {
        // 사람마다 다른 변수는 '{{변수이름}}' 형태로 유지
        const textNode = doc.createTextNode(`{{${label}}}`);
        chip.parentNode?.replaceChild(textNode, chip);
      } else {
        // 공통 변수는 실제 값으로 치환
        const value = getVariableValue(key, false, label) ?? '';
        const type = chip.getAttribute('data-type');
        if (type === 'LINK' && value.trim()) {
          let linkText = value;
          let linkUrl = value;
          try {
            const parsed = JSON.parse(value);
            if (parsed && typeof parsed === 'object') {
              linkText = parsed.text || parsed.url || value;
              linkUrl = parsed.url || value;
            }
          } catch {
            // fallback
          }

          const a = doc.createElement('a');
          a.href = linkUrl.startsWith('http') ? linkUrl : `https://${linkUrl}`;
          a.style.color = '#1155cc';
          a.style.textDecoration = 'underline';
          a.textContent = linkText;
          a.target = '_blank';
          a.rel = 'noreferrer';
          chip.parentNode?.replaceChild(a, chip);
        } else {
          const textNode = doc.createTextNode(value);
          chip.parentNode?.replaceChild(textNode, chip);
        }
      }
    });

    const images = doc.querySelectorAll('img');
    images.forEach((img) => {
      const fileIdAttr = img.getAttribute('data-file-id');
      const contentIdAttr = img.getAttribute('data-content-id');
      if (fileIdAttr && contentIdAttr) {
        const fileId = parseInt(fileIdAttr, 10);
        if (!isNaN(fileId)) {
          inlineImageReferences.push({ contentId: contentIdAttr, fileId });
        }
      }
    });

    const finalBody = doc.body.innerHTML;

    const req = buildMailRequest({
      inlineImageReferences,
      mailContent: {
        ...mailContent,
        body: finalBody,
      },
      mailInfo: {
        ...mailInfo,
        cc: [],
        bcc: [],
        receiver: [email],
      },
      reservedDate: null,
    });

    try {
      await sendTestMail(req.request);
      close({ success: true });
    } catch (error) {
      close({ error, success: false });
    }
  };

  return (
    <Dialog closeableWithOutside onClose={() => close({ success: false })} open={isOpen}>
      <Dialog.Header onClickCloseButton={() => close({ success: false })}>
        <Dialog.Title>테스트 메일 발송하기</Dialog.Title>
      </Dialog.Header>

      <Dialog.Content>
        <div className="min-w-80">
          <div className="bg-bg-basicLight mb-2.5 rounded-xl p-4">
            <div className="text-15 text-text-basicPrimary font-medium">테스트 메일</div>
            <ul className="text-sm">
              <li>- 발송까지 최대 1분 정도 소요될 수 있어요.</li>
              <li>- 받는사람과 숨은참조로는 발송되지 않아요.</li>
              <li>
                - 사람마다 다르게 지정되는 변수는{' '}
                <code className="mx-0.5">
                  {'{{'}변수이름{'}}'}
                </code>
                으로 표시돼요.
              </li>
            </ul>
          </div>
          <div>
            <div className="mb-1 text-sm font-medium">받을 이메일</div>
            <TextField
              defaultValue={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="이메일을 입력하세요"
            />
          </div>
        </div>
      </Dialog.Content>

      <Dialog.ButtonGroup>
        <Dialog.Button
          onClick={() => close({ success: false })}
          size="large"
          variant="filledSecondary"
        >
          취소
        </Dialog.Button>
        <Dialog.Button
          disabled={!email || loading}
          onClick={handleSend}
          size="large"
          variant="filledPrimary"
        >
          발송
        </Dialog.Button>
      </Dialog.ButtonGroup>
    </Dialog>
  );
};
