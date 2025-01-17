import React from 'react';
import { Construction } from 'lucide-react';

const UnderDevelopment = ({ content, title = "This feature is currently Under Development"}) => {
  return (
    <div className="relative w-full min-h-[200px] overflow-hidden rounded-lg  ">
      {/* Background blur effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-100 to-gray-200 blur-lg opacity-70" />
      
      {/* Content container */}
      <div className="relative z-10 p-6 flex flex-col items-center justify-center w-full h-full backdrop-blur-sm bg-white/30">
        {/* Icon and title */}
        <div className="flex items-center gap-3 mb-4 animate-pulse">
          <Construction className="w-6 h-6 text-red-500 animate-bounce" />
          <h2 className="text-2xl font-semibold bg-gradient-to-br from-red-500 to-blue-600 bg-clip-text text-transparent ">{title}</h2>
        </div>
        
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-32 h-32 bg-yellow-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob" />
        <div className="absolute bottom-0 right-0 w-32 h-32 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000" />
        
        {/* Content area */}
        <div className="text-center max-w-2xl mx-auto space-y-4">
          {content}
        </div>
      </div>
    </div>
  );
};

// Add animation keyframes
const style = document.createElement('style');
style.textContent = `
  @keyframes blob {
    0% { transform: translate(0px, 0px) scale(1); }
    33% { transform: translate(30px, -50px) scale(1.1); }
    66% { transform: translate(-20px, 20px) scale(0.9); }
    100% { transform: translate(0px, 0px) scale(1); }
  }
`;
document.head.appendChild(style);


export default UnderDevelopment;