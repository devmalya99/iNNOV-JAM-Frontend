import React, { useEffect, useState } from 'react'

import { FaHome } from 'react-icons/fa'

import Logo from '../../../assets/Logo.png';

import { Link } from 'react-router';
import { Cog, LucideSheet, PenBox, PenLineIcon, PowerOffIcon } from 'lucide-react';
import { MdSystemUpdate } from 'react-icons/md';


const SettingsSidebar = () => {

    const [activeItem,setActiveItem] = useState(null)
  


  return ( 
    <div className="flex flex-col w-64 h-[calc(100vh-80px)] ml-1 bg-white border-r border-gray-200 dark:bg-gray-800 dark:border-gray-700">
    {/* Sidebar Items Container */}
    <div className="flex flex-col space-y-1 p-4">
      <SidebarItem
        to="./models"
        text="Model Creation"
        icon={<Cog className="w-5 h-5" />}
        
        onClick={()=>setActiveItem('models')}
        active={activeItem==='models'}
      />

     <SidebarItem
        to="./models-management"
        text="Models Management"
        icon={<Cog className="w-5 h-5" />}
        
        onClick={()=>setActiveItem('models-management')}
        active={activeItem==='models-management'}
      />

      <SidebarItem
        to="./"
        
        icon={<PenBox className="w-5 h-5" />}
        text="Grading"
        onClick={()=>setActiveItem('grading')}
        active={activeItem==='grading'}
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
              : 'text-gray-600 hover:bg-gray-50 hover:text-green-600'
          }
        `}
      >
        <span className={`${active ? 'text-green-600' : 'text-gray-400'}`}>
          {icon}
        </span>
        <span className="font-medium">{text}</span>
      </Link>
    );
  };

export default SettingsSidebar