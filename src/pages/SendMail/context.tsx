import { assert } from 'es-toolkit';
import { createContext, ReactNode, useContext, useMemo, useState } from 'react';

import { RecipientId } from '@/pages/SendMail/mail.type';
import { Part } from '@/query/part/schema';
import { VariableState } from '@/types/editor';

// 1. 변수 관리 관련 타입
interface MailVariableContextProps {
  actions: {
    resetVariables: () => void;
    setCurrentApplicantId: (id: RecipientId | undefined) => void;
    updateCommonValue: (key: string, value: string) => void;
    updateIndividualValue: (applicantId: RecipientId, key: string, value: string) => void;
  };
  currentApplicantId: RecipientId | undefined;
  currentPart: Part | undefined;
  variableValue: VariableState;
}

// 2. 메일 내용 관련 타입 (제목, 본문, 이미지, 파일)
interface MailContentData {
  attachments: string;
  body: Record<string, string>; // 지원자 id, 본문 내용
  bodyFormat: 'HTML' | 'PLAIN_TEXT';
  inlineImages: string;
  subject: string;
}

interface MailContentContextProps {
  actions: {
    sendReservation: () => Promise<void>;
    setReservationTime: (date: Date | null) => void;
    updateBody: (id: string, html: string) => void;
    updateMailContent: (data: Partial<MailContentData>) => void;
  };
  mailContent: MailContentData;
  reservationTime: Date | null;
}

// 3. 메일 인포 관련 타입 (받는사람, 참조, 숨은참조)
interface MailInfoData {
  bcc: string[];
  cc: string[];
  receiver: string[];
}

interface MailInfoContextProps {
  actions: {
    updateMailInfo: (data: Partial<MailInfoData>) => void;
  };
  mailInfo: MailInfoData;
}

// context 생성
export const MailVariableContext = createContext<MailVariableContextProps | null>(null);
export const MailContentContext = createContext<MailContentContextProps | null>(null);
export const MailInfoContext = createContext<MailInfoContextProps | null>(null);

// 1. 변수 관리 Provider
export const MailVariableProvider = ({
  children,
  currentPart,
}: {
  children: ReactNode;
  currentPart: Part | undefined;
}) => {
  const [variableValue, setVariableValue] = useState<VariableState>({
    common: {},
    perApplicant: {},
  });
  const [currentApplicantId, setCurrentApplicantId] = useState<RecipientId | undefined>(undefined);

  const actions = useMemo(
    () => ({
      setCurrentApplicantId,
      updateCommonValue: (key: string, value: string) =>
        setVariableValue((prev) => ({ ...prev, common: { ...prev.common, [key]: value } })),
      updateIndividualValue: (applicantId: RecipientId, key: string, value: string) =>
        setVariableValue((prev) => ({
          ...prev,
          perApplicant: {
            ...prev.perApplicant,
            [applicantId]: { ...prev.perApplicant[applicantId], [key]: value },
          },
        })),
      resetVariables: () => setVariableValue({ common: {}, perApplicant: {} }),
    }),
    [],
  );

  if (!currentPart) {
    return <>{children}</>;
  }

  return (
    <MailVariableContext.Provider
      value={{ variableValue, currentApplicantId, currentPart, actions }}
    >
      {children}
    </MailVariableContext.Provider>
  );
};

// 2. 메일 내용 Provider
export const MailContentProvider = ({ children }: { children: ReactNode }) => {
  const [mailContent, setMailContent] = useState<MailContentData>({
    subject: '',
    body: {},
    bodyFormat: 'HTML',
    inlineImages: '',
    attachments: '',
  });
  const [reservationTime, setReservationTime] = useState<Date | null>(null);

  const actions = useMemo(
    () => ({
      updateMailContent: (data: Partial<MailContentData>) =>
        setMailContent((prev) => ({ ...prev, ...data })),
      updateBody: (id: string, html: string) =>
        setMailContent((prev) => ({
          ...prev,
          body: {
            ...prev.body,
            [id]: html,
          },
        })),

      setReservationTime,
      sendReservation: async () => {
        // TODO: 메일 발송 로직
      },
    }),
    [],
  );

  return (
    <MailContentContext.Provider value={{ mailContent, reservationTime, actions }}>
      {children}
    </MailContentContext.Provider>
  );
};

// 3. 메일 인포 Provider
export const MailInfoProvider = ({ children }: { children: ReactNode }) => {
  const [mailInfo, setMailInfo] = useState<MailInfoData>({ receiver: [], cc: [], bcc: [] });

  const actions = useMemo(
    () => ({
      updateMailInfo: (data: Partial<MailInfoData>) =>
        setMailInfo((prev) => ({ ...prev, ...data })),
    }),
    [],
  );

  return (
    <MailInfoContext.Provider value={{ mailInfo, actions }}>{children}</MailInfoContext.Provider>
  );
};

// custom hooks
export const useMailVariableContext = () => {
  const context = useContext(MailVariableContext);
  assert(!!context, 'useMailVariableContext는 MailVariableProvider 하위에서 사용해야 합니다.');
  return context;
};

export const useOptionalMailVariables = () => {
  return useContext(MailVariableContext); // context가 없으면 null 반환
};

export const useMailContentContext = () => {
  const context = useContext(MailContentContext);
  assert(!!context, 'useMailContentContext는 MailContentProvider 하위에서 사용해야 합니다.');
  return context;
};

export const useMailInfoContext = () => {
  const context = useContext(MailInfoContext);
  assert(!!context, 'useMailInfoContext는 MailInfoProvider 하위에서 사용해야 합니다.');
  return context;
};
