import React from 'react';
import { Link } from 'react-router';
import { ArrowBigRight, ArrowRight } from 'lucide-react';
import { RiArrowRightDoubleFill } from 'react-icons/ri';
import background from "../../assets/background.jpg"
const HeroLandingPage = () => {

  const handleStudentLogin =()=>{
    
  }

  return (
    <div className='backdrop-blur-md '>
    
  <section className="py-12 px-6 md:px-8 lg:px-12 xl:px-16 ">
  <div className="container max-w-screen-xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-8 items-center">

    {/* Left Column (Text Content) */}
    <div className="col-span-1 md:col-span-6 px-4 md:px-8 lg:px-12 py-6 w-full space-y-8">
      <div className="text-3xl font-extrabold text-white sm:text-4xl md:text-3xl lg:text-4xl xl:text-5xl">
        <div className="block xl:inline bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-transparent bg-clip-text">
          Transform Examination System
        </div>
      </div>
      <p className="text-sm text-gray-200 sm:max-w-md lg:text-lg md:max-w-3xl leading-relaxed">
        It's never been easier to take an exam with our advanced AI-powered proctoring and evaluation system.
      </p>

      <div>

      <h1 className="text-3xl font-extrabold text-white sm:text-4xl md:text-3xl lg:text-4xl xl:text-5xl">
        <span className="block text-indigo-600 xl:inline">Easier, Faster, and Efficient</span>
      </h1>
      </div>

      {/* Action Buttons */}
      <div className="relative flex flex-col sm:flex-row sm:space-x-6 space-y-6 sm:space-y-0 mt-8 ">


        <button className='flex items-center w-1/2 px-6 py-3 text-lg bg-slate-700 rounded-xl justify-center hover:scale-110 font-bold'
        
        >
          <Link
            to="/login"
            className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-transparent bg-clip-text rounded-md sm:w-auto justify-center transition-transform hover:scale-110"
          >
            Login
          </Link>
          <RiArrowRightDoubleFill className='mt-1 ml-4 ' />
        </button>

        <button className='flex items-center w-1/2 px-6 py-3 text-lg bg-slate-100 rounded-xl font-semibold'>
          <Link
            to="/book-consultation"
            className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-transparent bg-clip-text rounded-md sm:w-auto justify-center transition-transform hover:scale-105"
          >
            Book a free consultation
          </Link>
        </button>
      </div>
    </div>

    {/* Right Column (Image) */}
    <div className="col-span-1 md:col-span-6 ">
      <div className="w-full h-auto overflow-hidden rounded-md shadow-xl sm:rounded-xl">
        <img
          src="https://images.unsplash.com/photo-1488998427799-e3362cec87c3?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="AI tools"
          className="object-cover w-full h-auto"
        />
      </div>
    </div>
  </div>
</section>



    </div>
  );
};

export default HeroLandingPage;
