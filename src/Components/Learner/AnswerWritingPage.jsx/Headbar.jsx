import React from 'react';

const Headbar = () => {
  return (
    <div className="bg-blue-100 p-2 rounded-lg shadow-md text-sm">
      {/* User Info */}
      <div className="mb-4">
        <h2 className="text-lg font-bold text-gray-700 mb-2">Username</h2>
      </div>

      {/* Status Boxes */}
      <div className="flex flex-col space-y-2">
        <div className="flex justify-between items-center px-4 py-2 bg-green-500 text-white rounded-md shadow">
          <p className="font-medium">Answered</p>
          <p className="font-bold">1</p>
        </div>
        
        </div>
        <div className="flex justify-between items-center px-4 py-2 bg-red-500 text-white rounded-md shadow">
          <p className="font-medium">Not Answered</p>
          <p className="font-bold">0</p>
        </div>
        
      </div>
    
  );
};

export default Headbar;
