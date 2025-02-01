import React from 'react';

import { useFetchAllCoursewares } from '../../services/fetchAllCoursewares';
import { File, FileEdit, Trash2, ExternalLink, RefreshCw, AlertCircle } from 'lucide-react';

const CoursewareList = () => {
  const { data, isLoading, isError, error, refetch } = useFetchAllCoursewares();

  const handleEdit = (id) => {
    // Implement edit functionality
    console.log('Edit courseware:', id);
  };

  const handleDelete = (id) => {
    // Implement delete functionality
    console.log('Delete courseware:', id);
  };

  if (isLoading) {
    return (
      <div className="space-y-4 p-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="w-full bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <div className="animate-pulse space-y-4">
              <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
              <div className="flex space-x-3">
                <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-20"></div>
                <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-20"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (isError) {
    return (
      <div className="mx-auto max-w-2xl mt-8 bg-white dark:bg-gray-800 rounded-lg shadow">
        <div className="p-6">
          <div className="flex flex-col items-center text-center space-y-4">
            <AlertCircle className="h-12 w-12 text-red-500" />
            <p className="text-red-500 dark:text-red-400">
              Error fetching coursewares: {error?.message || 'An unknown error occurred'}
            </p>
            <button 
              onClick={() => refetch()} 
              className="px-4 py-2 border border-gray-300 rounded-md flex items-center space-x-2 hover:bg-gray-50 dark:border-gray-600 dark:hover:bg-gray-700"
            >
              <RefreshCw className="h-4 w-4" />
              <span>Retry</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
          All Coursewares
        </h2>
        <button 
          onClick={() => refetch()} 
          className="px-3 py-1.5 border border-gray-300 rounded-md flex items-center space-x-2 hover:bg-gray-50 dark:border-gray-600 dark:hover:bg-gray-700"
        >
          <RefreshCw className="h-4 w-4" />
          <span>Refresh</span>
        </button>
      </div>

      {data?.length > 0 ? (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {data.map((courseware) => (
            <div 
              key={courseware._id} 
              className="bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 p-6"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-3">
                  <File className="h-5 w-5 text-blue-500 mt-1" />
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-gray-100">
                      {courseware.fileName}
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Added: {new Date(courseware.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-2 mt-4">
            
                <button
                  onClick={() => handleEdit(courseware._id)}
                  className="px-3 py-1.5 border border-gray-300 rounded-md flex items-center space-x-1 hover:bg-gray-50 dark:border-gray-600 dark:hover:bg-gray-700 text-sm"
                >
                  <FileEdit className="h-4 w-4" />
                  <span>Edit</span>
                </button>

                <button
                  onClick={() => {
                    if (window.confirm(`Are you sure you want to delete "${courseware.fileName}"?`)) {
                      handleDelete(courseware._id);
                    }
                  }}
                  className="px-3 py-1.5 border border-red-300 rounded-md flex items-center space-x-1 hover:bg-red-50 text-red-500 hover:text-red-600 dark:border-red-700 dark:hover:bg-red-900/20 text-sm"
                >
                  <Trash2 className="h-4 w-4" />
                  <span>Delete</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="mx-auto max-w-md bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <div className="flex flex-col items-center text-center space-y-2">
            <File className="h-12 w-12 text-gray-400" />
            <p className="text-gray-500 dark:text-gray-400">No courseware available</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default CoursewareList;