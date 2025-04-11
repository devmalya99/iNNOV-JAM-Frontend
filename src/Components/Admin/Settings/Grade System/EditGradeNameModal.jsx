import { useState, useEffect, useRef } from 'react';

const EditGradeNameModal = ({ 
    isOpen, 
    onClose, 
    gradeName, 
    setGradeName,
    onUpdate ,
    editGrade

}) => {
  
 
    const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await onUpdate()
    onClose();
    
   
  };

  if (!isOpen) return null;

  return (

    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
    {/* Backdrop */}
    <div 
      className="absolute inset-0 bg-black bg-opacity-75 transition-opacity"
      onClick={onClose}
    />
    
    {/* Modal Container */}
    <div className="relative w-full max-w-md mx-auto">
      {/* Modal Content */}
      <div className="bg-white rounded-lg shadow-xl overflow-hidden">
        {/* Header */}
        <div className="bg-indigo-600 px-6 py-4">
          <h2 className="text-xl font-semibold text-white">
            Edit Grade Name
          </h2>
        </div>
        
        {/* Body */}
        <div className="p-6">
          <form onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div>
                <label 
                  htmlFor="grade-name-input"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Grade Name
                </label>
                <input
                  
                  id="grade-name-input"
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm 
                    focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500
                    transition duration-150"
                  value={gradeName}
                  onChange={(e) => setGradeName(e.target.value)}
                  placeholder="Enter grade name"
                  required
                />
              </div>
            </div>
          </form>
        </div>
        
        {/* Footer */}
        <div className="bg-gray-50 px-6 py-4 flex justify-end space-x-3">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium 
              text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 
              focus:ring-offset-2 focus:ring-indigo-500 transition duration-150"
            disabled={isSubmitting}
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSubmit}
            disabled={!gradeName.trim() || isSubmitting}
            className={`px-4 py-2 rounded-md shadow-sm text-sm font-medium text-white 
              ${!gradeName.trim() || isSubmitting
                ? 'bg-indigo-400 cursor-not-allowed'
                : 'bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
              } transition duration-150`}
          >
            {isSubmitting ? (
              <span className="flex items-center">
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Saving...
              </span>
            ) : 'Save Changes'}
          </button>
        </div>
      </div>
    </div>
  </div>
  );
};

export default EditGradeNameModal;