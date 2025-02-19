import React, { useEffect, useState } from 'react';
import { useAuth } from '../../Context/AuthContext';
import { Hash, Mail, Shield, User, Sparkles } from 'lucide-react';
import SkeletonPage from './SkeletonPage';
import { motion } from 'framer-motion';

const Welcome = () => {
  const { user, logout } = useAuth();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) setLoading(false);
  }, [user]);

  if (loading) {
    return <SkeletonPage />;
  }

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.5, ease: "easeOut" }
    }
  };

  return (
    <div className="h-[calc(100vh-80px)] w-full flex items-center justify-center p-4 sm:p-6 md:p-8 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <motion.div 
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-6 sm:p-8 max-w-2xl w-full mx-auto backdrop-blur-lg border border-gray-200 dark:border-gray-700"
      >
        <motion.div 
          className="text-center mb-8"
          variants={itemVariants}
        >
          <div className="flex justify-center mb-4">
            <div className="p-3 bg-blue-500/10 dark:bg-blue-500/20 rounded-full">
              <Sparkles className="w-8 h-8 sm:w-10 sm:h-10 text-blue-500" />
            </div>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 dark:text-gray-200 mb-2">
            Welcome, {user.name}!
          </h1>
          <p className="text-base sm:text-lg text-gray-600 dark:text-gray-300">
          COL Innov jam
          </p>
        </motion.div>

        <div className="grid gap-4 sm:gap-6 mb-8">
          {[
            { icon: User, label: 'Name', value: user.name, color: 'blue' },
            { icon: Mail, label: 'Email', value: user.email, color: 'green' },
            { icon: Shield, label: 'Role', value: user.role, color: 'purple' }
          ].map((item, index) => (
            <motion.div
              key={item.label}
              variants={itemVariants}
              initial="hidden"
              animate="visible"
              transition={{ delay: index * 0.1 }}
              className="group relative overflow-hidden"
            >
              <div className="flex items-center gap-4 p-4 sm:p-5 bg-gray-50 dark:bg-gray-700/50 rounded-xl 
                            hover:bg-gray-100 dark:hover:bg-gray-600 transition-all duration-300 
                            transform hover:-translate-y-1 hover:shadow-lg">
                <div className={`bg-${item.color}-100 dark:bg-${item.color}-500/20 p-3 rounded-full 
                              transform group-hover:scale-110 transition-transform duration-300`}>
                  <item.icon className={`w-5 h-5 sm:w-6 sm:h-6 text-${item.color}-600 dark:text-${item.color}-400`} />
                </div>
                <div className="flex-1">
                  <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">{item.label}</p>
                  <p className="text-base sm:text-lg font-semibold text-gray-800 dark:text-gray-100 capitalize">
                    {item.value}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div 
          variants={itemVariants}
          className="text-center space-y-2 text-sm sm:text-base text-gray-600 dark:text-gray-400 
                     bg-gray-50 dark:bg-gray-700/50 p-4 sm:p-6 rounded-xl"
        >
          <p className="font-medium">You have full access to the assessment portal.</p>
          <p>Start managing learner assessments and providing feedback.</p>
        </motion.div>

      </motion.div>
    </div>
  );
};

export default Welcome;