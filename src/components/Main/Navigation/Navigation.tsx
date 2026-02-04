import { BoxButton } from '@yourssu/design-system-react';

import { authService } from '@/apis/auth.service';
import { tokenService } from '@/apis/token.service';

const Navigation = () => {
  const handleClick = () => {
    if (tokenService.hasTokens()) {
      authService.logout();
    } else {
      authService.initiateGoogleLogin();
    }
  };

  return (
    <div className="flex w-full items-center justify-end p-2">
      {tokenService.hasTokens() && (
        <BoxButton onClick={handleClick} size="small" variant="filledPrimary">
          로그아웃
        </BoxButton>
      )}
    </div>
  );
};

export default Navigation;
