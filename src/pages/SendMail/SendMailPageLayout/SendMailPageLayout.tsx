import { PageLayout } from '@/components/layouts/PageLayout';

interface SendMailPageLayoutProps {
  slots: {
    dropdown: React.ReactNode;
    editor: React.ReactNode;
    info: React.ReactNode;
    sidebar: React.ReactNode;
  };
}

export const SendMailPageLayout = ({ slots }: SendMailPageLayoutProps) => {
  return (
    <PageLayout>
      <div className="flex w-full flex-[1_1_0] flex-row">
        <div className="flex w-full flex-col gap-[20px] p-[40px]">
          {slots.dropdown}
          {slots.info}
          <div className="flex h-full">{slots.editor}</div>
        </div>
        <div className="border-line-basicMedium min-w-[438px] border-t border-l">
          {slots.sidebar}
        </div>
      </div>
    </PageLayout>
  );
};
