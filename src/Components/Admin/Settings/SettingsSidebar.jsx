import React, { useEffect, useState } from 'react'

import { FaHome } from 'react-icons/fa'

import Logo from '../../../assets/Logo.png';

import { Link, useLocation, useParams } from 'react-router';
import { Cog, LucideSheet, PenBox, PenLineIcon, PowerOffIcon } from 'lucide-react';
import { MdSystemUpdate } from 'react-icons/md';


const SettingsSidebar = () => {

  
 

    const [activeItem,setActiveItem] = useState(null)

    const location = useLocation(); // Get the latest URL

    const [param, setParam] = useState('');

    
      // Get the last part of the URL (assuming "/settings/something")
      const pathParts = location.pathname.split('/');
      const lastParam = pathParts[pathParts.length - 1]; // Get last segment
      
    

    console.log("location",lastParam)
  


  return ( 
    <div className="flex flex-col w-64 h-[calc(100vh-80px)] ml-1 
    bg-gray-100 border-r border-gray-200 dark:bg-gray-800 dark:border-gray-700">
    {/* Sidebar Items Container */}
    <div className="flex flex-col space-y-1 p-4">
    <SidebarItem
        to="./grade-creation"
        
        icon={<PenBox className="w-5 h-5" />}
        text="Create Grade"
        onClick={()=>setActiveItem('grading')}
        active={lastParam==='grade-creation'}
      />


      <SidebarItem
        to="./models-selector"
        text="Model Selector"
        icon={<Cog className="w-5 h-5" />}
        
        onClick={()=>setActiveItem('models')}
        active={lastParam==='models-selector'}
      />

     <SidebarItem
        to="./models-management"
        text="Models Management"
        icon={<Cog className="w-5 h-5" />}
        
        onClick={()=>setActiveItem('models-management')}
        active={lastParam==='models-management'}
      />

      

    </div>
  </div>
    
  )
}

const SidebarItem = ({ icon, text, to, active ,onClick}) => {
    return (
      <Link
        to={to}
        onClick={onClick}
        className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors duration-150 
          ${
            active
              ? 'bg-green-50 text-green-600 dark:bg-blue-gray-100'
              : 'text-gray-700 hover:bg-gray-50 hover:text-green-600'
          }
        `}
      >
        <span className={`${active ? 'text-green-600' : 'text-gray-500'}`}>
          {icon}
        </span>
        <span className="font-medium text-gray-800 dark:text-gray-100 ">{text}</span>
      </Link>
    );
  };

export default SettingsSidebar