import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Check, RefreshCcwIcon, Users, X } from "lucide-react";
import { FetchUsersByRole } from "../../../services/fetchUsersByRole";
import useCourseStore from "../../../Zustand/useCourseStore";

const AssignLearnersModal = () => {
  // State to track whether all learners are selected
  const [isAllSelected, setIsAllSelected] = useState(false);

  // Fetch learners' data using a custom hook
  const { data: LearnersData = [], isLoading, refetch } = FetchUsersByRole("learner");

  // Zustand store for managing modal and selected learners
  const {
    selectedLearners,
    setSelectedLearners,
    isOpenAssignModal,
    setOpenAssignModal,
  } = useCourseStore();

  // Fetch latest learners' data when the component mounts
  useEffect(() => {
    refetch();
  }, [refetch]);

  // Function to handle "Select All" functionality
  const handleSelectAll = () => {
    if (isAllSelected) {
      setSelectedLearners([]); // Unselect all learners 
    } else {
      setSelectedLearners(LearnersData?.map((learner) => learner.email) || []); // Select all learners
    }
    setIsAllSelected(!isAllSelected);
  };

  // Function to handle individual learner selection
  const handleSelect = (email) => {
    if (selectedLearners.includes(email)) {
      // If already selected, remove from selection
      setSelectedLearners(selectedLearners.filter((item) => item !== email));
      setIsAllSelected(false); // Deselect "Select All" checkbox
    } else {
      // Otherwise, add to the selection
      const newSelected = [...selectedLearners, email];
      setSelectedLearners(newSelected);
      setIsAllSelected(newSelected.length === LearnersData?.length); // Check if all learners are selected
    }
  };

  return (
    <>
      {/* Render modal only if it is open */}
      {isOpenAssignModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-50">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-white dark:bg-gray-800 p-8 rounded-xl w-[32rem] shadow-xl mx-4"
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-semibold dark:text-white flex items-center gap-2">
                <Users size={24} />
                Assign Learners
              </h2>

              {/* Refresh Button */}
              <button
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
                onClick={() => refetch()}
              >
                <RefreshCcwIcon size={24} />
              </button>

              {/* Close Modal Button */}
              <button
                onClick={() => setOpenAssignModal(false)}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
              >
                <X className="w-5 h-5 dark:text-gray-400" />
              </button>
            </div>

            {/* Select All Checkbox */}
            <div className="mb-4">
              <label className="flex items-center gap-2 py-2 px-4 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg cursor-pointer">
                <input
                  type="checkbox"
                  checked={isAllSelected}
                  onChange={handleSelectAll}
                  className="w-4 h-4 rounded border-gray-300 text-blue-500 focus:ring-blue-500"
                />
                <span className="text-sm font-medium dark:text-white">
                  Select All Learners
                </span>
              </label>
            </div>

            {/* Learners List */}
            <div className="h-[24rem] overflow-y-auto pr-2">
              {isLoading ? (
                // Display skeleton loaders while data is loading
                <div className="space-y-3">
                  {Array.from({ length: 5 }).map((_, index) => (
                    <div key={index} className="h-16 bg-gray-300 dark:bg-gray-700 rounded-lg animate-pulse" />
                  ))}
                </div>
              ) : (
                // Display learners list
                <motion.ul className="space-y-3">
                  {LearnersData?.map((learner, index) => (
                    <motion.li
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      key={learner.email}
                      className={`p-4 border dark:border-gray-700 rounded-xl transition-colors ${
                        selectedLearners.includes(learner.email)
                          ? "bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800"
                          : "hover:bg-gray-50 dark:hover:bg-gray-700"
                      }`}
                    >
                      <label className="flex items-start gap-3 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={selectedLearners.includes(learner.email)}
                          onChange={() => handleSelect(learner.email)}
                          className="w-4 h-4 mt-1 rounded border-gray-300 text-blue-500 focus:ring-blue-500"
                        />
                        <div>
                          <p className="font-medium dark:text-white">{learner?.name}</p>
                          <p className="text-sm text-gray-500 dark:text-gray-400">{learner?.email}</p>
                          <p className="text-sm text-gray-600 dark:text-gray-400">Course: {learner?.course}</p>
                        </div>
                      </label>
                    </motion.li>
                  ))}
                </motion.ul>
              )}
            </div>

            {/* Modal Footer - Action Buttons */}
            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={() => setOpenAssignModal(false)}
                className="px-4 py-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => setOpenAssignModal(false)}
                className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg flex items-center gap-2 transition-colors"
              >
                <Check size={20} />
                Assign Selected
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </>
  );
};

export default AssignLearnersModal;
