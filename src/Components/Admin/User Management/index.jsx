import React, { useEffect } from 'react';
import { useUsersByRole } from '../../../services/fetchUsersByRole';
import { Users, UserCog, GraduationCap, ClipboardCheck, Trash2, PencilLine, RotateCw } from 'lucide-react';
import { motion } from 'framer-motion';

// Skeleton Loading Component
const Skeleton = () => (
  <div className="space-y-3 p-1">
    {[1, 2, 3].map((i) => (
      <div key={i} className="animate-pulse flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-md">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gray-200 dark:bg-gray-600 rounded-full flex-shrink-0" />
          <div className="space-y-2 min-w-0 flex-1">
            <div className="h-4 w-32 bg-gray-200 dark:bg-gray-600 rounded" />
            <div className="h-3 w-48 bg-gray-200 dark:bg-gray-600 rounded" />
          </div>
        </div>
        <div className="flex gap-2 flex-shrink-0">
          <div className="w-8 h-8 bg-gray-200 dark:bg-gray-600 rounded-full" />
          <div className="w-8 h-8 bg-gray-200 dark:bg-gray-600 rounded-full" />
        </div>
      </div>
    ))}
  </div>
);

// Loading Spinner
const LoadingSpinner = () => (
  <div className="flex justify-center items-center h-32">
    <div className="relative w-16 h-16">
      <div className="absolute top-0 left-0 w-full h-full border-4 border-blue-200 dark:border-blue-900 rounded-full"></div>
      <div className="absolute top-0 left-0 w-full h-full border-4 border-blue-500 dark:border-blue-400 rounded-full border-t-transparent animate-spin"></div>
    </div>
  </div>
);

// Render Table Function
const renderTable = (data, role, refetch) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white dark:bg-gray-800 rounded-lg shadow-lg flex flex-col h-[600px] max-h-[calc(100vh-12rem)]"
    >
      <div className="p-6 border-b border-gray-200 dark:border-gray-700 flex-shrink-0">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-3">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold capitalize text-gray-800 dark:text-gray-200">
              {role}s
            </h2>
            <span className="text-sm sm:text-base text-gray-500 dark:text-gray-400">
              ({data?.length ?? 0})
            </span>
          </div>
          <button 
            onClick={() => refetch()}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
          >
            <RotateCw className="w-5 h-5 text-gray-600 dark:text-gray-300" />
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-600">
        <div className="p-6">
          {data === undefined ? (
            <LoadingSpinner />
          ) : (
            <motion.div className="space-y-4">
              {data?.map((user) => (
                <motion.div 
                  key={user._id}
                  className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-md hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors gap-4"
                >
                  <div className="flex items-center gap-3 min-w-0 flex-1">
                    <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-blue-600 dark:text-blue-300 font-medium">
                        {user.email.charAt(0).toUpperCase()}
                      </span>
                    </div>
                    <div className="min-w-0 flex-1">
                      <h3 className="font-medium text-gray-800 dark:text-gray-200 truncate">
                        {user.email}
                      </h3>
                      <div className="flex flex-wrap gap-2 text-sm text-gray-500 dark:text-gray-400">
                        <span className="truncate">{user.organisation}</span>
                        <span className="hidden sm:inline">•</span>
                        <span>{new Date(user.createdAt).toLocaleDateString()}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 w-full sm:w-auto justify-between sm:justify-end">
                    <div className="text-sm text-gray-500 dark:text-gray-400 flex gap-4">
                      <div>Courses: {user.assignedCourses?.length ?? 0}</div>
                      <div>Assessments: {user.assignedAssessments?.length ?? 0}</div>
                    </div>
                    <div className="flex gap-2 flex-shrink-0">
                      <button className="p-2 hover:bg-gray-200 dark:hover:bg-gray-500 rounded-full transition-colors">
                        <PencilLine className="w-4 h-4 text-gray-600 dark:text-gray-300" />
                      </button>
                      <button className="p-2 hover:bg-red-100 dark:hover:bg-red-900 rounded-full transition-colors">
                        <Trash2 className="w-4 h-4 text-red-500 dark:text-red-400" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

// Main UserManagement Component
const UserManagement = () => {
  // Fetching data for each role
  const { data: adminData, refetch: refetchAdmin } = useUsersByRole('admin');
  const { data: trainerData, refetch: refetchTrainer } = useUsersByRole('trainer');
  const { data: learnerData, refetch: refetchLearner } = useUsersByRole('learner');
  const { data: assessorData, refetch: refetchAssessor } = useUsersByRole('assessor');

  useEffect(() => {
    
  },[])
  
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 overflow-y-auto">
      <div className="max-w-7xl mx-auto p-4 sm:p-6 space-y-6">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="sticky top-0 z-10 bg-gray-100/80 dark:bg-gray-900/80 backdrop-blur-sm py-4"
        >
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
            User Management
          </h1>
        </motion.div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {renderTable(adminData, 'Admin', refetchAdmin)}
          {renderTable(trainerData, 'Trainer', refetchTrainer)}
          {renderTable(learnerData, 'Learner', refetchLearner)}
          {renderTable(assessorData, 'Assessor', refetchAssessor)}
        </div>
      </div>
    </div>
  );
};

export default UserManagement;
