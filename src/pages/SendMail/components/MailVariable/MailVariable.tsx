import { assert } from 'es-toolkit';
import { createContext, ReactNode, useContext, useMemo, useState } from 'react';

import { RecipientId } from '@/pages/SendMail/mail.type';
import { VariableState } from '@/types/editor';

interface VariableContextProps {
  actions: {
    resetVariables: () => void;
    setActiveApplicantId: (id: RecipientId | undefined) => void;
    updateCommonValue: (key: string, value: string) => void;
    updateIndividualValue: (applicantId: RecipientId, key: string, value: string) => void;
  };
  activeApplicantId: RecipientId | undefined;
  variableValue: VariableState;
}

const VariableContext = createContext<null | VariableContextProps>(null);

export const MailVariableProvider = ({ children }: { children: ReactNode }) => {
  const [variableValue, setVariableValue] = useState<VariableState>({
    common: {},
    perApplicant: {},
  });
  const [activeApplicantId, setActiveApplicantId] = useState<RecipientId | undefined>(undefined);

  const actions = useMemo(
    () => ({
      setActiveApplicantId: (id: RecipientId | undefined) => setActiveApplicantId(id),
      updateCommonValue: (key: string, value: string) => {
        setVariableValue((prev) => ({ ...prev, common: { ...prev.common, [key]: value } }));
      },
      updateIndividualValue: (applicantId: RecipientId, key: string, value: string) => {
        setVariableValue((prev) => ({
          ...prev,
          perApplicant: {
            ...prev.perApplicant,
            [applicantId]: {
              ...prev.perApplicant[applicantId],
              [key]: value,
            },
          },
        }));
      },
      resetVariables: () => setVariableValue({ common: {}, perApplicant: {} }),
    }),
    [],
  );

  return (
    <VariableContext.Provider value={{ variableValue, activeApplicantId, actions }}>
      {children}
    </VariableContext.Provider>
  );
};

export const useOptionalMailVariables = () => {
  return useContext(VariableContext); // context가 없으면 null 반환
};

export const useMailVariables = () => {
  const context = useContext(VariableContext);
  assert(!!context, 'useMailVariables는 MailVariableProvider 하위에서 사용해야 합니다.');
  return context;
};
