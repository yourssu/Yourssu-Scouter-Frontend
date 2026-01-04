import { BoxButton, primitiveColorPalette } from '@yourssu/design-system-react';
import { MdRefresh } from 'react-icons/md';

export const AutoScheduleRefetchButton = () => {
  return (
    <BoxButton
      leftIcon={<MdRefresh />}
      size="small"
      style={{
        // BoxButton을 className으로 덮어쓸 수 없어서 inline style로 작성했어요.
        background: primitiveColorPalette.gray900,
      }}
      variant="filledPrimary"
    >
      시간표 다시 만들기
    </BoxButton>
  );
};
