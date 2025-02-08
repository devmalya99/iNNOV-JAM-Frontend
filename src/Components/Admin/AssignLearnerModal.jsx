import React from "react";
import { motion } from "framer-motion";
import { FaTimes, FaUser } from "react-icons/fa";
import { useParams } from "react-router";
import axios from "axios";
import { FetchAllLearnersByCourse } from "../../services/FetchLearnersByCourse";

const AssignLearnerModal = ({ selectedAssessmentId, setOpenAssignLearnersModal } ) => {
  const { courseid } = useParams();
  const { data: users, isLoading } = FetchAllLearnersByCourse(courseid);

  const VITE_API_URL = import.meta.env.VITE_API_URL;

  console.log("users", users);

  // Function to assign learners
  const handleAssignLearnersFinal = async () => {
    try {
      const apiUrl = `${VITE_API_URL}/api/assigned-assessments/assignassessment?assessmentId=${selectedAssessmentId}`;
      const response = await axios.post(apiUrl,courseid);

      if (response.status === 200) {
        alert("Learners successfully assigned!"); // Show success message
        setOpenAssignLearnersModal(false); // Close modal
      } else {
        alert("Failed to assign learners. Please try again.");
      }
    } catch (error) {
      console.error("Error assigning learners:", error);
      alert("An error occurred while assigning learners.");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg w-[90%] max-w-lg"
      >
        {/* Modal Header */}
        <div className="flex justify-between items-center border-b pb-3">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
            Assigned Users for Assessment
          </h2>
          <button onClick={() => setOpenAssignLearnersModal(false)} className="text-gray-500 hover:text-red-600">
            <FaTimes size={20} />
          </button>
        </div>

        {/* Modal Content */}
        <div className="mt-4">
          {isLoading ? (
            <p className="text-center text-gray-500 dark:text-gray-400">Loading users...</p>
          ) : users?.length > 0 ? (
            <ul className="space-y-3">
              {users.map((user) => (
                <li key={user._id} className="flex flex-col p-3 bg-gray-100 dark:bg-gray-700 rounded-lg">
                  <div className="flex items-center gap-3">
                    <FaUser className="text-blue-500 dark:text-blue-300" />
                    <span className="text-gray-800 dark:text-gray-200 font-semibold">{user?.name}</span>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{user?.email}</p>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-center text-gray-500 dark:text-gray-400">No users assigned.</p>
          )}
        </div>

        {/* Buttons */}
        <div className="mt-4 text-right">
          <button
            onClick={handleAssignLearnersFinal}
            className="px-4 mx-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
          >
            Assign Learners
          </button>
          <button
            onClick={() => setOpenAssignLearnersModal(false)}
            className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
          >
            Close
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default AssignLearnerModal;
