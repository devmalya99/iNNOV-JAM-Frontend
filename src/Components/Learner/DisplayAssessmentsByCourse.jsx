import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import {
  FaClipboardCheck,
  FaSpinner,
  FaExclamationCircle,
  FaClock,
  FaFileAlt,
  FaBookReader,
} from "react-icons/fa";
import { FetchAssessmentsWithinCourseOfLearner } from "../../services/FetchAssessmentsWithinCourseOfLearner";

const DisplayAssessmentsByCourse = () => {
  const { userId, courseId } = useParams();

  const {
    data: assessments,
    isLoading,
    isError,
    refetch,
  } = FetchAssessmentsWithinCourseOfLearner(userId, courseId);

 console.log("fetched assessments", assessments);

  useEffect(() => {
    refetch?.();
  }, [refetch]);

  const navigate = useNavigate();

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-6 bg-gray-50 dark:bg-gray-900">
        <FaSpinner className="animate-spin text-4xl text-blue-500 dark:text-blue-400 mb-4" />
        <p className="text-gray-600 dark:text-gray-300 animate-pulse">
          Loading assessments...
        </p>
      </div>
    );
  }

  if (!assessments) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-6 bg-gray-50 dark:bg-gray-900">
        {/* <FaExclamationCircle className="text-4xl text-red-500 dark:text-red-400 mb-4" /> */}
        <p className="text-gray-600 dark:text-gray-300">
          No live assessment available for this course{" "}
        </p>
        <button
          onClick={() => refetch?.()}
          className="mt-4 px-4 py-2 bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700 text-white rounded-lg transition-colors duration-200"
        >
          Contact Admin Support
        </button>
      </div>
    );
  }

  const getAssessmentIcon = (type) => {
    switch (type?.toLowerCase()) {
      case "written_assessment":
        return <FaFileAlt className="text-indigo-500 dark:text-indigo-400" />;
      case "case_study":
        return <FaBookReader className="text-green-500 dark:text-green-400" />;
      default:
        return (
          <FaClipboardCheck className="text-blue-500 dark:text-blue-400" />
        );
    }
  };

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case "completed":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200";
      case "in_progress":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200";

      case "pending":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200";

        case "rejected":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200";

      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200";
    }
  };

  return (
    <div className="min-h-screen p-6 bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
          Course Assessments
        </h2>

        {assessments?.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {assessments.map((assessment) => (
              <div
                key={assessment?._id}
                className="group bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-xl p-6 transition-all duration-300 transform hover:-translate-y-1 border border-gray-100 dark:border-gray-700"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    {getAssessmentIcon(
                      assessment?.assessmentId?.assessment_type
                    )}
                    <span className="text-lg font-semibold text-gray-900 dark:text-white">
                      {assessment?.assessment_type
                        ?.replace(/_/g, " ")
                        .charAt(0)
                        .toUpperCase() +
                        assessment?.assessment_type
                          ?.replace(/_/g, " ")
                          .slice(1)}
                    </span>
                  </div>
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(
                      assessment?.status
                    )}`}
                  >
                    {assessment?.status?.replace(/_/g, " ")}
                  </span>
                </div>

                <div className="space-y-3">
                  

                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    Type: {assessment?.assessment_type}
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-700">
                  <button
                    onClick={() =>{
                      console.log("assessment", assessment)
                      navigate(
                        `/home/learner/instructions/${assessment?.assessmentId?._id}`
                      )
                    }
                      
                    }
                    
                    disabled={ ["completed", "rejected"].includes(assessment?.status?.toLowerCase() )}

                    className={`w-full py-2 px-4 rounded-lg transition-colors duration-200 ${
                      ["completed", "rejected"].includes(assessment?.status?.toLowerCase() )
                        ? "bg-gray-400 cursor-not-allowed"
                        : "bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700 text-white"
                    }`}

                  >
                    Start The Assessment
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-xl shadow">
            <FaClipboardCheck className="mx-auto text-4xl text-gray-400 dark:text-gray-600 mb-4" />
            <p className="text-gray-600 dark:text-gray-300 text-lg">
              No assessments available for this course.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default DisplayAssessmentsByCourse;
