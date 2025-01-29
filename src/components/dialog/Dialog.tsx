import { useEffect, useRef, useState } from "react";
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
  position: initialPosition,
  width,
}: DialogProps) => {
  const dialogRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState(initialPosition);

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

  useEffect(() => {
    if (isOpen && dialogRef.current) {
      const updatePosition = () => {
        const buttonRect =
          dialogRef.current?.parentElement?.getBoundingClientRect();
        const dialogHeight = dialogRef.current?.offsetHeight ?? 0;

        if (!buttonRect) return;

        const bottomSpace = window.innerHeight - buttonRect.bottom;
        const shouldShowOnTop = bottomSpace < dialogHeight + 10;

        setPosition(shouldShowOnTop ? "top" : "bottom");
      };

      const timer = setTimeout(updatePosition, 0);

      window.addEventListener("scroll", updatePosition);
      window.addEventListener("resize", updatePosition);

      return () => {
        clearTimeout(timer);
        window.removeEventListener("scroll", updatePosition);
        window.removeEventListener("resize", updatePosition);
      };
    }
  }, [isOpen]);

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
          onClick={() => {
            onSelect(option.label);
            onClose();
          }}
        >
          {option.label}
        </StyledTextButton>
      ))}
    </DialogContainer>
  );
};
