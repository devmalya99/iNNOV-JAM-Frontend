
import React from 'react';
import { Link, Outlet } from 'react-router'; // Using Link for navigation
import Sidebar from '../Common/Sidebar';
import TopNavigation from '../TopNavigation';

const AssessorLayout = () => {
  return (

    <div className='flex'>
        <Sidebar />
      <div className='right-container flex-grow'>
       <TopNavigation/>
       <div>
       
        <Outlet/>
       </div>
    </div>
    </div>



    
  );
};

export default AssessorLayout;
