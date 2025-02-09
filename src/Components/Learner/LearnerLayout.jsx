
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

export default LearnerLayout;
