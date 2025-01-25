import React from 'react';
import { Construction } from 'lucide-react';

const UnderDevelopment = ({ content, title = "This feature is currently Under Development"}) => {
  return (
    <div>Under developemnt</div>
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