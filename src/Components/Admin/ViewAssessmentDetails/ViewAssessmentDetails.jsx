import React from "react";
import { FaClipboardList } from "react-icons/fa";
import { IoMdBook } from "react-icons/io";
import { motion } from "framer-motion";
import {FetchAssessmentsDetails} from "../../../services/FetchAssessmentDetails";

const ViewAssessmentDetails = ({ assessmentId, setOpenAssessmentModal }) => {
  const { data: AssessmentDetails, isLoading, error } = FetchAssessmentsDetails(assessmentId);

  console.log("AssessmentDetails", AssessmentDetails);

  if (isLoading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-50">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-xl">
          <p className="text-lg text-blue-900 dark:text-blue-300">Loading assessment details...</p>
        </div>
      </div>
    );
  }

  if (error || !AssessmentDetails) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-50">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-xl">
          <p className="text-lg text-red-600 dark:text-red-400">Failed to load assessment details.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-50">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-white dark:bg-gray-800 h-screen overflow-y-auto p-8 rounded-xl w-[60rem] shadow-xl mx-4 relative"
      >
        <button
          onClick={() => setOpenAssessmentModal(false)}
          className="absolute top-3 right-3 text-red-500 dark:text-red-400 text-4xl font-bold"
        >
          ×
        </button>
        <h2 className="text-2xl font-bold text-blue-900 dark:text-blue-300 flex items-center gap-2">
          <FaClipboardList /> {AssessmentDetails?.assessment_name}
        </h2>
        <p className="text-lg text-gray-700 dark:text-gray-300">
          Course: <span className="font-semibold">{AssessmentDetails?.course_name}</span>
        </p>
        <p className="text-md text-gray-600 dark:text-gray-400 italic">
          Assessment Type: {AssessmentDetails?.assessment_type?.replace("_", " ")}
        </p>

        {AssessmentDetails?.case_study_context && (
          <p className="mt-4 p-3 bg-gray-200 dark:bg-gray-600 text-gray-800 dark:text-gray-300 rounded-lg">
            <IoMdBook className="inline mr-2" /> <span className="font-semibold">Case Study Context:</span>{" "}
            {AssessmentDetails?.case_study_context}
          </p>
        )}

        <div className="mt-6 space-y-6">
          {AssessmentDetails?.map((question) => (
            <div
              key={question?._id}
              className="p-4 border-l-4 border-blue-500 bg-white dark:bg-gray-800 shadow-md rounded-lg"
            >
              <h3 className="text-lg font-semibold text-blue-800 dark:text-blue-400">
                {question?.question_number}: {question?.question}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 italic text-lg font-bold">
                {question?.question_instruction}
              </p>
              <h4 className="mt-2 font-semibold text-blue-700 dark:text-blue-300">Suggested Answers:</h4>
              <ul className="list-disc pl-6 mt-2 space-y-2 text-gray-700 dark:text-gray-300">
                {question?.suggested_answer?.map((answer, i) => (
                  <li key={i} className="bg-blue-100 dark:bg-blue-900 p-2 rounded-lg">
                    {answer}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default ViewAssessmentDetails;
