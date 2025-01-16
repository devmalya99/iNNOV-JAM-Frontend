import React from 'react';
import { Link } from 'react-router';

import { RiArrowRightDoubleFill } from 'react-icons/ri';
import background from "../../assets/background.jpg"
import {
  ChevronRight,
  Layout,
  Calendar,
  BarChart,
  ArrowBigRight,
  ArrowRight
} from "lucide-react";


const HeroLandingPage = () => {

  const handleStudentLogin =()=>{
    
  }

  return (
    <div className=' '>

<section className="container mx-auto py-20 text-center">
      <h1 className="text-6xl sm:text-7xl lg:text-8xl font-extrabold gradient-title pb-6 flex flex-col">Streamline Your Assessment  Evaluation System with AI</h1>
      <p className="text-xl text-gray-600 mb-10 max-w-3xl mx-auto mt-4">Revamp your evaluation system make it Faster and more Efficient!</p>
      

      <div className='flex justify-center'>

      <Link to='/login'>
         <div size="lg" className="flex items-center justify-center mr-4 bg-[#5069fa] px-4 py-2 rounded-lg">
          Get Started
          <ChevronRight size={18} className="ml-1"/>
         </div>
         </Link>

         <Link to="/book-consultation">
         <div size="lg" className="flex items-center justify-center mr-4 bg-[#5069fa] px-4 py-2 rounded-lg">
         Learn More
          <ChevronRight size={18} varient="outline" className="ml-1"/>
         </div>
         </Link>

      </div>
      
      
     </section>

    
 



    </div>
  );
};

export default HeroLandingPage;
