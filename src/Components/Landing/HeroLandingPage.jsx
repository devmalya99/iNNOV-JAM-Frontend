import React from 'react';
import { Link } from 'react-router';
import { RiArrowRightDoubleFill } from 'react-icons/ri';
import background from "../../assets/background.jpg";
import {
  ChevronRight,
  ArrowRight,
  BarChart2,
  ClipboardCheck,
  Sparkles,
  Clock,
  Check
} from "lucide-react";

const HeroLandingPage = () => {
  return (
    <div className="h-[calc(100vh-130px)] flex flex-col ">
      {/* Main Content */}
      <main className="flex-grow flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8">
        <section className="w-full max-w-6xl mx-auto text-center">
          {/* Animated Gradient Heading */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold mb-6">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">
              Revolutionize Assessments
            </span>
            <br />
            <span className="text-3xl sm:text-4xl lg:text-5xl font-light text-gray-700">
              with AI-Powered Evaluation
            </span>
          </h1>

          {/* Subheading */}
          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto mb-12">
            Transform your evaluation system with cutting-edge AI that makes grading faster, 
            more accurate, and completely effortless.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row justify-center gap-4 mb-20">
            <Link to='/login' className="group">
              <button className="flex items-center justify-center px-8 py-4 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 group-hover:-translate-y-1">
                Get Started
                <ChevronRight size={20} className="ml-2 group-hover:translate-x-1 transition-transform" />
              </button>
            </Link>
            
            {/* <Link to='/demo' className="group">
              <button className="flex items-center justify-center px-8 py-4 bg-white hover:bg-gray-50 text-indigo-600 border-2 border-indigo-100 font-medium rounded-lg shadow-md hover:shadow-lg transition-all duration-300 group-hover:-translate-y-1">
                See Demo
                <ArrowRight size={20} className="ml-2 group-hover:translate-x-1 transition-transform" />
              </button>
            </Link> */}
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {[
              {
                icon: <ClipboardCheck className="w-8 h-8 text-indigo-600" />,
                title: "Automated Grading",
                desc: "AI that evaluates with human-level accuracy"
              },
              {
                icon: <BarChart2 className="w-8 h-8 text-indigo-600" />,
                title: "Detailed Analytics",
                desc: "Comprehensive performance insights"
              },
              {
                icon: <Clock className="w-8 h-8 text-indigo-600" />,
                title: "More Time Saved",
                desc: "Focus on teaching, not paperwork"
              }
            ].map((feature, index) => (
              <div 
              key={index}
              className="relative p-6 rounded-xl border border-indigo-100 shadow-sm 
                       
                        hover:blur-none hover:scale-105
                        hover:bg-gradient-to-br hover:from-indigo-100 hover:to-purple-100
                        transition-all duration-500 group overflow-hidden"
            >
              {/* Animated background overlay */}
              <div className="absolute inset-0 bg-[conic-gradient(from_90deg_at_50%_50%,#a78bfa_0%,#7c3aed_50%,#a78bfa_100%)] 
                              opacity-0 group-hover:opacity-10 transition-opacity duration-700 rounded-xl"></div>
            
              {/* Shiny light effect */}
              <div className="absolute inset-0 overflow-hidden rounded-xl">
                <div className="absolute -inset-10 opacity-0 group-hover:opacity-40 transition-opacity duration-700">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] 
                                  from-purple-300/50 via-transparent to-transparent blur-lg"></div>
                </div>
              </div>
            
              <div className="relative flex flex-col items-center text-center z-10">
                {/* Icon with color-shift animation */}
                <div className="p-4 mb-4 rounded-full 
                               bg-gradient-to-br from-indigo-100 to-purple-100 
                               group-hover:from-indigo-200 group-hover:to-purple-200
                               shadow-inner group-hover:shadow-md 
                               transition-all duration-500 group-hover:scale-110">
                  <div className="text-indigo-600 group-hover:text-purple-700 transition-colors duration-500">
                    {React.cloneElement(feature.icon, { className: "w-6 h-6" })}
                  </div>
                </div>
                
                {/* Text with dramatic color shift */}
                <h3 className="text-xl font-semibold mb-2 
                              text-indigo-200 group-hover:text-purple-900 
                              transition-colors duration-500">
                  {feature.title}
                </h3>
                <p className="text-indigo-200/80 group-hover:text-purple-800/90 
                            transition-colors duration-500">
                  {feature.desc}
                </p>
              </div>
            
              {/* Border glow effect */}
              <div className="absolute inset-0 rounded-xl border-2 border-transparent 
                             group-hover:border-purple-200/50 pointer-events-none
                             transition-all duration-700"></div>
            </div>
            ))}
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="py-6 border-t border-gray-100">
        <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center space-x-2 mb-4 md:mb-0">
            <Check className="text-indigo-500" />
            <span className="font-medium text-gray-700">AI Marking Assistant</span>
          </div>
          <div className="text-sm text-gray-500">
            © {new Date().getFullYear()} All rights reserved • Version 4.1
            
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HeroLandingPage;