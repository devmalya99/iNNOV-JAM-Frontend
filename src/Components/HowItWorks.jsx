import React, { useState } from 'react';

const HowItWorks = () => {
  const [activeStep, setActiveStep] = useState(null);

  const steps = [
    {
      title: "Create Grading System",
      description: "Simply create your custom grading criteria and rubrics that will be used to evaluate assessments",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-10 h-10">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
          <polyline points="14 2 14 8 20 8"></polyline>
          <line x1="16" y1="13" x2="8" y2="13"></line>
          <line x1="16" y1="17" x2="8" y2="17"></line>
          <line x1="10" y1="9" x2="8" y2="9"></line>
        </svg>
      )
    },
    {
      title: "Create AI Model Combination",
      description: "Our advanced platform allows you to combine multiple AI models for more accurate assessment evaluation",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-10 h-10">
          <path d="M12 2a4 4 0 0 1 4 4c0 1.095-.437 2.1-1.158 2.851C16.1 10.1 17 11.2 17 13c0 1.6-.8 3-2 4"></path>
          <path d="M10 9c-1.958.489-3 2.3-3 4.5 0 2.5 2 4.5 4.5 4.5s4.5-2 4.5-4.5c0-2.2-1.042-4.011-3-4.5"></path>
          <path d="M7 21h10"></path>
          <path d="M12 2a4 4 0 0 0-4 4c0 1.095.437 2.1 1.158 2.851C7.9 10.1 7 11.2 7 13c0 1.6.8 3 2 4"></path>
        </svg>
      )
    },
    {
      title: "Create Course",
      description: "Set up your course with all necessary information, learning objectives, and assessment criteria",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-10 h-10">
          <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path>
          <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path>
        </svg>
      )
    },
    {
      title: "Create Learners & Assessors",
      description: "Add learners who will take assessments and assessors who will review AI evaluations",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-10 h-10">
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
          <circle cx="9" cy="7" r="4"></circle>
          <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
          <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
        </svg>
      )
    },
    {
      title: "Upload Assessment",
      description: "Upload new assessment files and create assessments based on your defined criteria",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-10 h-10">
          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
          <polyline points="17 8 12 3 7 8"></polyline>
          <line x1="12" y1="3" x2="12" y2="15"></line>
        </svg>
      )
    },
    {
      title: "Set Parameters & Assign",
      description: "Configure AI temperature and assign learners to your assessment",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-10 h-10">
          <circle cx="12" cy="12" r="3"></circle>
          <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
        </svg>
      )
    },
    {
      title: "Learner Login",
      description: "Learners can now login to access and complete their assigned assessments",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-10 h-10">
          <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"></path>
          <polyline points="10 17 15 12 10 7"></polyline>
          <line x1="15" y1="12" x2="3" y2="12"></line>
        </svg>
      )
    },
    {
      title: "AI Evaluation",
      description: "After submission, our advanced AI algorithms evaluate the assessment using your criteria",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-10 h-10">
          <path d="M12 2a8 8 0 0 1 8 8v12l-4-4-4 4-4-4-4 4V10a8 8 0 0 1 8-8z"></path>
          <path d="M9 9h6"></path>
          <path d="M9 13h6"></path>
          <path d="M9 17h6"></path>
        </svg>
      )
    },
    {
      title: "Assessor Review",
      description: "Login as an assigned assessor to view results and add your personal opinions",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-10 h-10">
          <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
          <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
        </svg>
      )
    }
  ];

  // Helper function to render animated arrow
  const renderArrow = () => (
    <div className="flex justify-center items-center mx-2 my-6 md:my-0 relative overflow-hidden">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6 text-pink-500 transform md:rotate-0 rotate-90 animate-pulse">
        <line x1="5" y1="12" x2="19" y2="12"></line>
        <polyline points="12 5 19 12 12 19"></polyline>
      </svg>
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-pink-200 to-transparent opacity-30 animate-shimmer"></div>
    </div>
  );

  return (
    <div className="bg-gradient-to-br from-gray-50 
    min-h-full
    dark:bg-gradient-to-br dark:from-gray-900 
    overflow-y-auto
    
    py-16 px-4">
      <style jsx>{`
        @keyframes float {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
          100% { transform: translateY(0px); }
        }
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        .animate-shimmer {
          animation: shimmer 2s infinite;
        }
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        .step-card {
          transition: all 0.3s ease;
        }
        .step-card:hover {
          transform: translateY(-10px);
        }
        .step-icon {
          transition: all 0.5s ease;
        }
        .step-card:hover .step-icon {
          transform: scale(1.1) rotate(5deg);
        }
        .step-title {
          transition: all 0.3s ease;
        }
        .step-card:hover .step-title {
          color: #ec4899;
        }
      `}</style>

      <div className="max-w-full ">

        <div className="text-center mb-16 relative overflow-hidden">
          <div className="absolute inset-0 bg-pink-100 opacity-70 rounded-3xl transform -skew-y-2"></div>
          <div className="relative z-10 py-8">
            <p className="text-pink-500 font-bold uppercase tracking-wider mb-2 animate-pulse">HOW IT WORKS</p>
            <h1 className="text-3xl md:text-5xl font-bold text-gray-800 mb-6 relative">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-pink-600 via-purple-500 to-indigo-600">
                Transform your assessment process
              </span>
              <br className="hidden md:block" />
              <span className="relative inline-block">
                in nine simple steps
                <div className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-pink-400 to-purple-500 rounded"></div>
              </span>
            </h1>
            <p className="text-gray-600 max-w-2xl mx-auto">Our intuitive platform streamlines your entire assessment workflow from creation to evaluation.</p>
          </div>
        </div>

        {/* First Row: Steps 1-3 */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-16">
          {steps.slice(0, 3).map((step, index) => (
            <React.Fragment key={index}>
              <div 
                className={`
                  flex-1 flex flex-col items-center text-center px-4 mb-12 md:mb-0 step-card
                  ${activeStep === index ? 'scale-105' : ''}
                  transition-all duration-300 ease-in-out
                `}
                onMouseEnter={() => setActiveStep(index)}
                onMouseLeave={() => setActiveStep(null)}
              >
                <div className="relative">
                  <div className="absolute inset-0 bg-pink-400 rounded-full opacity-10 blur-xl animate-pulse"></div>
                  <div className="bg-white w-24 h-24 rounded-full border-2 border-pink-500 flex items-center justify-center mb-6 shadow-lg relative z-10 overflow-hidden step-icon">
                    <div className="absolute inset-0 bg-gradient-to-br from-pink-50 to-purple-50 opacity-60"></div>
                    <div className="text-pink-500 relative z-10">
                      {step.icon}
                    </div>
                    <div className="absolute -bottom-10 -right-10 w-16 h-16 bg-gradient-to-r from-pink-200 to-purple-200 rounded-full opacity-60 blur-sm"></div>
                  </div>
                  <div className="absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-pink-500 rounded-full flex items-center justify-center text-white font-bold shadow-md">
                    {index + 1}
                  </div>
                </div>
                <h3 className="font-bold text-xl mb-3 step-title">{step.title}</h3>
                <p className="text-gray-600 text-sm max-w-xs leading-relaxed">{step.description}</p>
                <div className={`w-full h-1 bg-gradient-to-r from-pink-300 to-purple-300 mt-4 rounded-full transform scale-x-0 transition-transform duration-500 ${activeStep === index ? 'scale-x-100' : ''}`}></div>
              </div>
              {index < 2 && renderArrow()}
            </React.Fragment>
          ))}
        </div>

        {/* Second Row: Steps 4-6 */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-16">
          {steps.slice(3, 6).map((step, index) => (
            <React.Fragment key={index + 3}>
              <div 
                className={`
                  flex-1 flex flex-col items-center text-center px-4 mb-12 md:mb-0 step-card
                  ${activeStep === index + 3 ? 'scale-105' : ''}
                  transition-all duration-300 ease-in-out
                `}
                onMouseEnter={() => setActiveStep(index + 3)}
                onMouseLeave={() => setActiveStep(null)}
              >
                <div className="relative">
                  <div className="absolute inset-0 bg-pink-400 rounded-full opacity-10 blur-xl animate-pulse"></div>
                  <div className="bg-white w-24 h-24 rounded-full border-2 border-pink-500 flex items-center justify-center mb-6 shadow-lg relative z-10 overflow-hidden step-icon">
                    <div className="absolute inset-0 bg-gradient-to-br from-pink-50 to-purple-50 opacity-60"></div>
                    <div className="text-pink-500 relative z-10">
                      {step.icon}
                    </div>
                    <div className="absolute -bottom-10 -right-10 w-16 h-16 bg-gradient-to-r from-pink-200 to-purple-200 rounded-full opacity-60 blur-sm"></div>
                  </div>
                  <div className="absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-pink-500 rounded-full flex items-center justify-center text-white font-bold shadow-md">
                    {index + 4}
                  </div>
                </div>
                <h3 className="font-bold text-xl mb-3 step-title">{step.title}</h3>
                <p className="text-gray-600 text-sm max-w-xs leading-relaxed">{step.description}</p>
                <div className={`w-full h-1 bg-gradient-to-r from-pink-300 to-purple-300 mt-4 rounded-full transform scale-x-0 transition-transform duration-500 ${activeStep === index + 3 ? 'scale-x-100' : ''}`}></div>
              </div>
              {index < 2 && renderArrow()}
            </React.Fragment>
          ))}
        </div>

        {/* Third Row: Steps 7-9 */}
        <div className="flex flex-col md:flex-row justify-between items-center">
          {steps.slice(6, 9).map((step, index) => (
            <React.Fragment key={index + 6}>
              <div 
                className={`
                  flex-1 flex flex-col items-center text-center px-4 mb-12 md:mb-0 step-card
                  ${activeStep === index + 6 ? 'scale-105' : ''}
                  transition-all duration-300 ease-in-out
                `}
                onMouseEnter={() => setActiveStep(index + 6)}
                onMouseLeave={() => setActiveStep(null)}
              >
                <div className="relative">
                  <div className="absolute inset-0 bg-pink-400 rounded-full opacity-10 blur-xl animate-pulse"></div>
                  <div className="bg-white w-24 h-24 rounded-full border-2 border-pink-500 flex items-center justify-center mb-6 shadow-lg relative z-10 overflow-hidden step-icon">
                    <div className="absolute inset-0 bg-gradient-to-br from-pink-50 to-purple-50 opacity-60"></div>
                    <div className="text-pink-500 relative z-10">
                      {step.icon}
                    </div>
                    <div className="absolute -bottom-10 -right-10 w-16 h-16 bg-gradient-to-r from-pink-200 to-purple-200 rounded-full opacity-60 blur-sm"></div>
                  </div>
                  <div className="absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-pink-500 rounded-full flex items-center justify-center text-white font-bold shadow-md">
                    {index + 7}
                  </div>
                </div>
                <h3 className="font-bold text-xl mb-3 step-title">{step.title}</h3>
                <p className="text-gray-600 text-sm max-w-xs leading-relaxed">{step.description}</p>
                <div className={`w-full h-1 bg-gradient-to-r from-pink-300 to-purple-300 mt-4 rounded-full transform scale-x-0 transition-transform duration-500 ${activeStep === index + 6 ? 'scale-x-100' : ''}`}></div>
              </div>
              {index < 2 && renderArrow()}
            </React.Fragment>
          ))}
        </div>

        {/* Final CTA */}
        <div className="mt-20 text-center">
          {/* <button className="px-8 py-4 bg-gradient-to-r from-pink-500 to-purple-600 text-white font-bold rounded-full transform transition-all duration-300 hover:scale-105 hover:shadow-lg">
            Get Started Today
          </button> */}
          <div className="mt-4 text-gray-600">Experience the future of assessment evaluation</div>
        </div>
      </div>
    </div>
  );
};

export default HowItWorks;