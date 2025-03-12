import React from "react";
import { Link, useNavigate, useParams } from "react-router";
import { FetchAssessmentInstructions } from "../../services/Learners/FetchAssessmentInstructions";
import {
  FaSpinner,
  FaExclamationCircle,
  FaArrowLeft,
  FaCheckCircle,
  FaClock,
  FaFileAlt,
} from "react-icons/fa";

const InstructionsPage = () => {
  const navigate = useNavigate();
  const { assessmentId } = useParams();
  const { data, refetch, error, isLoading, isError } =
    FetchAssessmentInstructions(assessmentId);

  if (isLoading) {
    return (
      <div className="fixed inset-0 bg-gray-900/50 backdrop-blur-sm flex items-center justify-center">
        <div className="bg-white dark:bg-gray-800 rounded-xl p-8 text-center">
          <FaSpinner className="animate-spin text-3xl text-blue-500 mx-auto mb-4" />
          <p className="text-gray-600 dark:text-gray-300">
            Loading instructions...
          </p>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="fixed inset-0 bg-gray-900/50 backdrop-blur-sm flex items-center justify-center">
        <div className="bg-white dark:bg-gray-800 rounded-xl p-8 text-center max-w-md">
          <FaExclamationCircle className="text-3xl text-red-500 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
            Error Loading Instructions
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            {error?.message || "Failed to load assessment instructions"}
          </p>
          <button
            onClick={() => refetch()}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-gray-900/50 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white dark:bg-gray-800 shadow-xl rounded-xl w-full max-w-2xl overflow-hidden">
        {/* Header */}
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
              {data?.assessment_name || "Assessment Instructions"}
            </h1>
            <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-300">
              <FaClock className="text-blue-500" />
              <span>{data?.duration || "60"} mins</span>
            </div>
          </div>
          <div className="flex items-center text-gray-600 dark:text-gray-300 text-sm">
            <FaFileAlt className="mr-2 text-gray-400" />
            <span className="capitalize">
              {data?.assessment_type?.replace(/_/g, " ") || "Assessment"}
            </span>
          </div>
        </div>

        {/* Instructions */}
        <div className="p-6">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
            Instructions to Candidates
          </h2>
          <div className="space-y-3">
            {data?.assessment_instruction?.map((instruction, index) => (
              <div
                key={index}
                className="flex items-start space-x-3 text-gray-700 dark:text-gray-300"
              >
                <div className="flex-shrink-0">
                  <FaCheckCircle className="mt-1 text-green-500" />
                </div>
                <p>{instruction}</p>
              </div>
            )) || (
              <p className="text-gray-600 dark:text-gray-400">
                No instructions available
              </p>
            )}

            <div className="flex items-start space-x-3 text-gray-700 dark:text-gray-300">
              <div className="flex-shrink-0">
                <FaCheckCircle className="mt-1 text-green-500" />
              </div>
              <p className="">In any case do not press back or hit refresh</p>
            </div>

            
          </div>
        </div>

        {/* Footer Actions */}
        <div className="px-6 py-4 bg-gray-50 dark:bg-gray-700/50 flex justify-between items-center">
          {/* <Link
            to="/home"
            className="flex items-center text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100"
          >
            <FaArrowLeft className="mr-2" />
            Back to Home
          </Link> */}
          <div className="space-x-4">
            <button
              onClick={() => navigate(-1)}
              className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 
                       rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={() =>
                navigate(`/home/learner/answer-writing/${assessmentId}`)
              }
              className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 
                       transition-colors focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Start Assessment
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InstructionsPage;
