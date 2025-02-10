import {
  FaSearch,
  FaHashtag,
  FaRegBell,
  FaUserCircle,
  FaMoon,
  FaSun,
} from "react-icons/fa";

import { useTheme } from "../../../Context/THemeContext";
import ThemeSlider from "../Common/ThemeSlider";

const TopNavigation = () => {
  return (
    <div
      className="flex flex-row items-center justify-between 
        bg-white dark:bg-gray-900 
         h-16  rounded-md mx-1 my-1
         shadow-gray-500
        
        shadow-sm"
    >
      <div className="flex font-serif ">
        <p className="title-text text-3xl text-gray-800">
        COL 
        </p>
        <p className="title-text text-3xl text-green-800">
        Innov jam
        </p>
      </div>
      
      <div className="flex items-center justify-evenly w-1/4 ">
        
        <ThemeSlider/>
      </div>
    </div>
  );
};

const ThemeIcon = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <span onClick={toggleTheme}>
      {theme === "light" ? (
        <FaSun size="28" className="top-navigation-icon text-orange-400" />
      ) : (
        <FaMoon size="28" className="top-navigation-icon text-gray-300" />
      )}
    </span>
  );
};

const Search = () => (
  <div className="search">
    <input className="search-input bg-transparent" type="text" placeholder="" />
    <FaSearch size="18" className="text-secondary my-auto text-green-500" />
  </div>
);
const BellIcon = () => <FaRegBell size="24" className="top-navigation-icon text-green-500" />;
const UserCircle = () => (
  <FaUserCircle size="24" className="top-navigation-icon text-green-500" />
);


export default TopNavigation;
