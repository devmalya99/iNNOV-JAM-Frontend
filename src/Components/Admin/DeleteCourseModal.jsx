import React from 'react';
import { motion, AnimatePresence } from "framer-motion";
import { FaExclamationTriangle, FaTrash, FaTimes, FaShieldAlt } from "react-icons/fa";

const DeleteConfirmationModal = ({ isOpen, onClose, onConfirm, itemName = "course" }) => {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-y-auto">
        <div className="flex min-h-screen items-center justify-center p-4 text-center">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm"
          />

          {/* Modal */}
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ 
              type: "spring",
              stiffness: 300,
              damping: 30 
            }}
            className="relative w-full max-w-md overflow-hidden rounded-2xl bg-white dark:bg-gray-800 p-6 shadow-2xl"
          >
            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute right-4 top-4 rounded-full p-2 text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            >
              <FaTimes className="w-5 h-5" />
            </button>

            {/* Content */}
            <div className="space-y-6">
              {/* Warning Icon */}
              <motion.div
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.1 }}
                className="mx-auto w-16 h-16 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center"
              >
                <FaExclamationTriangle className="w-8 h-8 text-red-600 dark:text-red-400" />
              </motion.div>

              {/* Title */}
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="space-y-2"
              >
                <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                  Delete {itemName}
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  This action cannot be undone
                </p>
              </motion.div>

              {/* Warning Message */}
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="bg-red-50 dark:bg-red-900/20 p-4 rounded-lg"
              >
                <div className="flex items-start">
                  <FaShieldAlt className="w-5 h-5 text-red-600 dark:text-red-400 mt-0.5" />
                  <p className="ml-3 text-sm text-red-600 dark:text-red-400 text-left">
                    Are you sure you want to delete this {itemName}? All associated data will be permanently removed. This action cannot be reversed.
                  </p>
                </div>
              </motion.div>

              {/* Buttons */}
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="grid grid-cols-2 gap-4 mt-8"
              >
                <button
                  onClick={onClose}
                  className="flex items-center justify-center gap-2 px-4 py-3 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-200 font-medium"
                >
                  <FaTimes className="w-4 h-4" />
                  Cancel
                </button>
                <button
                  onClick={onConfirm}
                  className="group flex items-center justify-center gap-2 px-4 py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors duration-200 font-medium"
                >
                  <FaTrash className="w-4 h-4 group-hover:animate-bounce" />
                  Delete
                </button>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </AnimatePresence>
  );
};

export default DeleteConfirmationModal;