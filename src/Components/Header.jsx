import React from 'react';
import { BsFillPersonFill } from 'react-icons/bs'; // Profile icon
import { FaSun, FaMoon } from 'react-icons/fa'; // Sun and Moon icons for theme toggle
import Logo from '../assets/Logo.png';
import { useTheme } from '../../Context/ThemeContext';

const Header = ({user}) => {
  const { theme, toggleTheme } = useTheme();

  return (
    <div
      className="flex  justify-between items-center px-6 py-4
       rounded-md mt-2 shadow-md transition-colors duration-300
        bg-gray-200 text-gray-800 dark:bg-gray-800
         dark:text-white mx-2"
    >
      {/* Logo and Title */}
      <div className="flex items-center space-x-4">
       {/* <img src={Logo} alt="Logo" className="h-6 sm:h-10  object-contain" /> */}
        <h2 className=" font-bold tracking-wide text-sm sm:text-md md:text-lg xl:text-2xl">Assessmentor</h2>
      </div>

      {/* Right side: Profile icon and Theme toggle */}
      <div className="flex items-center space-x-6">
        {/* Profile Icon */}
        <div className="flex items-center space-x-2 cursor-pointer">
          <BsFillPersonFill className="text-2xl" />
          <span className="hidden sm:block font-medium">{user}</span>
        </div>

        {/* Theme Toggle Button */}
        <button
          className="p-2 rounded-full transition-colors duration-300 bg-gray-300 hover:bg-gray-200 text-gray-900 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-yellow-300"
          onClick={toggleTheme}
        >
          {/* Render FaSun if the theme is light, FaMoon if dark */}
          {theme === 'light' ? (
            <FaSun className="w-4 h-4 text-gray-900" />
          ) : (
            <FaMoon className="w-4 h-4 text-yellow-300" />
          )}
        </button>
      </div>
    </div>
  );
};

export default Header;
