import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaExclamationTriangle, FaTimes, FaEye } from "react-icons/fa";

const GoLiveConfirmationModal = ({
  isOpen,
  onClose,
  onConfirm,
  assessment,
}) => {
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
              damping: 30,
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
                className="mx-auto w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center"
              >
                <FaEye className="w-8 h-8 text-blue-600 dark:text-blue-400" />
              </motion.div>

              {/* Title */}
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="space-y-2"
              >
                <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                  Go Live with Assessment
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Are you sure you want to make this assessment live? Before you
                  go live please review this assessment details.
                </p>
              </motion.div>

              {/* Assessment Details */}
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
                className=" p-4 rounded-lg"
              >
                <div className="flex items-start bg-blue-50 dark:bg-blue-900/20 p-2">
                  <p className="ml-3 mb-2 text-sm text-blue-600 dark:text-blue-400 text-left">
                    You are about to publish the assessment titled{" "}
                    <strong>{assessment?.assessment_name}</strong>. Once live,
                    this assessment will be visible and accessible to all
                    learners. 
                  </p>

                  
                </div>

                <div className="flex mt-2 items-start bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
  <div className="ml-3 text-sm text-blue-600 dark:text-blue-400 text-left space-y-3">
    <p className="font-medium">
      Please note these restrictions will apply after publishing:
    </p>
    
    <div className="bg-red-100 dark:bg-red-900/20 rounded-lg p-3 text-red-800 dark:text-red-200">
      <p className="font-semibold flex items-center gap-2">
        <span>❌</span> Restricted actions:
      </p>
      <ul className="list-disc pl-5 mt-1 space-y-1">
        <li>Delete this assessment</li>
        <li>Remove learners from this assessment</li>
        <li>Modify temperature settings for questions</li>
      </ul>
    </div>

    <div className="bg-green-100 dark:bg-green-900/20 rounded-lg p-3 text-green-800 dark:text-green-200">
      <p className="font-semibold flex items-center gap-2">
        <span>✅</span> Allowed actions:
      </p>
      <ul className="list-disc pl-5 mt-1 space-y-1">
        <li>Add new users to this assessment</li>
      </ul>
    </div>
  </div>
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
                  onClick={() => onConfirm(assessment)}
                  className="group flex items-center justify-center gap-2 px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors duration-200 font-medium"
                >
                  <FaEye className="w-4 h-4 group-hover:animate-bounce" />
                  Go Live
                </button>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </AnimatePresence>
  );
};

export default GoLiveConfirmationModal;
