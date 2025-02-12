import React, { useEffect } from 'react';
import { FetchAllUsers } from '../../../services/FetchAllUsers';
import { motion } from 'framer-motion';
import {
  Users, UserCog, GraduationCap, ClipboardCheck,
  RotateCw, Search, Edit2, Trash2, Calendar
} from 'lucide-react';

const UserManagement = () => {
  const { data: All_Data, refetch, isLoading, isFetching } = FetchAllUsers();

  // Ensure data reloads when the component mounts
  useEffect(() => {
    refetch();
  }, [refetch]);

  // Role configurations
  const roleConfig = [
    { data: All_Data?.admins, title: 'Administrators', icon: UserCog },
    { data: All_Data?.trainers, title: 'Trainers', icon: Users },
    { data: All_Data?.assessors, title: 'Assessors', icon: ClipboardCheck },
    { data: All_Data?.learners, title: 'Learners', icon: GraduationCap },
  ];

  return (
    <div className="h-[calc(100vh-70px)] overflow-y-auto bg-gray-100 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto p-4 sm:p-6 space-y-6">
        <div className="flex items-center justify-between sticky top-0 z-10 bg-gray-100/80 dark:bg-gray-900/80 backdrop-blur-sm py-4">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
            User Management
          </h1>
          <motion.button
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            onClick={refetch}
            disabled={isFetching}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors text-sm font-medium ${
              isFetching ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600 text-white'
            }`}
          >
            <RotateCw className={`w-4 h-4 ${isFetching ? 'animate-spin' : ''}`} />
            {isFetching ? 'Refreshing...' : 'Refresh'}
          </motion.button>
        </div>

        {/* Show loading indicator while fetching fresh data */}
        {isLoading || isFetching ? (
          <div className="flex justify-center py-10">
            <span className="text-gray-500">Loading...</span>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {roleConfig.map(({ data, title, icon }) => (
              <RoleCard key={title} data={data} title={title} icon={icon} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default UserManagement;
