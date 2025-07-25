

import {useAuth} from "../../Context/AuthContext"

import {  Menu } from "lucide-react";

import ThemeSlider from "./ThemeSlider";
import UseSidebarStore from "../../Zustand/SidebarStore";

const MainHeadbar = () => {

  const {viewSidebar, setViewSidebar} = UseSidebarStore();

  const {user} = useAuth()

  return (
    <div
      className="flex flex-row items-center justify-between 
          bg-white dark:bg-[#1d1f24] 
           h-16 "
    >

      <p className="font-playfair text-2xl text-gray-800 dark:text-white ml-6">
        Hello {user?.name}..
      </p>

      
      
       
       {/* Display only on larger screens */}
      <div className="hidden md:flex items-center 
      justify-evenly gap-2 mx-1">
        <ThemeSlider />
      </div>

      {/* Hamburger menu that will be displayed on smaller screen */}
      <div className="md:hidden flex px-1 dark:text-white ">
           <div className=""/>
           <div
           onClick={()=>setViewSidebar(!viewSidebar)}
           >
            <Menu/>
           </div>
      </div>


    </div>
  );
};



export default MainHeadbar;
