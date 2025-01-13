import React from 'react';
import { Link } from 'react-router';
import Logo from '../../assets/Logo.png'
const HeroHeader = () => {
  return (
    <header className="bg-transparent dark:bg-gray-800 px-4 py-3 flex justify-between items-center w-full">
      <div className="flex items-center justify-evenly w-[70%] ">

        <div className='flex '>
        <Link to="/">
          <img src={Logo} alt="Logo" className="h-6 sm:h-8  object-contain" />
        </Link>
        </div>


        <nav>
          <ul className="flex space-x-6">
            <li>
              <Link to="/signup" className="text-white hover:text-[#7289da] transition-colors duration-300">
                Signup
              </Link>
            </li>
            <li>
              <Link to="/features" className="text-white hover:text-[#7289da] transition-colors duration-300">
              Features
              </Link>
            </li>
            <li>
              <Link to="/discover" className="text-white hover:text-[#7289da] transition-colors duration-300">
                Discover
              </Link>
            </li>
            <li>
              <Link to="/about" className="text-white hover:text-[#7289da] transition-colors duration-300">
                About
              </Link>
            </li>
            
          </ul>
        </nav>

      </div>

      <div className='w-[30%]  flex justify-end'>
        <Link to="/login" className="text-white bg-[#7289da] hover:bg-[#677bc4] px-2 py-1 rounded-lg transition-colors duration-300">
          Login
        </Link>
      </div>



    </header>
  );
};


export default HeroHeader