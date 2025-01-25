import React from 'react';
import { Link } from 'react-router';
import Logo from '../../assets/FirstComLogo.png'
import { ArrowRight } from 'lucide-react';
const HeroHeader = () => {
  return (
    <header className="bg-white  px-4 py-3 flex justify-center items-center w-full">
      <div className="flex items-center justify-center ">


        <div className='flex '>
        <Link to="/">
          <img src={Logo} alt="Logo" className="h-12  object-contain" />
        </Link>
        </div>



        {/* Top Navigataion menu options not required now */}
        {/* <nav>
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
        </nav> */}

      </div>

      



    </header>
  );
};


export default HeroHeader