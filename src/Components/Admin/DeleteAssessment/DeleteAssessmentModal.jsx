import { useState } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { X, AlertTriangle, Loader2, CheckCircle } from "lucide-react";
import { handleSuccess, handleError } from "../../../utils/toast";
import { useQueryClient } from "react-query";

const VITE_API_URL = import.meta.env.VITE_API_URL;

const DeleteAssessmentModal = ({ assessment, setShowDeleteModal, onDeleteSuccess }) => {
  
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  

  const handleDelete = async (assessment) => {
    setIsDeleting(true);
    setError(null);

    try {
      const response = await axios.delete(`${VITE_API_URL}/api/assessments/removeassessment/${assessment?._id}`);
      console.log("delete response", response);
      setSuccess(true);
      handleSuccess({ success: "Assessment deleted successfully!" });
      onDeleteSuccess?.();
      
      // Close modal after a short delay
      setTimeout(() => {
        setShowDeleteModal(false);
      }, 2000);
    } catch (error) {

      console.log("error is ",error)
      setError(error?.response?.data?.message);
      handleError({ errors:error?.response?.data?.message });
    } finally {
      setIsDeleting(false);
    }
  };

  return (

    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/60 backdrop-blur-sm flex justify-center items-center z-50 p-4"
      >
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          className="bg-white dark:bg-gray-800 rounded-2xl w-full max-w-lg overflow-hidden shadow-xl"
        >
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b dark:border-gray-700">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-red-50 dark:bg-red-900/30 rounded-lg">
                <AlertTriangle className="h-6 w-6 text-red-500 dark:text-red-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                Delete Assessment
              </h3>
            </div>
            <button
              onClick={() => setShowDeleteModal(false)}
              className="p-2 text-gray-400 hover:text-gray-500 dark:text-gray-500 dark:hover:text-gray-400 
                       rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Content */}
          <div className="p-6">
            <AnimatePresence mode="wait">
              {!success && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="text-gray-600 dark:text-gray-300"
                >
                  <p>Are you sure you want to delete this assessment?</p>
                  <p className="mt-2 font-medium">{assessment?.assessment_name}</p>
                  <p className="mt-4 text-sm text-gray-500 dark:text-gray-400">
                    This action cannot be undone. All associated data will be permanently removed.
                  </p>
                </motion.div>
              )}

              {isDeleting && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="flex flex-col items-center py-4"
                >
                  <Loader2 className="h-8 w-8 text-red-500 animate-spin" />
                  <p className="mt-2 text-gray-600 dark:text-gray-300">Deleting assessment...</p>
                </motion.div>
              )}

              {error && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="mt-4 p-4 bg-red-50 dark:bg-red-900/30 rounded-lg"
                >
                  <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
                </motion.div>
              )}

              {success && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="flex flex-col items-center py-4"
                >
                  <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-full">
                    <CheckCircle className="h-8 w-8 text-green-500 dark:text-green-400" />
                  </div>
                  <p className="mt-2 text-gray-600 dark:text-gray-300">Assessment deleted successfully!</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Footer */}
          {!success && (
            <div className="flex items-center justify-end gap-3 px-6 py-4 bg-gray-50 dark:bg-gray-800/50 border-t dark:border-gray-700">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setShowDeleteModal(false)}
                className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 
                         bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 
                         rounded-lg hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors"
                disabled={isDeleting}
              >
                Cancel
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleDelete(assessment)}
                disabled={isDeleting}
                className="px-4 py-2 text-sm font-medium text-white bg-red-500 
                         hover:bg-red-600 rounded-lg transition-colors disabled:bg-gray-400 
                         disabled:cursor-not-allowed"
              >
                {isDeleting ? "Deleting..." : "Delete Assessment"}
              </motion.button>
            </div>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
    
  );
};

export default DeleteAssessmentModal;