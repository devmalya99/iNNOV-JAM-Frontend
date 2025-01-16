import React from 'react';

const SkeletonPage = () => {
  return (
    <div className="flex h-screen bg-gray-100 dark:bg-gray-900 animate-pulse">
      {/* Sidebar Skeleton */}
      <div className="w-64 bg-gray-200 dark:bg-gray-700 h-full">
        <div className="h-16 bg-gray-300 dark:bg-gray-600"></div>
        <div className="space-y-4 p-4">
          <div className="h-6 bg-gray-300 rounded dark:bg-gray-600"></div>
          <div className="h-6 bg-gray-300 rounded dark:bg-gray-600"></div>
          <div className="h-6 bg-gray-300 rounded dark:bg-gray-600"></div>
          <div className="h-6 bg-gray-300 rounded dark:bg-gray-600"></div>
          <div className="h-6 bg-gray-300 rounded dark:bg-gray-600"></div>
        </div>
      </div>

      {/* Main Content Skeleton */}
      <div className="flex-grow flex flex-col">
        {/* Header Skeleton */}
        <header className="h-16 bg-gray-200 dark:bg-gray-700 shadow-md flex items-center px-4">
          <div className="w-1/4 h-8 bg-gray-300 rounded dark:bg-gray-600"></div>
          <div className="ml-auto flex items-center gap-4">
            <div className="w-20 h-8 bg-gray-300 rounded dark:bg-gray-600"></div>
            <div className="w-20 h-8 bg-gray-300 rounded dark:bg-gray-600"></div>
          </div>
        </header>

        {/* Page Content Skeleton */}
        <main className="flex-grow p-4 space-y-6 overflow-y-auto">
          {/* Main Content Block */}
          <div className="h-40 bg-gray-200 dark:bg-gray-700 rounded-lg"></div>

          {/* Two Sub Content Blocks */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="h-32 bg-gray-200 dark:bg-gray-700 rounded-lg"></div>
            <div className="h-32 bg-gray-200 dark:bg-gray-700 rounded-lg"></div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default SkeletonPage;
