import { InputField } from '@/components/InputField/InputField';
import { PageLayout } from '@/components/layouts/PageLayout';
import { PartDropdown, TemplateDropdown } from '@/components/MailDropdown/MailDropdown';
import { MailEditor } from '@/pages/SendMail/MailEditor/MailEditor';

export const SendMail = () => {
  return (
    <PageLayout>
      <div className="flex h-full flex-row">
        <div className="flex w-full flex-col gap-[20px] p-[40px]">
          <div className="flex w-full flex-row gap-[12px]">
            <PartDropdown />
            <TemplateDropdown />
          </div>
          <div className="flex h-full w-full flex-col gap-[20px]">
            <div className="gap-0">
              <InputField textLabel="보내는 사람" />
              <InputField textLabel="받는 사람" />
              <InputField textLabel="숨은 참조" />
              <InputField textLabel="제목" />
            </div>
            <div className="flex h-full w-full">
              <MailEditor type="normal" />
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};
