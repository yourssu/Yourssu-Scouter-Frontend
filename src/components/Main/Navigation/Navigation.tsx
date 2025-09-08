import { authService } from '@/apis/auth.service';
import { tokenService } from '@/apis/token.service';

import { StyledContainer, StyledProfileImage } from './Navigation.style';

const Navigation = () => {
  const handleClick = () => {
    if (tokenService.hasTokens()) {
      authService.logout();
    } else {
      authService.initiateGoogleLogin();
    }
  };

  return (
    <StyledContainer>
      <StyledProfileImage onClick={handleClick}>
        <p>{tokenService.hasTokens() ? '로그인됨' : '로그인필요'}</p>
      </StyledProfileImage>
    </StyledContainer>
  );
};

export default Navigation;
