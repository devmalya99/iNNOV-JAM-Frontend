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
import UseSidebarStore from "../../Zustand/SidebarStore";
import { CgOrganisation } from "react-icons/cg";
// Sidebar component
const Sidebar = () => {
  const [loading, setLoading] = useState(true);
  //State to manage sidebar visibility
  
  const { user, logout } = useAuth();

  // Access Zustand store
  const { viewSidebar, setViewSidebar } = UseSidebarStore();

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
      roles: ["admin"],
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
      {/* Sidebar visibility controller */}
      {viewSidebar && (
        <>
          {/* Background overlay for smaller screens */}
          {!viewSidebar && (
            <div
              className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
              onClick={() => setViewSidebar(false)} // Close sidebar on overlay click
            ></div>
          )}
  
          <aside
            className={`
              ${
                viewSidebar ? "sidebar-style-large" : "sidebar-style-small"
              } 
              fixed md:static top-0 left-0 h-full md:h-[calc(100vh-4.5rem)] z-50 transition-transform transform
              ${!viewSidebar ? "-translate-x-full" : "translate-x-0"}
            `}
          >
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
        </>
      )}
    </>
  );
  
  
};

// SidebarIcon Component
const SidebarIcon = ({ icon }) => {
  return <div>{icon}</div>;
};

export default Sidebar;
