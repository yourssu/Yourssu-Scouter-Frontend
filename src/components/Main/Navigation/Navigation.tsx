import { BoxButton, IcArrowLeftLine } from '@yourssu/design-system-react';

import { authService } from '@/apis/auth.service';
import { tokenService } from '@/apis/token.service';

import { useNavigationContext } from './NavigationContext';

const Navigation = () => {
  const { backAction } = useNavigationContext();

  const handleClick = () => {
    if (tokenService.hasTokens()) {
      authService.logout();
    } else {
      authService.initiateGoogleLogin();
    }
  };

  return (
    <div className="flex w-full items-center justify-between px-6 py-4">
      {backAction ? (
        <button className="flex cursor-pointer items-center" onClick={backAction}>
          <IcArrowLeftLine />
        </button>
      ) : (
        <div />
      )}
      {tokenService.hasTokens() && (
        <BoxButton onClick={handleClick} size="small" variant="filledPrimary">
          로그아웃
        </BoxButton>
      )}
    </div>
  );
};

export default Navigation;
