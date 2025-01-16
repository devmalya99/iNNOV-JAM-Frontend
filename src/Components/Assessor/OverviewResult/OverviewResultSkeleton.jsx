import React from 'react';


const OverviewResultSkeleton = () => {
  return (
    <div className="w-full max-w-4xl mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-lg ">
      {/* Header */}
      <div className="p-4 border-b border-gray-200 dark:border-gray-700">
        <div className="h-8 w-48 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
      </div>

      {/* Content */}
      <div className="p-6 space-y-6">
        {/* Generate 3 skeleton items */}
        {[1, 2, 3].map((item) => (
          <div key={item} className="p-4 space-y-4">
            <div className="flex items-center space-x-4">
              {/* Question Number */}
              <div className="h-6 w-16 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
              
              {/* Question Text */}
              <div className="flex-1">
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse w-3/4" />
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse w-1/2 mt-2" />
              </div>
            </div>

            {/* Score Section */}
            <div className="flex justify-between items-center mt-4">
              <div className="h-6 w-24 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
              <div className="h-6 w-16 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="p-4 border-t border-gray-200 dark:border-gray-700 flex justify-end">
        <div className="h-10 w-24 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
      </div>
    </div>
  );
};

export default OverviewResultSkeleton;