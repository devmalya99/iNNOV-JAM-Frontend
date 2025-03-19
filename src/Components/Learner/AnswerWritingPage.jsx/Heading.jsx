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
        <span className="py-2 mx-2 text-sm md:text-lg lg:text-xl 
        bg-white/15 backdrop-blur-lg font-semibold 
        border-2 px-6 rounded-xl text-gray-500">
          {subject ? capitalizeWords(subject) : "Subject"}
        </span>
      </div>

      {/* Modern Clock Design */}
<div className="flex items-center gap-4 p-4 bg-gradient-to-r from-blue-200 via-indigo-200 to-blue-300 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
  {/* Clock Icon */}
  <LuClock3 className="text-white text-3xl md:text-4xl lg:text-5xl transform transition-transform hover:scale-110" />

  {/* Timer */}
  <div className="timer px-4 py-2 text-center rounded-lg bg-white bg-opacity-25 
  text-white font-mono text-xl md:text-xl 
  lg:text-2xl shadow-xl backdrop-blur-md">
    {formatTime(timeLeft)}
  </div>
</div>

    </div>
  );
}

export default Heading;
