
import React from 'react';
import { Link, Outlet } from 'react-router'; // Using Link for navigation
import Sidebar from '../Common/Sidebar';
import TopNavigation from '../TopNavigation';
import MainHeadbar from '../Common/MainHeadbar';

const AssessorLayout = () => {
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

export default AssessorLayout;
