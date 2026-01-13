import { IcArrowRightLine, IcMailFilled } from '@yourssu/design-system-react';

import { InputChipGroup } from '@/pages/SendMail/components/MailInfoSection/InputChipGroup';

interface SendToFieldProps {
  receivers: string[];
  sender: string[];
}

export const SendToField = ({ receivers, sender }: SendToFieldProps) => {
  return (
    <div className="border-line-basicMedium flex min-h-[56px] w-full flex-row flex-wrap items-center gap-[8px] border-b-1 px-[20px] py-[10px]">
      <IcMailFilled height={17} width={20} />
      <InputChipGroup deletable={false} items={sender} onDelete={() => {}} />
      <IcArrowRightLine height={20} width={20} />
      <InputChipGroup deletable={false} items={receivers} onDelete={() => {}} />
    </div>
  );
};
