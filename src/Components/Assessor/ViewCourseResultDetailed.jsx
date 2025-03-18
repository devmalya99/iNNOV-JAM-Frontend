import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { Archive, ArrowBigLeftIcon, Loader2, RefreshCcw } from "lucide-react";
import axios from "axios";
import { handleError, handleSuccess } from "../../utils/toast";
import { useQueryClient } from "react-query";
import { FetchAssessmentResultInDetails } from "../../services/Assessor/FetchAssessmentResultInDetails";
import { useAuth } from "../../../Context/AuthContext";

// Confirmation Modal Component
const ConfirmationModal = ({ isOpen, onClose, onConfirm, studentName }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 w-full max-w-md">
        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Confirm Resubmit</h3>
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          Are you sure you want to ask <span className="font-semibold">{studentName}</span> to resubmit this assessment?
        </p>
        <div className="flex justify-end space-x-4">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-md"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

const ViewCourseResultDetailed = () => {
  const VITE_API_URL = import.meta.env.VITE_API_URL;
  const { courseId, assessmentId } = useParams();
  // Modal state
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
  
  const {
    data: assessmentResult,
    isLoading,
    refetch,
  } = FetchAssessmentResultInDetails(assessmentId);

  const queryClient = useQueryClient();

  useEffect(() => {
    queryClient.invalidateQueries("all_assessments_result_details");
    queryClient.removeQueries("all_assessments_result_details");
    refetch();
  }, [queryClient, assessmentId, refetch]);

  
  
  const navigate = useNavigate();

  const goToArchieve = () => {
    navigate(`/home/assessment/view-detailed-course-result/archive/${assessmentId}`);
  };

  

  // Open modal with selected student
  const openResubmitModal = (userId, studentName) => {
    setSelectedStudent({ userId, name: studentName });
    setModalOpen(true);
  };

  // Handle the actual resubmit after confirmation
  const handleResubmit = async () => {
    if (!selectedStudent) return;
    
    try {
      const resubmitResponse = await axios.put(
        `${VITE_API_URL}/api/assigned-assessments/reassignassessment`,
        {
          userId: selectedStudent.userId,
          assessmentId: assessmentResult?.assessment?._id,
        }
      );
      
      queryClient.invalidateQueries("all_assessments_result_details");
      queryClient.removeQueries("all_assessments_result_details");
      
      refetch();
      handleSuccess({ success: "Resubmitted successfully!" });
      setModalOpen(false);
    } catch (error) {
      console.log(error);
      handleError({ error: "Failed to resubmit assessment" });
      setModalOpen(false);
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

            <button
              onClick={() => goToArchieve()}
              className="px-4 flex  gap-2 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md"
            >
              Archieve
              <Archive/>
            </button>
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
                      <button 
                        className="button-style" 
                        onClick={() => openResubmitModal(student?.user_id, student.student_name)}
                      >
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

            { 
              isLoading && (

                <div className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900">
        <div className="flex flex-col items-center space-y-4">
          <Loader2 className="h-8 w-8 animate-spin text-blue-600 dark:text-blue-400" />
          <p className="text-gray-600 dark:text-gray-400">Loading results...</p>
        </div>
                 </div>
              )
            }

            {/* Back button */}
            <div className="flex bg-blue-500 w-[100px] px-4 py-2 rounded-xl my-6">
              <ArrowBigLeftIcon className="text-xl" />
              <button onClick={() => navigate(-1)}>Back</button>
            </div>

            {/* Empty State */}
            {(!assessmentResult?.result || assessmentResult.result.length === 0) && (
              <div className="text-center py-6">
                <p className="text-gray-500 dark:text-gray-400">No results found</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Confirmation Modal */}
      <ConfirmationModal 
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onConfirm={handleResubmit}
        studentName={selectedStudent?.name}
      />
    </div>
  );
};

export default ViewCourseResultDetailed;