import { usePrefetchQuery } from '@tanstack/react-query';
import { Outlet } from 'react-router';

import { StyledContainer, StyledRightContainer } from '@/components/Main/Main.style.ts';
import Navigation from '@/components/Main/Navigation/Navigation.tsx';
import SideNavigation from '@/components/Main/SideNavigation/SideNavigation.tsx';
import { departmentOptions } from '@/query/department/options.ts';
import { partOptions } from '@/query/part/options.ts';
import { semesterNowOptions } from '@/query/semester/now/options.ts';
import { semesterOptions } from '@/query/semester/options.ts';

const Main = () => {
  usePrefetchQuery(semesterOptions());
  usePrefetchQuery(partOptions());
  usePrefetchQuery(departmentOptions());
  usePrefetchQuery(semesterNowOptions());

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
