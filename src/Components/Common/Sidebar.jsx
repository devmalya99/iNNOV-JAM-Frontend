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
  FaHome,
  FaThemeco,
  FaThemeisle,
  FaUserGraduate,
} from "react-icons/fa";
import { FaRegPenToSquare } from "react-icons/fa6";
import { MdOutlineSettingsSuggest } from "react-icons/md";
import { Link, useLocation } from "react-router"; // Ensure correct version of react-router
import { PowerOffIcon, StarsIcon } from "lucide-react";
import Logo from "/FirstComLogo.png";
import { useAuth } from "../../../Context/AuthContext";
import SkeletonPage from "../SkeletonPage";
import MainHeadbar from "./MainHeadbar";
import ThemeSlider from "./ThemeSlider";

// Sidebar component
const Sidebar = () => {
  const [loading, setLoading] = useState(true);
  //State to manage sidebar visibility
  const [viewSidebar, setViewSidebar] = useState(false);
  const { user, logout } = useAuth();

   // Location to detect active route
   const location = useLocation();



  // Effect to determine initial sidebar visibility based on screen size
  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 768px)"); // `md` breakpoint
    setViewSidebar(mediaQuery.matches);

    const handleResize = (e) => setViewSidebar(e.matches);
    mediaQuery.addEventListener("change", handleResize);

    return () => mediaQuery.removeEventListener("change", handleResize);
  }, []);



  // Wait for user object to be available
  useEffect(() => {
    if (user) setLoading(false);
  }, [user]);

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
      name: "Upload Courseware",
      icon: <FaBook className="text-2xl text-green-600" />,
      link: "/home/upload-courseware",
      roles: ["admin", "super_admin"],
    },
    {
      name: "Upload Assessment",
      icon: <BsCalendar2Check className="text-2xl text-green-600" />,
      link: "/home/upload-assessment-plan",
      roles: ["admin", "super_admin"],
    },
    {
      name: "All Assessments",
      icon: <FaAccusoft className="text-2xl text-green-600" />,
      link: "/home/all-assessments",
      roles: ["admin", "super_admin"],
    },
    {
      name: "Assign Trainers",
      icon: <FaChalkboardTeacher className="text-2xl text-green-600" />,
      link: "/home/assign-trainers",
      roles: ["admin", "super_admin"],
    },
    {
      name: "Assign Learners",
      icon: <FaUserGraduate className="text-2xl text-green-600" />,
      link: "/home/assign-learners",
      roles: ["admin", "super_admin"],
    },
    {
      name: "Assign TSC",
      icon: <FaCheck className="text-2xl text-green-600" />,
      link: "/home/assign-tsc",
      roles: ["admin", "super_admin"],
    },
    {
      name: "Settings",
      icon: <MdOutlineSettingsSuggest className="text-2xl text-green-600" />,
      link: "/settings",
      roles: ["super_admin"],
    },
    {
      name: "Evaluation Result",
      icon: <FaRegPenToSquare className="text-2xl text-green-600" />,
      link: "/home/assessment",
      roles: ["admin", "super_admin", "assessor"],
    },
    {
      name: "Answer Writing",
      icon: <FaRegPenToSquare className="text-2xl text-green-600" />,
      link: "/home/learner/instructions",
      roles: ["learner"],
    },

  ];

  // Filter sidebar items based on the user's role
  const filteredItems = sidebarItems.filter((item) =>
    item.roles.includes(user.role)
  );

  return (

    <>
      {/* Main Headbar */}
      <nav className="fixed top-0 z-50 w-full bg-gray-50 border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700">
        <MainHeadbar
          viewSidebar={viewSidebar}
          setViewSidebar={setViewSidebar}
        />
      </nav>

      {/* Sidebar visibility controller */}
      {viewSidebar && (
        <aside className="fixed top-0 left-0 z-40 w-64 h-screen pt-20 bg-white border-r border-gray-200 dark:bg-gray-800 dark:border-gray-700 flex flex-col">
          
          
          {/* Display only on smaller  screens */}
          <div className="md:hidden flex items-center justify-between w-auto px-2 py-2  mx-1  hover:text-black 
        hover:bg-green-500  cursor-pointer  text-lg text-green-500
        rounded-3xl hover:rounded-xl transition-all duration-300 ease-linear gap-2">

          <div className="flex items-center gap-2">
          <StarsIcon/>
            <p className=" px-2"> Theme</p>
          </div>
          
            <div className="flex  items-center justify-evenly gap-2 mx-1">
            <ThemeSlider />
          </div>
          </div>
          

          {/* Sidebar Items */}
          <div className="mx-1 mt-4 flex-grow">
            {filteredItems.map((item, index) => (
              <div className="sidebar-style" key={index}>
                <SidebarIcon icon={item.icon} />
                <Link to={item.link}>{item.name}</Link>
              </div>
            ))}
          </div>

          {/* Footer Section */}
          <div className="mt-auto bg-gray-300 dark:bg-gray-700 dark:text-white rounded-xl p-4 m-1">
            <div className="flex justify-start items-center gap-4">
              <div>
                <BsPersonFillGear className="text-4xl bg-gradient-to-r from-green-600 to-green-300 p-1 rounded-full" />
              </div>
              <div className="flex flex-col">
                <span className="text-green-500 font-bold">
                  {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                </span>
                <span>{user.name}</span>
              </div>
              <button onClick={logout}>
                <PowerOffIcon className="m-1 cursor-pointer hover:text-red-700" />
                <p className="text-sm hover:text-red-500">Logout</p>
              </button>
            </div>
          </div>
        </aside>
      )}
    </>
  );
};

// SidebarIcon Component
const SidebarIcon = ({ icon }) => {
  return <div>{icon}</div>;
};

export default Sidebar;
