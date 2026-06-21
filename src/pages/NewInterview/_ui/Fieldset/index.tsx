import { cn } from '@/utils/dom';

interface FieldsetProps {
  className?: string;
  help?: React.ReactNode;
  label?: React.ReactNode;
}

export const Fieldset = ({
  className,
  label,
  help,
  children,
}: React.PropsWithChildren<FieldsetProps>) => {
  if (!label && !help) {
    return children;
  }

  return (
    <fieldset className={cn('w-full', className)}>
      {label && <div className="py-1.5 text-[15px] font-normal text-[#4e5968]">{label}</div>}
      {children}
      {help && <div className="mt-1.5 text-[13px] font-normal text-[#6b7684]">{help}</div>}
    </fieldset>
  );
};
