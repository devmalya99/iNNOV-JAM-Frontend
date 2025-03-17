import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import { ArrowBigLeftIcon, Loader2, RefreshCcw } from "lucide-react";
import { BsBack } from "react-icons/bs";
import axios from "axios";
import { handleError, handleSuccess } from "../../utils/toast";
import { useQueryClient } from "react-query";
import { FetchAssessmentResultInDetails } from "../../services/Assessor/FetchAssessmentResultInDetails";

const ViewCourseResultDetailed = () => {
  const VITE_API_URL = import.meta.env.VITE_API_URL;
  const { courseId, assessmentId } = useParams();
  
  const {
    data: assessmentResult,
    isLoading,
    refetch,
  } = FetchAssessmentResultInDetails(assessmentId);

  const queryClient = useQueryClient();  // Access query client

  // console.log("assessment result fetched", assessmentResult);

  useEffect(() => {
    // Invalidate the query to refetch data after resubmit
    queryClient.invalidateQueries("all_assessments_result_details");

    // Manually remove the cache for the query to ensure it doesn't persist.
    queryClient.removeQueries("all_assessments_result_details");

    refetch()
  }, [queryClient, assessmentId,refetch]);
  const navigate = useNavigate();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900">
        <div className="flex flex-col items-center space-y-4">
          <Loader2 className="h-8 w-8 animate-spin text-blue-600 dark:text-blue-400" />
          <p className="text-gray-600 dark:text-gray-400">Loading results...</p>
        </div>
      </div>
    );
  }

  const handleResubmit = async (userId) => {
    try {
      const resubmitResponse = await axios.put(
        `${VITE_API_URL}/api/assigned-assessments/reassignassessment`,
        {
          userId: userId,
          assessmentId: assessmentResult?.assessment?._id,
        }
      );
      // Invalidate the query to refetch data after resubmit
      queryClient.invalidateQueries("all_assessments_result_details");

      // Manually remove the cache for the query to ensure it doesn't persist.
    queryClient.removeQueries("all_assessments_result_details");
    
      refetch();  // Force a refetch after invalidating
      alert("Resubmitted successfully! Please refresh.");
      handleSuccess({ success: "Resubmitted successfully!" });

      // console.log(resubmitResponse);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
          {/* Header */}
          <div className="flex justify-between items-center p-6 border-b border-gray-200 dark:border-gray-700">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              {assessmentResult?.assessment?.assessment_name} Results
            </h2>


            {/* Archieve section */}

              {/* <div className="flex space-x-4">
              <button className="button-style">View Previous Submissions</button>

              <button
                className="bg-gray-300 hover:bg-gray-400 text-gray-800 dark:text-gray-200 py-2 px-4 rounded-md flex items-center space-x-2"
                onClick={() => refetch()}
              >
                <RefreshCcw />
                <p>Refetch</p>
              </button> 
            </div>   */}
            


          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50 dark:bg-gray-700">
                  <th className="py-4 px-6 text-left text-sm font-medium text-gray-500 dark:text-gray-300">#</th>
                  <th className="py-4 px-6 text-left text-sm font-medium text-gray-500 dark:text-gray-300">Student Name</th>
                  <th className="py-4 px-6 text-left text-sm font-medium text-gray-500 dark:text-gray-300">Grade Status</th>
                  <th className="py-4 px-6 text-left text-sm font-medium text-gray-500 dark:text-gray-300">Ask to Resubmit</th>
                  <th className="py-4 px-6 text-left text-sm font-medium text-gray-500 dark:text-gray-300">View Result</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                {assessmentResult?.result?.map((student, index) => (
                  <tr
                    key={student.user_id}
                    className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                  >
                    <td className="py-4 px-6 text-sm text-gray-800 dark:text-gray-200">{index + 1}</td>
                    <td className="py-4 px-6 text-sm font-medium text-gray-800 dark:text-gray-200">{student.student_name}</td>
                    <td className="py-4 px-6 text-sm text-gray-800 dark:text-gray-200">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-sm font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                        {student?.status}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-sm text-gray-800 dark:text-gray-200">
                      <button className="button-style" onClick={() => handleResubmit(student?.user_id)}>
                        Resubmit
                      </button>
                    </td>
                    <td className="py-4 px-6 text-sm text-gray-800 dark:text-gray-200">
                      <button
                        className="button-style"
                        onClick={() => navigate(`/home/assessment/view-learner-result/${assessmentId}/${student.user_id}`)}
                      >
                        View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Back button */}
            <div className="flex bg-blue-500 w-[100px] px-4 py-2 rounded-xl my-6">
              <ArrowBigLeftIcon className="text-xl" />
              <button onClick={() => navigate(-1)}>Back</button>
            </div>

            {/* Empty State */}
            {(!assessmentResult?.result || assessmentResult.result.length === 0) && (
              <div className="text-center py-6">
                <p className="text-gray-500  dark:text-gray-400">No results found</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewCourseResultDetailed;
