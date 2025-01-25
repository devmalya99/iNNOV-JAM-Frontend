import React from 'react'
import Sidebar from '../Components/Common/Sidebar'
import TopNavigation from '../Components/TopNavigation'
import { Outlet } from 'react-router'

const HomeLayout = () => {
  return (
    <div className='flex bg-white dark:bg-gray-900 transition-all duration-3500 ease-in-out'>
        <Sidebar />
      <div className='right-container flex-grow bg-white dark:bg-gray-900'>
       
       <div>
        <Outlet/>
       </div>
    </div>
    </div>
  )
}

export default HomeLayout