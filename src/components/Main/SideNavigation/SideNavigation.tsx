import {
    StyledContainer,
    StyledLinks,
    StyledLogo,
    StyledLogoText, StyledNavigationLink, StyledSection, StyledSectionTitle
} from "@/components/Main/SideNavigation/SideNavigation.style.ts";
import Logo from "@/assets/logo.svg";
import {Divider, IcCalenderLine, IcMailLine, IcPinLine, IcStarLine, IcUserLine} from "@yourssu/design-system-react";

const SideNavigation = () => {
    const navItems = [
        {
            title: "Yourssu",
            links: [
                {
                    icon: <IcUserLine />,
                    text: "유어슈 멤버",
                    pathname: '/members'
                }
            ]
        },
        {
            title: "ATS",
            links: [
                {
                    icon: <IcStarLine />,
                    text: "리크루팅 지원자",
                    pathname: '/recruiting'
                },
                {
                    icon: <IcCalenderLine />,
                    text: "면접 일정 관리",
                    pathname: '/schedules'
                },
                {
                    icon: <IcPinLine />,
                    text: "템플릿",
                    pathname: '/templates'
                },
                {
                    icon: <IcMailLine />,
                    text: "메일 전송",
                    pathname: '/send-mail'
                }
            ]
        }
    ];

    return <StyledContainer>
        <StyledLogo>
            <img src={Logo} alt="Yourssu Logo"/>
            <StyledLogoText>YOURSSU HR</StyledLogoText>
        </StyledLogo>
        <StyledLinks>
            {navItems.flatMap(({title, links}, index) => [
                <StyledSection key={title}>
                    <StyledSectionTitle>
                        {title}
                    </StyledSectionTitle>
                    {links.map(({icon, text, pathname}) =>
                        <StyledNavigationLink
                            to={pathname}
                            key={text}
                        >
                            {icon} {text}
                        </StyledNavigationLink>
                    )}
                </StyledSection>,
                index < navItems.length - 1 && <Divider key={`divider-${index}`} thickness={1} />
            ].filter(Boolean))}
        </StyledLinks>
    </StyledContainer>
}

export default SideNavigation;