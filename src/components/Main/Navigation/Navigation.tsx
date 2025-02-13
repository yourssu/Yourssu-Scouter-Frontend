import { authService } from "@/apis/auth.service.api";
import { StyledContainer, StyledProfileImage } from "./Navigation.style";

const Navigation = () => {
  const handleGoogleLogin = () => {
    authService.initiateGoogleLogin();
  };

  return (
    <StyledContainer>
      <StyledProfileImage onClick={handleGoogleLogin} />
    </StyledContainer>
  );
};

export default Navigation;
