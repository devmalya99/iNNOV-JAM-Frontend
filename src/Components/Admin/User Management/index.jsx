import React, { useEffect, useState } from 'react';
import { FetchAllUsers } from '../../../services/FetchAllUsers';
import { motion } from 'framer-motion';
import { 
  Users, UserCog, GraduationCap, ClipboardCheck, 
  RotateCw, Search, Edit2, Trash2, Filter,
  Mail, Calendar, Building
} from 'lucide-react';

const RoleCard = ({ data, title, icon: Icon }) => {
  const [searchTerm, setSearchTerm] = useState('');
  
  const filteredData = data.filter(user => 
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
            {title}
            <span className="ml-2 text-sm text-gray-500">({data.length})</span>
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
                     bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100
                     focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent"
          />
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left">
          <thead className="text-xs text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-700/50">
            <tr>
              <th className="px-4 py-3 font-medium">User</th>
              <th className="px-4 py-3 font-medium hidden md:table-cell">Created</th>
              {/* <th className="px-4 py-3 font-medium text-right">Actions</th> */}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
            {filteredData.map((user, index) => (
              <motion.tr 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                key={user._id}
                className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
              >
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
                      <span className="text-blue-600 dark:text-blue-300 font-medium text-sm">
                        {user.email[0].toUpperCase()}
                      </span>
                    </div>
                    <div className="min-w-0">
                      <div className="truncate text-gray-900 dark:text-gray-100 font-medium">
                        {user.email}
                      </div>
                      <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                        <Building className="w-3 h-3" />
                        <span className="truncate">{user.organisation}</span>
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3 hidden md:table-cell text-gray-500 dark:text-gray-400">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-3 h-3" />
                    {new Date(user.createdAt).toLocaleDateString()}
                  </div>
                </td>

                {/* Actions Table */}
                {/* <td className="px-4 py-3">
                  <div className="flex items-center justify-end gap-2">
                    <button className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors">
                      <Edit2 className="w-4 h-4 text-blue-500 dark:text-blue-400" />
                    </button>
                    <button className="p-1 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors">
                      <Trash2 className="w-4 h-4 text-red-500 dark:text-red-400" />
                    </button>
                  </div>
                </td> */}
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
};

const UserManagement = () => {
  const { data: All_Data = [], refetch } = FetchAllUsers();
  const [adminData, setAdminData] = useState([]);
  const [trainerData, setTrainerData] = useState([]);
  const [assessorData, setAssessorData] = useState([]);
  const [learnerData, setLearnerData] = useState([]);

  useEffect(() => {
    if (All_Data.length > 0) {
      setAdminData(All_Data.filter(user => user.role === 'admin'));
      setTrainerData(All_Data.filter(user => user.role === 'trainer'));
      setAssessorData(All_Data.filter(user => user.role === 'assessor'));
      setLearnerData(All_Data.filter(user => user.role === 'learner'));
    }
  }, [All_Data]);

  const roleConfig = [
    { data: adminData, title: 'Administrators', icon: UserCog },
    { data: trainerData, title: 'Trainers', icon: Users },
    { data: assessorData, title: 'Assessors', icon: ClipboardCheck },
    { data: learnerData, title: 'Learners', icon: GraduationCap },
  ];

  return (
    
    <div className="h-[calc(100vh-70px)] overflow-y-auto bg-gray-100 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto p-4 sm:p-6 space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 
                      sticky top-0 z-10 bg-gray-100/80 dark:bg-gray-900/80 backdrop-blur-sm py-4">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-4"
          >
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
              User Management
            </h1>
            <span className="text-sm text-gray-500 dark:text-gray-400 hidden sm:inline">
              Total Users: {All_Data.length}
            </span>
          </motion.div>
          
          <motion.button
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            onClick={refetch}
            className="flex items-center gap-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 
                     text-white rounded-lg transition-colors text-sm font-medium"
          >
            <RotateCw className="w-4 h-4" />
            Refresh All
          </motion.button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {roleConfig.map((config) => (
            <RoleCard 
              key={config.title}
              {...config}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default UserManagement;