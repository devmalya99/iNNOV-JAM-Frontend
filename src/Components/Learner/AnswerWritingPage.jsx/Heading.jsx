import { MdCheckBoxOutlineBlank } from "react-icons/md";
import { LuClock3 } from "react-icons/lu";
import Logo from "../../../assets/Logo.png";
function Heading({subject}) {
  const capitalizeWords = (str) =>
    str
      .toLowerCase()
      .replace(/_/g, ' ')
      .replace(/\b\w/g, (char) => char.toUpperCase());

  return (
    <>
      <div
        className="flex justify-between text-white "
      >
        <div className="flex justify-between items-center">
          <span className=" py-2  mx-2 text-sm md:text-lg lg:text-xl bg-white/15 backdrop-blur-lg font-semibold border-2 px-6 rounded-xl text-gray-800">
            {subject? capitalizeWords(subject):"Subject"}
          </span>
          <span className=" py-2  mx-2 text-lg  bg-white/15 backdrop-blur-lg font-semibold border-2 px-4 rounded-xl text-gray-800">
            1st Sem
          </span>
        </div>

        {/* Clock  */}
        <div className="flex gap-2 rounded-xl p-2 sm:p-4 justify-center border-2 ">
          {/* Clock Icon */}
          <div>
            <LuClock3 className="text-xl mt-2 text-black dark:text-white  md:text-2xl lg:text-3xl" />
          </div>

          {/* Timer 1 */}
          <div className="timer p-2 sm:p-3 rounded-xl bg-gray-700 text-gray-200 text-sm md:text-lg lg:text-xl">
            10
          </div>

          {/* Timer 2 */}
          <div className="timer p-2 sm:p-3 rounded-xl bg-gray-700 text-gray-200 text-sm md:text-lg lg:text-xl">
            10
          </div>
        </div>

        

        
      </div>
    </>
  );
}

export default Heading;
