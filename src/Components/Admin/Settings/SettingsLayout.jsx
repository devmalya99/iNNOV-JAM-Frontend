
import React from 'react';
import { Link, Outlet } from 'react-router'; // Using Link for navigation

import TopNavigation from '../../TopNavigation/index';
import SettingsSidebar from './SettingsSidebar';
import Sidebar from '../../Common/Sidebar';
import MainHeadbar from '../../Common/MainHeadbar';

const SettingsLayout = () => {
  return (

    // <div>

    //   <div className='first-hoome-row flex-flex-col'>
    //     <MainHeadbar/>
    //   </div>

    //   <div className='second-home-row flex w-full h-full '>
    //     <Sidebar/>
    //     <SettingsSidebar/>

    //     <div className='w-full'>
    //       <Outlet/>
    //     </div>

    //   </div>
    // </div>

    <div className='flex w-full h-full bg-white dark:bg-[#1d1d1d]'>
      <div className=''>
      <Sidebar/> </div>

      <div className=' flex flex-col w-full'>

        <div><MainHeadbar/></div>
        <div className='flex'>
          <SettingsSidebar/>
        <Outlet/>
        </div>
        

      </div>
    </div>
  );
};



export default SettingsLayout