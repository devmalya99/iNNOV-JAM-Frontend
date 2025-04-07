import { Link } from 'react-router';

/**
 * The HeroHeader component is a reusable header component 
 * used for the landing page and other pages that require a 
 * simple header with a logo and navigation menu options.
 * 
 * @returns {JSX.Element} The JSX element representing the hero header.
 */


const HeroHeader = () => {
  return (
    <header className="  px-4 py-3 flex justify-center border-b 
    border-gray-700 items-center w-full">
      <div className="flex items-center justify-center ">


        <div className='flex '>
        <Link to="/">
          {/* <img src={Logo} alt="Logo" className="h-12  object-contain" /> */}
          <p className='text-3xl font-bold tracking-wide text-gray-300/80 '>COL Innov jam</p>
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