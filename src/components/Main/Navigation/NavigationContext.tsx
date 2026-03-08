import { assert } from 'es-toolkit';
import { createContext, ReactNode, useCallback, useContext, useMemo, useState } from 'react';

interface NavigationContextProps {
  backAction: (() => void) | null;
  clearBackAction: () => void;
  setBackAction: (fn: () => void) => void;
}

const NavigationContext = createContext<NavigationContextProps | null>(null);

export const NavigationProvider = ({ children }: { children: ReactNode }) => {
  const [backAction, setBackActionState] = useState<(() => void) | null>(null);

  const setBackAction = useCallback((fn: () => void) => {
    setBackActionState(() => fn);
  }, []);

  const clearBackAction = useCallback(() => {
    setBackActionState(null);
  }, []);

  const value = useMemo(
    () => ({ backAction, setBackAction, clearBackAction }),
    [backAction, setBackAction, clearBackAction],
  );

  return <NavigationContext.Provider value={value}>{children}</NavigationContext.Provider>;
};

export const useNavigationContext = () => {
  const context = useContext(NavigationContext);
  assert(!!context, 'useNavigationContext는 NavigationProvider 하위에서 사용해야 합니다.');
  return context;
};
