import { useState, useEffect } from "react";
import { LuClock3 } from "react-icons/lu";

function Heading({ subject, duration,timeLeft, setTimeLeft}) {


 // console.log("Received duration, and time left is ", duration,timeLeft); // Debugging log

 

 

 
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60)
      .toString()
      .padStart(2, "0");
    const secs = (seconds % 60).toString().padStart(2, "0");
    return `${mins}:${secs}`;
  };

  const capitalizeWords = (str) =>
    str
      .toLowerCase()
      .replace(/_/g, " ")
      .replace(/\b\w/g, (char) => char.toUpperCase());

  return (
    <div className="flex justify-between text-white">
      <div className="flex justify-between items-center">
        <span className="py-2 mx-2 text-sm md:text-lg lg:text-xl bg-white/15 backdrop-blur-lg font-semibold border-2 px-6 rounded-xl text-gray-800">
          {subject ? capitalizeWords(subject) : "Subject"}
        </span>
      </div>

      {/* Clock */}
      <div className="flex gap-2 rounded-xl p-2 sm:p-4 justify-center border-2">
        {/* Clock Icon */}
        <LuClock3 className="text-xl mt-2 text-black dark:text-white md:text-2xl lg:text-3xl" />

        {/* Timer */}
        <div className="timer p-2 sm:p-3 rounded-xl bg-gray-700 text-gray-200 text-sm md:text-lg lg:text-xl">
          {formatTime(timeLeft)}
        </div>
      </div>
    </div>
  );
}

export default Heading;
