const LearnerWiseSkeleton = () => {
    return (
      <div className="w-full p-4 h-[calc(100vh-80px)] bg-gray-100 dark:bg-gray-900 animate-pulse">
        {/* Header Skeleton */}
        <div className="h-6 bg-gray-300 dark:bg-gray-700 rounded w-3/4 mb-6"></div>
  
        {/* Question Section Skeleton */}
        <div className="bg-gray-300 dark:bg-gray-700 p-4 mb-4 rounded-md h-[80px]"></div>
  
        {/* Popup Modals Skeleton */}
        <div className="flex gap-4 mb-4">
          {/* Suggested Answer Skeleton */}
          <div className="w-1/2 bg-gray-300 dark:bg-gray-700 rounded-lg h-[calc(100vh-410px)]"></div>
  
          {/* Learner Response Skeleton */}
          <div className="w-1/2 bg-gray-300 dark:bg-gray-700 rounded-lg h-[calc(100vh-500px)]"></div>
        </div>
  
        {/* Footer Controls Skeleton */}
        <div className="flex justify-between items-center gap-4">
          {/* AI Grade and Case Study Button */}
          <div className="flex gap-4">
            <div className="h-10 w-24 bg-gray-300 dark:bg-gray-700 rounded"></div>
            <div className="h-10 w-40 bg-gray-300 dark:bg-gray-700 rounded"></div>
          </div>
  
          {/* Pagination Buttons */}
          <div className="flex items-center gap-4">
            <div className="h-12 w-12 bg-gray-300 dark:bg-gray-700 rounded"></div>
            <div className="h-10 w-32 bg-gray-300 dark:bg-gray-700 rounded"></div>
            <div className="h-12 w-12 bg-gray-300 dark:bg-gray-700 rounded"></div>
          </div>
  
          {/* Human Assessor Remark */}
          <div className="w-1/3 h-10 bg-gray-300 dark:bg-gray-700 rounded"></div>
        </div>
      </div>
    );
  };
  
  export default LearnerWiseSkeleton;