import { FaSun, FaMoon } from "react-icons/fa";
import { useTheme } from "../../../Context/ThemeContext";

const ThemeSlider = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <div
      onClick={toggleTheme}
      className="relative w-20 h-10 flex items-center
       bg-gray-300 dark:bg-gray-500 
       rounded-full p-1 cursor-pointer 
       transition-all duration-300 ease-in-out"
    >
      {/* Sliding Sun and Moon */}
      <span
        className={`absolute w-8 h-8 flex items-center justify-center 
          rounded-full shadow-md transition-transform duration-500 ease-in-out
          ${theme === "dark" ? "translate-x-10" : "translate-x-0"}
        `}
      >
        {theme === "light" ? (
          <FaMoon className="text-gray-800" size="20" />
        ) : (
          <FaSun className="text-yellow-400" size="20" />
        )}
      </span>
    </div>
  );
};

export default ThemeSlider;
