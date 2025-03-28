import {
  FaSearch,
  FaHashtag,
  FaRegBell,
  FaUserCircle,
  FaMoon,
  FaSun,
  FaHamburger,
  FaDashcube,
} from "react-icons/fa";



import SearchBar from "./SearchBar";

import { BookDashed, Menu } from "lucide-react";
import CompanyName from "./CompanyName";
import { useTheme } from "../../../Context/ThemeContext";
import ThemeSlider from "./ThemeSlider";
import UseSidebarStore from "../../Zustand/SidebarStore";

const MainHeadbar = () => {

  const {viewSidebar, setViewSidebar} = UseSidebarStore();

  return (
    <div
      className="flex flex-row items-center justify-end 
          bg-white dark:bg-[#1d1f24] 
           h-16 "
    >
      
       
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
