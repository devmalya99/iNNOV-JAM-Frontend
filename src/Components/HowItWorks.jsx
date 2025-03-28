import React, { useState } from 'react';
import {
  FileText,
  Cpu,
  BookOpen,
  Users,
  UploadCloud,
  Settings,
  LogIn,
  Bookmark,
  Edit,
  ArrowRight,
} from 'lucide-react';

const HowItWorks = () => {
  const [activeStep, setActiveStep] = useState(null);

  const steps = [
    {
      title: "Create Grading System",
      description: "Simply create your custom grading criteria and rubrics that will be used to evaluate assessments",
      icon: <FileText className="w-10 h-10 text-green-500" />,
    },
    {
      title: "Create AI Model Combination",
      description: "Our advanced platform allows you to combine multiple AI models for more accurate assessment evaluation",
      icon: <Cpu className="w-10 h-10 text-green-500" />,
    },
    {
      title: "Create Course",
      description: "Set up your course with all necessary information, learning objectives, and assessment criteria",
      icon: <BookOpen className="w-10 h-10 text-green-500" />,
    },
    {
      title: "Create Learners & Assessors",
      description: "Add learners who will take assessments and assessors who will review AI evaluations",
      icon: <Users className="w-10 h-10 text-green-500" />,
    },
    {
      title: "Upload Assessment",
      description: "Upload new assessment files and create assessments based on your defined criteria",
      icon: <UploadCloud className="w-10 h-10 text-green-500" />,
    },
    {
      title: "Set Parameters & Assign",
      description: "Configure AI temperature and assign learners to your assessment",
      icon: <Settings className="w-10 h-10 text-green-500" />,
    },
    {
      title: "Learner Login",
      description: "Learners can now login to access and complete their assigned assessments",
      icon: <LogIn className="w-10 h-10 text-green-500" />,
    },
    {
      title: "AI Evaluation",
      description: "After submission, our advanced AI algorithms evaluate the assessment using your criteria",
      icon: <Bookmark className="w-10 h-10 text-green-500" />,
    },
    {
      title: "Assessor Review",
      description: "Login as an assigned assessor to view results and add your personal opinions",
      icon: <Edit className="w-10 h-10 text-green-500" />,
    },
  ];

  // Helper function to render animated arrow
  const renderArrow = () => (
    <div className="flex justify-center items-center mx-2 my-6 md:my-0 relative overflow-hidden">
      <ArrowRight className="w-6 h-6 text-green-500 transform md:rotate-0 rotate-90 animate-pulse" />
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-green-200 to-transparent opacity-30 animate-shimmer"></div>
    </div>
  );

  return (
    <div className="bg-gradient-to-br from-gray-50 min-h-full dark:bg-gradient-to-br dark:from-gray-900 overflow-y-auto py-16 px-4">
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
          color: #10b981;
        }
      `}</style>

      <div className="max-w-full">
        <div className="text-center mb-16 relative overflow-hidden">
          <div className="absolute inset-0 bg-green-100 opacity-70 rounded-3xl transform -skew-y-2"></div>
          <div className="relative z-10 py-8">
            <p className="text-green-500 font-bold uppercase tracking-wider mb-2 animate-pulse">HOW IT WORKS</p>
            <h1 className="text-3xl md:text-5xl font-bold text-gray-800 mb-6 relative">
              <span className="bg-clip-text text-transparent 
              bg-gradient-to-r from-green-600 via-teal-400 to-cyan-800">
                Transform your assessment process
              </span>
              <br className="hidden md:block" />
              <span className="relative inline-block">
                in nine simple steps
                <div className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-green-400 to-teal-500 rounded"></div>
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
                  <div className="absolute inset-0 bg-green-400 rounded-full opacity-10 blur-xl animate-pulse"></div>
                  <div className="bg-white w-24 h-24 rounded-full border-2 border-green-500 flex items-center justify-center mb-6 shadow-lg relative z-10 overflow-hidden step-icon">
                    <div className="absolute inset-0 bg-gradient-to-br from-green-50 to-teal-50 opacity-60"></div>
                    <div className="text-green-500 relative z-10">
                      {step.icon}
                    </div>
                    <div className="absolute -bottom-10 -right-10 w-16 h-16 bg-gradient-to-r from-green-200 to-teal-200 rounded-full opacity-60 blur-sm"></div>
                  </div>
                  <div className="absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white font-bold shadow-md">
                    {index + 1}
                  </div>
                </div>
                <h3 className="font-bold text-xl mb-3 step-title">{step.title}</h3>
                <p className="text-gray-600 text-sm max-w-xs leading-relaxed">{step.description}</p>
                <div className={`w-full h-1 bg-gradient-to-r from-green-300 to-teal-300 mt-4 rounded-full transform scale-x-0 transition-transform duration-500 ${activeStep === index ? 'scale-x-100' : ''}`}></div>
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
                  <div className="absolute inset-0 bg-green-400 rounded-full opacity-10 blur-xl animate-pulse"></div>
                  <div className="bg-white w-24 h-24 rounded-full border-2 border-green-500 flex items-center justify-center mb-6 shadow-lg relative z-10 overflow-hidden step-icon">
                    <div className="absolute inset-0 bg-gradient-to-br from-green-50 to-teal-50 opacity-60"></div>
                    <div className="text-green-500 relative z-10">
                      {step.icon}
                    </div>
                    <div className="absolute -bottom-10 -right-10 w-16 h-16 bg-gradient-to-r from-green-200 to-teal-200 rounded-full opacity-60 blur-sm"></div>
                  </div>
                  <div className="absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white font-bold shadow-md">
                    {index + 4}
                  </div>
                </div>
                <h3 className="font-bold text-xl mb-3 step-title">{step.title}</h3>
                <p className="text-gray-600 text-sm max-w-xs leading-relaxed">{step.description}</p>
                <div className={`w-full h-1 bg-gradient-to-r from-green-300 to-teal-300 mt-4 rounded-full transform scale-x-0 transition-transform duration-500 ${activeStep === index + 3 ? 'scale-x-100' : ''}`}></div>
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
                  <div className="absolute inset-0 bg-green-400 rounded-full opacity-10 blur-xl animate-pulse"></div>
                  <div className="bg-white w-24 h-24 rounded-full border-2 border-green-500 flex items-center justify-center mb-6 shadow-lg relative z-10 overflow-hidden step-icon">
                    <div className="absolute inset-0 bg-gradient-to-br from-green-50 to-teal-50 opacity-60"></div>
                    <div className="text-green-500 relative z-10">
                      {step.icon}
                    </div>
                    <div className="absolute -bottom-10 -right-10 w-16 h-16 bg-gradient-to-r from-green-200 to-teal-200 rounded-full opacity-60 blur-sm"></div>
                  </div>
                  <div className="absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white font-bold shadow-md">
                    {index + 7}
                  </div>
                </div>
                <h3 className="font-bold text-xl mb-3 step-title">{step.title}</h3>
                <p className="text-gray-600 text-sm max-w-xs leading-relaxed">{step.description}</p>
                <div className={`w-full h-1 bg-gradient-to-r from-green-300 to-teal-300 mt-4 rounded-full transform scale-x-0 transition-transform duration-500 ${activeStep === index + 6 ? 'scale-x-100' : ''}`}></div>
              </div>
              {index < 2 && renderArrow()}
            </React.Fragment>
          ))}
        </div>

        {/* Final CTA */}
        <div className="mt-20 text-center">
          <div className="mt-4 text-gray-600">Experience the future of assessment evaluation</div>
        </div>
      </div>
    </div>
  );
};

export default HowItWorks;