import {StyledContainer, StyledLogo, StyledLogoText} from "@/components/SideNavigation/SideNavigation.style.ts";
import Logo from "@/assets/logo.svg";

const SideNavigation = () => {
    return <StyledContainer>
        <StyledLogo>
            <img src={Logo} alt="Yourssu Logo"/>
            <StyledLogoText>YOURSSU HR</StyledLogoText>
        </StyledLogo>
    </StyledContainer>
}

export default SideNavigation;