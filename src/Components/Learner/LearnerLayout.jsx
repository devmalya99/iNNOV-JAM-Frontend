
import React, { useState } from 'react';
import { Link, Outlet } from 'react-router'; // Using Link for navigation
import Sidebar from '../Common/Sidebar';
import TopNavigation from '../TopNavigation';
import NoResult from './NoResult';

const LearnerLayout = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Function to open the modal
  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  

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

export default LearnerLayout;
