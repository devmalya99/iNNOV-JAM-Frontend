
import React from 'react';
import { Link, Outlet } from 'react-router'; // Using Link for navigation
import Sidebar from '../Common/Sidebar';
import TopNavigation from '../TopNavigation';
import MainHeadbar from '../Common/MainHeadbar';

const AssessorLayout = () => {
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

export default AssessorLayout;
