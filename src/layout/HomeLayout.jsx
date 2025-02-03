import React from 'react';
import Sidebar from '../Components/Common/Sidebar';
import TopNavigation from '../Components/TopNavigation';
import { Outlet } from 'react-router';
import MainHeadbar from '../Components/Common/MainHeadbar';
import UseSidebarStore from '../Zustand/SidebarStore';

const HomeLayout = () => {
  const { viewSidebar, setViewSidebar } = UseSidebarStore();

  return (
    <div>
      <div className='first-hoome-row flex-flex-col'>
        <MainHeadbar/>
      </div>

      <div className='second-home-row flex w-full h-full'>
        <Sidebar/>

        <div className='w-full'>
          <Outlet/>
        </div>

      </div>
    </div>
  );
};

export default HomeLayout;
