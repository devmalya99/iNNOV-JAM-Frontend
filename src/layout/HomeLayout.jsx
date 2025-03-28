import React from 'react';
import Sidebar from '../Components/Common/Sidebar';
import TopNavigation from '../Components/TopNavigation';
import { Outlet } from 'react-router';
import MainHeadbar from '../Components/Common/MainHeadbar';
import UseSidebarStore from '../Zustand/SidebarStore';

const HomeLayout = () => {
  const { viewSidebar, setViewSidebar } = UseSidebarStore();

  return (
    

    <div className='flex w-full h-full bg-white dark:bg-[#1d1d1d]'>
      <div className=''>
      <Sidebar/> </div>

      <div className=' flex flex-col w-full'>

        <div><MainHeadbar/></div>
        <div><Outlet/></div>

      </div>
    </div>
  );
};

export default HomeLayout;
