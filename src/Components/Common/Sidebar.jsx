import React, { useEffect, useState } from "react";
import {
  BsCalendar2Check,
  BsCalendar2CheckFill,
  BsPersonFillGear,
  BsQuestion,
} from "react-icons/bs";
import {
  FaAccusoft,
  FaBook,
  FaChalkboardTeacher,
  FaCheck,
  FaGraduationCap,
  FaHome,
  FaThemeco,
  FaThemeisle,
  FaUserGraduate,
} from "react-icons/fa";
import { FaRegPenToSquare } from "react-icons/fa6";
import { MdOutlineSettingsSuggest } from "react-icons/md";
import { Link, useLocation } from "react-router"; // Ensure correct version of react-router
import { BlocksIcon, BookAIcon, LucideGraduationCap, PowerOffIcon, StarsIcon, Users2Icon } from "lucide-react";
import Logo from "/FirstComLogo.png";
import { useAuth } from "../../../Context/AuthContext";
import SkeletonPage from "../SkeletonPage";
import MainHeadbar from "./MainHeadbar";
import ThemeSlider from "./ThemeSlider";
import UseSidebarStore from "../../Zustand/SidebarStore";
import { CgOrganisation } from "react-icons/cg";
import UseScreensizeStore from "../../Zustand/ScreensizeStore";
import { IoStarSharp } from "react-icons/io5";
import { RiStarSFill } from "react-icons/ri";
import CompanyName from "./CompanyName";
// Sidebar component
const Sidebar = () => {
  const [loading, setLoading] = useState(true);
  //State to manage sidebar visibility
  
  const { user, logout } = useAuth();

  // Access Zustand store
  const { viewSidebar, setViewSidebar } = UseSidebarStore();

   // Location to detect active route
   const location = useLocation();

   const {isSmallScreen} = UseScreensizeStore();
   
  //  console.log("isSmallScreen",isSmallScreen)


  // Wait for user object to be available
  useEffect(() => {
    if (user) setLoading(false);
  }, [user]);

    // Toggle sidebar visibility for small screens
    const handleItemClick = () => {
      if (isSmallScreen) setViewSidebar(false);
    };

  if (loading) {
    return (
      <div>
        <SkeletonPage />
      </div>
    );
  }

  // Define sidebar items
  const sidebarItems = [
    {
      name: "Homepage",
      icon: <FaHome className="text-2xl text-green-900" />,
      link: "/home",
      roles: ["admin", "super_admin", "assessor", "trainer", "learner"],
    },
    {
      name: "Create Users",
      icon: <FaChalkboardTeacher className="text-2xl text-green-900" />,
      link: "/home/create-users",
      roles: ["admin", "super_admin"],
    },
    
    {
      name: "User Management",
      icon: <Users2Icon className="text-md text-green-900" />,
      link: "/home/user-management",
      roles: ["admin", "super_admin"],
    },
    {
      name: "Create course",
      icon: <CgOrganisation className="text-2xl text-green-900" />,
      link: "/home/create-course",
      roles: ["admin", "super_admin"],
    },
    // {
    //   name: "Upload Courseware",
    //   icon: <FaBook className="text-2xl text-gray-800" />,
    //   link: "/home/upload-courseware",
    //   roles: ["admin", "super_admin"],
    // },
    
    {
      name: "All Courses",
      icon: <BlocksIcon className="text-2xl text-green-900" />,
      link: "/home/all-assessments",
      roles: ["admin", "super_admin"],
    },

    // View All the courses for learner
    {
      name: "Enrolled Courses",
      icon: <BookAIcon className="text-2xl text-green-900" />,
      link: "/home/learner/view-all-courses",
      roles: ["learner"],
    },

    // View all assigned course for assessor
    {
      name: "Assigned Courses",
      icon: <BookAIcon className="text-2xl text-green-900" />,
      link: "/home/assessment/view-all-assigned-courses",
      roles: ["assessor","admin"],
    },
    {
      name: "Settings",
      icon: <MdOutlineSettingsSuggest className="text-2xl text-green-900" />,
      link: "/settings/grade-creation",
      roles: ["super_admin"],
    },


    // {
    //   name: "Evaluation Result",
    //   icon: <FaRegPenToSquare className="text-2xl text-gray-800" />,
    //   link: "/home/assessment",
    //   roles: [ "assessor"],
    // },
    

  ];

  if (loading) {
    return <SkeletonPage/>;
  }

  // Filter sidebar items based on the user's role
  const filteredItems = sidebarItems.filter((item) =>
    item.roles.includes(user.role)
  );

  return (
    <>
    {/* Overlay for small screens */}
    {isSmallScreen && viewSidebar && (
      <div
        className="fixed inset-0 bg-black bg-opacity-50 z-50"
        onClick={() => setViewSidebar(false)}
      ></div>
    )}

    {/* Sidebar */}
    <aside
      className={`fixed md:static top-0 left-0 h-full 
         z-50
      transition-transform transform bg-white dark:bg-[#1d1f24] 
      ${isSmallScreen ? "w-64" : "w-72"} 
      ${viewSidebar ? "translate-x-0" : "-translate-x-full"} 
      md:translate-x-0`}
    >
      {/* Logo Section */}
      {/* only visible if isSmallScreen */}
      {
        isSmallScreen && (
          <div className="p-4 flex items-center justify-between border-b  text-white">
            {/* <img src={Logo} alt="FirstCom Logo" className="h-12 w-auto" /> */}
        <div className="flex font-serif px-4">
        <p className="title-text text-xl md:text-3xl lg:text-4xl 
        text-gray-800 dark:text-gray-200 ">
          COL
        </p>
        <p className=" title-text text-xl md:text-xl lg:text-xl text-green-800">
        Innov jam
        </p>
        </div>
            <button
              className="text-2xl"
              onClick={() => setViewSidebar(false)}
            >
              ✕
            </button>
          </div>
        )
      }

      {/* Dark mode toggle button */}
      {
        isSmallScreen && (
          <div className="px-2 py-1 ml-3 my-2 bg-[#1f273b] flex items-center justify-between 
          hover:bg-gray-200 dark:hover:bg-gray-700  dark:text-gray-100  ">
            
            <div className="flex gap-2 m-1 ">
           
              <RiStarSFill className="text-xl text-gray-50 my-1 "/>
              <p className="text-lg text-gray-50">Mode</p>
            </div>
           
            <button
              className="text-2xl"
              onClick={() => setViewSidebar(false)}
            >
            <ThemeSlider/>
            </button>
          </div>
        )
      }


      

      {/* Sidebar Content */}
      <div className={`flex flex-col ${isSmallScreen ? "h-[calc(100vh-120px)]" : "h-screen"}  `}>
        {/* Sidebar Items */}
        {
          !isSmallScreen && ( <CompanyName/>)
        }
         
        <div>
       
        </div>
        <div className="flex flex-col overflow-y-auto">
          {filteredItems.map((item, index) => (
            <Link
              to={item.link}
              key={index}
              className={`flex items-center gap-4 px-4 py-3 hover:bg-gray-200 dark:hover:bg-gray-700 ${
                location.pathname === item.link ? "bg-green-300 border-gray-600 rounded-3xl m-1 " : ""
              }`}
              onClick={handleItemClick}
            >
              <div>{item.icon}</div>
              <span className="text-gray-900 dark:text-gray-100 text-md">{item.name}</span>
            </Link>
          ))}
        </div>

        {/* Footer Section */}
        <div className="px-4 py-3 mt-auto bg-gray-100
         dark:bg-gray-800  rounded-lg shadow-lg">
  <div className="flex items-center gap-4 ">
    <div className="p-2 bg-gradient-to-r from-green-600 to-green-300 rounded-full shadow-md">
      <BsPersonFillGear className="text-4xl text-white" />
    </div>
    <div>
      <p className="font-bold text-gray-800 dark:text-green-400 text-lg">
        {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
      </p>
      <p className="text-gray-800 dark:text-gray-200 text-sm">{user.name}</p>
    </div>
  </div>
  <div
    className="flex items-center justify-center gap-2 mt-6 px-4 py-2 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-lg shadow-md hover:from-red-600 hover:to-red-700 transition-all duration-300"
    onClick={logout}
  >
    <span className="font-semibold">Logout</span>
    <PowerOffIcon className="w-5 h-5" />
  </div>
</div>
      </div>

      
    </aside>
  </>
  );
  
  
};

// SidebarIcon Component
const SidebarIcon = ({ icon }) => {
  return <div>{icon}</div>;
};

export default Sidebar;
