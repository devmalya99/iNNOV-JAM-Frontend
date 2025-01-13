
import React from 'react';
import { Link, Outlet } from 'react-router'; // Using Link for navigation

import TopNavigation from '../../TopNavigation/index';
import SettingsSidebar from './SettingsSidebar';
import Sidebar from '../../Sidebar';

const SettingsLayout = () => {
  return (

    <div className='flex'>
        <Sidebar/>
      <div className='flex right-container flex-grow'>
      <SettingsSidebar />
       <div className='w-full h-full'>
        <TopNavigation/>
        <Outlet/>
       </div>
    </div>
    </div>



    
  );
};



export default SettingsLayout