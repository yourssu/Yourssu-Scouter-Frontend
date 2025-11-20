import { assert } from 'es-toolkit';
import { createContext, Dispatch, SetStateAction, useContext } from 'react';

interface AvailableTimesModeHoverContextProps {
  hoveredBlockApplicantIds: number[];
  hoveredChipApplicantId: null | number;
  setHoveredBlockApplicantIds: Dispatch<SetStateAction<number[]>>;
  setHoveredChipApplicantId: Dispatch<SetStateAction<null | number>>;
}

export const AvailableTimesModeHoverContext =
  createContext<AvailableTimesModeHoverContextProps | null>(null);

export const useAvailableTimesModeHoverContext = () => {
  const context = useContext(AvailableTimesModeHoverContext);
  assert(
    !!context,
    'useAvailableTimesModeHoverContext는 AvailableTimesModeHoverContext.Provider 하위에서 사용해야해요.',
  );
  return context;
};
