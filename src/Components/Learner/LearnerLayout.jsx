
import React, { useState } from 'react';
import { Link, Outlet } from 'react-router'; // Using Link for navigation
import Sidebar from '../Common/Sidebar';
import TopNavigation from '../TopNavigation';
import NoResult from './NoResult';
import MainHeadbar from '../Common/MainHeadbar';

const LearnerLayout = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Function to open the modal
  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  

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

export default LearnerLayout;
