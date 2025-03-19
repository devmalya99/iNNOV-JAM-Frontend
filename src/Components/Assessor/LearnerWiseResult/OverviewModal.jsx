import React from 'react';

const OverviewModal = ({ onClose, data, setActiveNumber }) => {
  const { student_name, assessment, studentResponses } = data;
  console.log(data)
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-md overflow-hidden flex flex-col">
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
          <h2 className="text-xl font-bold">Assessment Overview</h2>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        {/* Student Info */}
        <div className="px-6 py-3 bg-gray-50 border-b border-gray-200">
          <p className="text-gray-700">Student: <span className="font-medium">{student_name}</span></p>
        </div>
        
        {/* Questions Grid */}
        <div className="p-6">
          <div className="flex items-center justify-center gap-6 flex-wrap">
            {studentResponses.map((response,index) => (
              <div 
              key={response.question_id} 
              className="flex flex-col items-center"
              onClick={()=>{
                setActiveNumber(index)
                onClose()
              }}
              >
                <div 
                  className={`w-16 h-16 rounded-full flex items-center justify-center text-white text-xl font-bold ${
                    response.status === "competent" ? "bg-green-500" : "bg-red-500"
                  }`}
                >
                  {response.question_number}
                </div>
                <span className="mt-2 text-sm font-medium">
                  {response.status === "competent" ? "Competent" : "Not Competent"}
                </span>
              </div>
            ))}
          </div>
        </div>
        
        {/* Legend */}
        <div className="px-6 py-3 border-t border-gray-200 bg-gray-50 flex justify-center gap-8">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full bg-green-500"></div>
            <span className="text-sm">Competent</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full bg-red-500"></div>
            <span className="text-sm">Not Competent</span>
          </div>
        </div>
        
        {/* Footer */}
        <div className="px-6 py-4 border-t border-gray-200 flex justify-end">
          <button 
            onClick={onClose}
            className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium py-2 px-4 rounded-md"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default OverviewModal;