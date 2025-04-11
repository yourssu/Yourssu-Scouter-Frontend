import SideNavigation from '@/components/Main/SideNavigation/SideNavigation.tsx';
import { Outlet } from 'react-router';
import {
  StyledContainer,
  StyledRightContainer,
} from '@/components/Main/Main.style.ts';
import Navigation from '@/components/Main/Navigation/Navigation.tsx';
import { usePrefetchQuery } from '@tanstack/react-query';
import { semesterOptions } from '@/query/semester/options.ts';
import { partOptions } from '@/query/part/options.ts';
import { departmentOptions } from '@/query/department/options.ts';

const Main = () => {
  usePrefetchQuery(semesterOptions());
  usePrefetchQuery(partOptions());
  usePrefetchQuery(departmentOptions());

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
