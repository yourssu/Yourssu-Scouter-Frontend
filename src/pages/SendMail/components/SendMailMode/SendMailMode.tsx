import { assert } from 'es-toolkit';
import { createContext, ReactNode, useContext, useMemo, useState } from 'react';

export type SendMailMode = '기본' | '템플릿선택' | '파트선택';

interface SendMailModeContextProps {
  mode: SendMailMode;
  onChangePartId: (id: null | number) => void;
  onChangeTemplateId: (id: null | number) => void;
  onReset: () => void;
  selectedPartId: null | number;
  selectedTemplateId: null | number;
}

export const SendMailModeContext = createContext<null | SendMailModeContextProps>(null);

export const SendMailModeProvider = ({ children }: { children: ReactNode }) => {
  const [selectedPartId, setSelectedPartId] = useState<null | number>(null);
  const [selectedTemplateId, setSelectedTemplateId] = useState<null | number>(null);

  const mode: SendMailMode = useMemo(() => {
    if (!selectedPartId) {
      return '기본';
    }
    if (!selectedTemplateId) {
      return '파트선택';
    }
    return '템플릿선택';
  }, [selectedPartId, selectedTemplateId]);

  const onChangePartId = (id: null | number) => {
    setSelectedPartId(id);
    setSelectedTemplateId(null);
  };

  const onChangeTemplateId = (id: null | number) => {
    setSelectedTemplateId(id);
  };

  const onReset = () => {
    setSelectedPartId(null);
    setSelectedTemplateId(null);
  };

  return (
    <SendMailModeContext.Provider
      value={{
        mode,
        selectedPartId,
        selectedTemplateId,
        onChangePartId,
        onChangeTemplateId,
        onReset,
      }}
    >
      {children}
    </SendMailModeContext.Provider>
  );
};

export const useSendMailModeContext = () => {
  const context = useContext(SendMailModeContext);
  assert(!!context, 'useSendMailModeContext는 SendMailModeProvider 하위에서 사용해야해요.');
  return context;
};
