import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
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
  anchorEl: HTMLElement | null;
}

export const Dialog = ({
  isOpen,
  onClose,
  options,
  onSelect,
  position: initialPosition,
  width,
  anchorEl,
}: DialogProps) => {
  const dialogRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState(initialPosition);
  const [coordinates, setCoordinates] = useState({ top: 0, left: 0 });

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (!(e.target instanceof Node)) return;
      if (
        dialogRef.current &&
        !dialogRef.current.contains(e.target) &&
        !anchorEl?.contains(e.target)
      ) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [onClose, anchorEl]);

  useEffect(() => {
    if (isOpen && anchorEl && dialogRef.current) {
      const updatePosition = () => {
        const buttonRect = anchorEl.getBoundingClientRect();
        const dialogHeight = dialogRef.current?.offsetHeight ?? 0;

        const bottomSpace = window.innerHeight - buttonRect.bottom;
        const shouldShowOnTop = bottomSpace < dialogHeight + 10;

        setPosition(shouldShowOnTop ? "top" : "bottom");

        const top = shouldShowOnTop
          ? buttonRect.top - dialogHeight - 10
          : buttonRect.bottom + 10;

        setCoordinates({
          top,
          left: buttonRect.left,
        });
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
  }, [isOpen, anchorEl]);

  if (!isOpen) return null;

  return createPortal(
    <DialogContainer
      ref={dialogRef}
      $isOpen={isOpen}
      $position={position}
      $width={width}
      $top={coordinates.top}
      $left={coordinates.left}
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
    </DialogContainer>,
    document.body
  );
};
