import { FaSearch } from 'react-icons/fa';

const SearchBar = () => {
  return (
    <div className="relative">
      <input
        type="text"
        placeholder="Search..."
        className="
          w-full
          pl-10
          pr-4
          py-2
          rounded-lg
          border
          dark:border-gray-700  
          
          focus:outline-none
          focus:ring-2
          focus:ring-blue-500
          dark:focus:ring-blue-400 /* Dark mode focus ring color */
          focus:border-transparent
          bg-white
          dark:bg-gray-800 /* Dark mode background color */
          placeholder-gray-400
          dark:placeholder-gray-500 /* Dark mode placeholder color */
          text-gray-900
          dark:text-gray-100 /* Dark mode text color */
          transition
          duration-200
          ease-in-out"
      />
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <FaSearch className="text-gray-400 w-5 h-5 dark:text-gray-500" /> {/* Dark mode icon color */}
      </div>
    </div>
  );
};

export default SearchBar;