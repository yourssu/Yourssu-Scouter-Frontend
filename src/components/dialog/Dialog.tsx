import { useEffect, useRef } from "react";
import { DialogContainer, StyledTextButton } from "./Dialog.style";

interface DialogOption {
  label: string;
  icon?: React.ReactNode;
}

interface DialogProps {
  isOpen: boolean;
  onClose: () => void;
  options: DialogOption[];
  onSelect: (value: string) => void;
  position: "top" | "bottom";
  width: number;
}

export const Dialog = ({
  isOpen,
  onClose,
  options,
  onSelect,
  position,
  width,
}: DialogProps) => {
  const dialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (!(e.target instanceof Node)) return;

      if (dialogRef.current && !dialogRef.current.contains(e.target)) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [onClose]);

  const handleOptionClick = (label: string) => {
    onSelect(label);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <DialogContainer
      ref={dialogRef}
      $isOpen={isOpen}
      $position={position}
      $width={width}
    >
      {options.map((option) => (
        <StyledTextButton
          key={option.label}
          size="medium"
          variant="textSecondary"
          leftIcon={option.icon}
          onMouseDown={(e) => e.stopPropagation()}
          onClick={() => handleOptionClick(option.label)}
        >
          {option.label}
        </StyledTextButton>
      ))}
    </DialogContainer>
  );
};
