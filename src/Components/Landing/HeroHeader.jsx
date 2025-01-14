import React from 'react';
import { Link } from 'react-router';
import Logo from '../../assets/FirstComLogo.png'
import { ArrowRight } from 'lucide-react';
const HeroHeader = () => {
  return (
    <header className="bg-white  px-4 py-3 flex justify-between items-center w-full">
      <div className="flex items-center justify-evenly w-[70%] ">


        <div className='flex '>
        <Link to="/">
          <img src={Logo} alt="Logo" className="h-12  object-contain" />
        </Link>
        </div>


        <nav>
          <ul className="flex space-x-6 text-xl font-serif">
            <li>
              <Link to="/signup" className="text-black hover:text-[#7289da] transition-colors duration-300">
                Signup
              </Link>
            </li>
            <li>
              <Link to="/features" className="text-black hover:text-[#7289da] transition-colors duration-300">
              Features
              </Link>
            </li>
            <li>
              <Link to="/discover" className="text-black hover:text-[#7289da] transition-colors duration-300">
                Discover
              </Link>
            </li>
            <li>
              <Link to="/about" className="text-black hover:text-[#7289da] transition-colors duration-300">
                About
              </Link>
            </li>
            
          </ul>
        </nav>

      </div>

      <div className='w-[30%] px-8  text-xl flex justify-end '>
        <Link to="/login" className= "flex justify-center items-center gap-2 text-black bg-[#4decb7] hover:bg-[#677bc4] px-4 py-2 rounded-lg transition-colors duration-300">
          
          Login
          <ArrowRight/>
        </Link>
      </div>



    </header>
  );
};


export default HeroHeader