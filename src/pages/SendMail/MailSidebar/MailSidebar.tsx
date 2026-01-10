import { BoxButton } from '@yourssu/design-system-react';

import { VariableGroup } from '@/pages/SendMail/MailSidebar/VariableGroup';
import { Variable, VariableKeyType } from '@/types/editor';

export interface MailSidebarProps {
  setVariables: (variables: Variable[]) => void;
  variables: Variable[];
}

export const MailSidebar = ({ variables, setVariables }: MailSidebarProps) => {
  // variable의 실제 값 업데이트 관리
  const handleVariableUpdate = (key: VariableKeyType, updatedItems: Variable['items']) => {
    const updatedVariables = variables.map((variable) =>
      variable.key === key ? { ...variable, items: updatedItems } : variable,
    );
    setVariables(updatedVariables);
    // 변수 업데이트 로직 구현
  };

  return (
    <div className="flex h-full w-md flex-col justify-between">
      <div className="typo-t4_sb_18 border-line-basicMedium flex justify-center border-b-1 px-[16px] py-[12px]">
        변수 리스트
      </div>
      <VariableGroup onUpdateVariable={handleVariableUpdate} variables={variables} />
      <div className="border-line-basicMedium border-t-1 px-[20px] pt-[16px] pb-[40px]">
        <div className="w-full [&_button]:w-full">
          <BoxButton disabled={false} size="large" variant="filledPrimary">
            메일 예약하기
          </BoxButton>
        </div>
      </div>
    </div>
  );
};
