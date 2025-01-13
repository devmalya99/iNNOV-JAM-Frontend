import React, { useEffect, useState } from 'react'
import { BsCalendar2Check, BsPersonFillGear, BsQuestion } from 'react-icons/bs';
import { FaAccusoft, FaAssistiveListeningSystems, FaBook, FaChalkboardTeacher, FaCheck, FaFire, FaHome, FaStore, FaUpload, FaUserGraduate } from 'react-icons/fa'
import { FaPlaneUp, FaRegPenToSquare } from "react-icons/fa6";
import { MdOutlineSettingsSuggest } from "react-icons/md";
import Logo from '../assets/FirstComLogo.png';
import { useAuth } from '../../Context/AuthContext';
import { Link } from 'react-router';
import { LucideSheet, PenLineIcon, PowerOffIcon } from 'lucide-react';

const Sidebar = () => {

  const [isAuthorized, setIsAuthorized] = useState(false)
  
  const { user, logout} = useAuth();
  const [loading,setLoading] = useState(true)

  useEffect(()=>{
    if(user) setLoading(false)
  },[user])

  if(loading){
    return <div>Loading....</div>
  }

  console.log(user)
  

  return ( 
    <div className='flex flex-col  top-0 left-0 h-screen w-52 mt-0 dark:bg-gray-800 dark:text-white shadow-lg bg-white '>

      {/* Logo and Title */}
            <div className="flex items-center space-x-4 justify-center p-4">
              <img src={Logo} alt="Logo" className="h-12  object-contain" />
            </div>

      <div className='mx-1 mt-4'>
      <div className='sidebar-style' >
      <SidebarIcon icon={<FaHome className='text-2xl text-green-600'/>} />
      <Link to='/home'>Homepage</Link>
      </div>

      {
        user.role==='admin' && <>  <div className='sidebar-style'>
        <SidebarIcon icon={<FaBook className='text-2xl text-green-600'/>} />
        <Link to='/home/upload-courseware'>Courseware</Link>
        </div>

        
  
  
        <div className='sidebar-style'>
        <SidebarIcon icon={<BsCalendar2Check className='text-2xl text-green-600'/>} />
        <Link to='/home/upload-assesment-plan'>Assesment Plan</Link>
        </div>

        <div className='sidebar-style'>
        <SidebarIcon icon={<FaAccusoft className='text-2xl text-green-600'/>} />
        <Link to='/home/all-assessments'>Assessments </Link>
        </div>

  
        <div className='sidebar-style'>
        <SidebarIcon icon={<FaChalkboardTeacher className='text-2xl text-green-600'/>} />
        <Link to='/home/assign-trainers'>Assign Trainers</Link>
        </div>
  
        <div className='sidebar-style'>
        <SidebarIcon icon={<FaUserGraduate className='text-2xl text-green-600'/>} />
        <Link to='/home/assign-learner'>Assign Learners</Link>
        </div>
  
        <div className='sidebar-style'>
        <SidebarIcon icon={<FaCheck className='text-2xl text-green-600'/>} />
        <Link to='/home/assign-tsc'>Assign TSC</Link>
        </div>

        <div className='sidebar-style'>
      <SidebarIcon icon={<MdOutlineSettingsSuggest className='text-2xl text-green-600'/>} />
      <Link to="/settings">Settings</Link>
      </div>
        </>
      }

      {
        (user.role==='assessor' || user.role==='admin') && <>
      <div className='sidebar-style'>
      <SidebarIcon icon={<FaRegPenToSquare className='text-2xl text-green-600'/>} />
      <Link to='/home/assessment'>Assesment</Link>
      </div>
      </>
      }

    
      {
        user.role==='learner' && <>
        <div className='sidebar-style'>
        <SidebarIcon icon={<PenLineIcon className='text-2xl text-green-600'/>} />
        <Link to='/home/learner/instructions'>Answer Writing</Link>
        </div>
        </>
      }

      <div className='sidebar-style'>
      <SidebarIcon icon={<BsQuestion className='text-2xl text-green-600'/>} />
      <Link to=''>Help</Link>
      </div>



      </div>

      <div className='mt-auto bg-gray-300 dark:bg-gray-700  dark:text-white rounded-xl p-4 m-1'>
        <div className='flex justify-start items-center gap-4 '>

          <div><BsPersonFillGear className='text-4xl bg-gradient-to-r from-green-600 to-green-300 p-1 rounded-full '/> </div>

          <div className='flex flex-col'>

            {loading ? <div>Loading.....</div> : <span className='text-green-500 font-bold'>{user.role.charAt(0).toUpperCase() + user.role.slice(1) }</span>}
            {loading ? <div>Loading.....</div> : <span>{user.name}</span>}

            

          </div>
          <button onClick={logout}>
            <PowerOffIcon className='m-2 cursor-pointer hover:text-red-700'/></button>
        </div>  
      </div>
    </div>
  )
}

const SidebarIcon = ({icon, text})=>{
    return (
        <div className=''>
            {icon}
        <span className=''>
            {text}
        </span>

    </div>
    )
    
}

export default Sidebar