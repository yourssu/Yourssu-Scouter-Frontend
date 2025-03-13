import SideNavigation from '@/components/Main/SideNavigation/SideNavigation.tsx';
import { Outlet } from 'react-router';
import {
  StyledContainer,
  StyledRightContainer,
} from '@/components/Main/Main.style.ts';
import Navigation from '@/components/Main/Navigation/Navigation.tsx';

const Main = () => {
  return (
    <StyledContainer>
      <SideNavigation />
      <StyledRightContainer>
        <Navigation />
        <Outlet />
      </StyledRightContainer>
    </StyledContainer>
  );
};

export default Main;
