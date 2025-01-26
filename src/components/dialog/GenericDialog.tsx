import React, { useState } from "react";
import { Dialog } from "./Dialog";

interface GenericDialogProps {
  options: Array<{ label: string; value?: string; icon?: React.ReactNode }>;
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

  const dialogOpener = React.cloneElement(children, {
    onClick: () => setIsOpen((prev) => !prev),
    onMouseDown: (e: React.MouseEvent) => e.stopPropagation(),
  });

  return (
    <div style={{ position: "relative" }}>
      {dialogOpener}
      <Dialog
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        options={options}
        onSelect={(value) => {
          onSelect(value);
          setIsOpen(false);
        }}
        position={position}
        width={width}
      />
    </div>
  );
};
