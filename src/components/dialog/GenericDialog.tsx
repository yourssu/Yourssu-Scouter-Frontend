import React, { useRef, useState } from "react";
import { DialogOption } from "../StateButton/StateButton";
import { Dialog } from "./Dialog";

interface GenericDialogProps {
  options: DialogOption[];
  onSelect: (value: string) => void;
  children: React.ReactElement;
  width?: number;
  position?: "top" | "bottom";
}

export const GenericDialog = ({
  options,
  onSelect,
  children,
  width = 128,
  position = "bottom",
}: GenericDialogProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const anchorRef = useRef<HTMLDivElement>(null);

  const dialogOpener = React.cloneElement(children, {
    onClick: () => setIsOpen((prev) => !prev),
    onMouseDown: (e: React.MouseEvent) => e.stopPropagation(),
  });

  return (
    <div ref={anchorRef}>
      {dialogOpener}
      <Dialog
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        options={options}
        onSelect={onSelect}
        position={position}
        width={width}
        anchorEl={anchorRef.current}
      />
    </div>
  );
};
