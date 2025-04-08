const AssessmentCreationGuide = () => {
    return (
      <div className="max-w-6xl  mx-4 p-6  bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700">
        <h1 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-6">Assessment Creation Flow</h1>
        
        {/* Progress Stepper */}
        <div className="flex items-center justify-between mb-8 relative">
          {/* Line */}
          <div className="absolute top-5 left-10 right-10 h-1 bg-gray-200 dark:bg-gray-600 z-0"></div>
          
          {/* Steps */}
          {[
            { title: 'Upload', icon: '📤', description: 'Upload assessment file' },
            { title: 'Create', icon: '✏️', description: 'Configure settings' },
            { title: 'Manage', icon: '⚙️', description: 'Review & publish' },
          ].map((step, index) => (
            <div key={index} className="flex flex-col items-center z-10">
              <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-lg mb-2">
                {step.icon}
              </div>
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{step.title}</span>
              <span className="text-xs text-gray-500 dark:text-gray-400 mt-1">{step.description}</span>
            </div>
          ))}
        </div>
  
        
  
        <div className="mt-8 pt-4 border-t border-gray-100 dark:border-gray-700 text-sm text-gray-500 dark:text-gray-400">
          <p>Follow these steps to successfully create and publish your assessment.</p>
        </div>
      </div>
    );
  };
  
  export default AssessmentCreationGuide;