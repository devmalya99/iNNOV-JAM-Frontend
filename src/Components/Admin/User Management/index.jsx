import React, { useEffect, useState } from 'react';
import { FetchAllUsers } from '../../../services/FetchAllUsers';
import { motion } from 'framer-motion';
import {
  Users, UserCog, GraduationCap, ClipboardCheck,
  RotateCw, Search, Edit2, Trash2, Calendar
} from 'lucide-react';

const RoleCard = ({ data = [], title, icon: Icon }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredData = data?.filter(user => 
    user?.email?.toLowerCase()?.includes(searchTerm.toLowerCase())
  ) || [];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden"
    >
      <div className="p-4 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center gap-3 mb-4">
          <Icon className="w-5 h-5 text-blue-500" />
          <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
            {title} <span className="ml-2 text-sm text-gray-500">({data?.length || 0})</span>
          </h2>
        </div>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search users..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-sm border border-gray-200 dark:border-gray-700 rounded-lg 
                     bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
          />
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left">
          <thead className="text-xs text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-700/50">
            <tr>
              <th className="px-4 py-3 font-medium">User</th>
              <th className="px-4 py-3 font-medium hidden md:table-cell">Created</th>
              <th className="px-4 py-3 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
            {filteredData.length > 0 ? filteredData.map((user, index) => (
              <motion.tr 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                key={user?._id}
                className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
              >
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
                      <span className="text-blue-600 dark:text-blue-300 font-medium text-sm">
                        {user?.email?.[0]?.toUpperCase() || '?'}
                      </span>
                    </div>
                    <div className="min-w-0">
                      <div className="truncate text-gray-900 dark:text-gray-100 font-medium">
                        {user?.email || 'Unknown'}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3 hidden md:table-cell text-gray-500 dark:text-gray-400">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-3 h-3" />
                    {user?.createdAt ? new Date(user?.createdAt).toLocaleDateString() : 'N/A'}
                  </div>
                </td>
                <td className="px-4 py-3 text-right flex items-center justify-end gap-2">
                  <button className="p-2 text-blue-500 hover:text-blue-700">
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button className="p-2 text-red-500 hover:text-red-700">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </td>
              </motion.tr>
            )) : (
              <tr>
                <td colSpan="3" className="text-center py-4 text-gray-500">No users found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
};

const UserManagement = () => {
  const { data: All_Data, refetch, isLoading } = FetchAllUsers();

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
            className="flex items-center gap-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors text-sm font-medium"
          >
            <RotateCw className="w-4 h-4" />
            Refresh
          </motion.button>
        </div>
        {isLoading ? (
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