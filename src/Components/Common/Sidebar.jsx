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
import { BookAIcon, LucideGraduationCap, PowerOffIcon, StarsIcon, Users2Icon } from "lucide-react";
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
   
   console.log("isSmallScreen",isSmallScreen)


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
      icon: <FaHome className="text-2xl text-green-600" />,
      link: "/home",
      roles: ["admin", "super_admin", "assessor", "trainer", "learner"],
    },
    {
      name: "Create Users",
      icon: <FaChalkboardTeacher className="text-2xl text-green-600" />,
      link: "/home/create-users",
      roles: ["admin", "super_admin"],
    },
    
    {
      name: "User Management",
      icon: <Users2Icon className="text-2xl text-green-600" />,
      link: "/home/user-management",
      roles: ["admin", "super_admin"],
    },
    {
      name: "Create course",
      icon: <CgOrganisation className="text-2xl text-green-600" />,
      link: "/home/create-course",
      roles: ["admin", "super_admin"],
    },
    {
      name: "Upload Courseware",
      icon: <FaBook className="text-2xl text-green-600" />,
      link: "/home/upload-courseware",
      roles: ["admin", "super_admin"],
    },
    
    {
      name: "All Courses",
      icon: <FaAccusoft className="text-2xl text-green-600" />,
      link: "/home/all-assessments",
      roles: ["admin", "super_admin"],
    },

    // View All the course
    {
      name: "Enrolled Courses",
      icon: <BookAIcon className="text-2xl text-green-600" />,
      link: "/home/learner/view-all-courses",
      roles: ["learner"],
    },
    
    
    
    // {
    //   name: "Settings",
    //   icon: <MdOutlineSettingsSuggest className="text-2xl text-green-600" />,
    //   link: "/settings",
    //   roles: ["super_admin"],
    // },
    {
      name: "Evaluation Result",
      icon: <FaRegPenToSquare className="text-2xl text-green-600" />,
      link: "/home/assessment",
      roles: [ "assessor"],
    },
    

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
        className="fixed inset-0 bg-black bg-opacity-50 z-40"
        onClick={() => setViewSidebar(false)}
      ></div>
    )}

    {/* Sidebar */}
    <aside
      className={`fixed md:static top-0 left-0 h-[calc(100vh-4.5rem)] 
        md:h-[calc(100vh-4.5rem)] z-25
      transition-transform transform bg-white dark:bg-[#09122C] 
      ${isSmallScreen ? "w-64" : "w-72"} 
      ${viewSidebar ? "translate-x-0" : "-translate-x-full"} 
      md:translate-x-0`}
    >
      {/* Logo Section */}
      {/* only visible if isSmallScreen */}
      {
        isSmallScreen && (
          <div className="p-4 flex items-center justify-between bg-green-100 text-white">
            <img src={Logo} alt="FirstCom Logo" className="h-12 w-auto" />
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
          <div className="p-4 flex items-center justify-between 
          hover:bg-gray-200 dark:hover:bg-gray-700  dark:text-white">
            <div className="flex gap-2">
              <RiStarSFill className="text-2xl bg-green-500   "/>
              <p className="text-lg">Theme</p>
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
      <div className="flex flex-col h-full">
        {/* Sidebar Items */}
        <div className="flex-grow overflow-y-auto">
          {filteredItems.map((item, index) => (
            <Link
              to={item.link}
              key={index}
              className={`flex items-center gap-4 p-4 hover:bg-gray-200 dark:hover:bg-gray-700 ${
                location.pathname === item.link ? "bg-green-300 border-gray-600 rounded-xl m-1 " : ""
              }`}
              onClick={handleItemClick}
            >
              <div>{item.icon}</div>
              <span className="text-gray-900 dark:text-gray-100">{item.name}</span>
            </Link>
          ))}
        </div>

        {/* Footer Section */}
        <div className="px-4 py-3 m-1 bg-gray-100 dark:bg-gray-800  rounded-lg shadow-lg">
  <div className="flex items-center gap-4 ">
    <div className="p-2 bg-gradient-to-r from-green-600 to-green-300 rounded-full shadow-md">
      <BsPersonFillGear className="text-4xl text-white" />
    </div>
    <div>
      <p className="font-bold text-green-600 dark:text-green-400 text-lg">
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
