import { BoxButton } from '@yourssu/design-system-react';

import { InputField } from '@/components/InputField/InputField';
import { PageLayout } from '@/components/layouts/PageLayout';
import { PartDropdown, TemplateDropdown } from '@/components/MailDropdown/MailDropdown';
import { VariableGroup } from '@/components/VariableGroup/VariableGroup';

import { MailEditor } from './MailEditor/MailEditor';

export const SendMail = () => {
  return (
    <PageLayout>
      <div className="flex flex-row">
        <div className="h-5xl flex w-7xl flex-col gap-[20px] p-[40px]">
          <div className="flex flex-row justify-between gap-[12px]">
            <PartDropdown />
            <TemplateDropdown />
          </div>
          <div className="flex flex-1 flex-col gap-[20px]">
            <div className="gap-0">
              <InputField textLabel="보내는 사람" />
              <InputField textLabel="받는 사람" />
              <InputField textLabel="숨은 참조" />
              <InputField textLabel="제목" />
            </div>
            <MailEditor type="normal" />
          </div>
        </div>
        <div className="flex w-md flex-col justify-between">
          <div className="typo-t4_sb_18 border-line-basicMedium flex justify-center border-b-1 px-[16px] py-[12px]">
            변수 리스트
          </div>
          <VariableGroup />
          <div className="border-line-basicMedium border-t-1 px-[20px] pt-[16px] pb-[40px]">
            <div className="w-full [&_button]:w-full">
              <BoxButton disabled={false} size="large" variant="filledPrimary">
                메일 예약하기
              </BoxButton>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};
