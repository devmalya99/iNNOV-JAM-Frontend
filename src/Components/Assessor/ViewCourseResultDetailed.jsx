import React, { useEffect } from 'react';
import { FetchAssessmentResultInDetails } from '../../services/Assessor/FetchAssessmentResultInDetails';
import { useParams } from 'react-router';
import { Loader2 } from 'lucide-react';

const ViewCourseResultDetailed = () => {
  const { courseId, assessmentId } = useParams();
  const { data: assessmentResult, isLoading, refetch } = FetchAssessmentResultInDetails(assessmentId);

  useEffect(() => {
    refetch();
  }, [refetch]);

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

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
          {/* Header */}
          <div className="p-6 border-b border-gray-200 dark:border-gray-700">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              {assessmentResult?.assessment?.assessment_name} Results
            </h2>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50 dark:bg-gray-700">
                  <th className="py-4 px-6 text-left text-sm font-medium text-gray-500 dark:text-gray-300">#</th>
                  <th className="py-4 px-6 text-left text-sm font-medium text-gray-500 dark:text-gray-300">Student Name</th>
                  <th className="py-4 px-6 text-left text-sm font-medium text-gray-500 dark:text-gray-300">Total Marks</th>
                  <th className="py-4 px-6 text-left text-sm font-medium text-gray-500 dark:text-gray-300">Score</th>
                  <th className="py-4 px-6 text-left text-sm font-medium text-gray-500 dark:text-gray-300">Attempted</th>
                  <th className="py-4 px-6 text-left text-sm font-medium text-gray-500 dark:text-gray-300">Total Questions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                {assessmentResult?.result?.map((student, index) => (
                  <tr 
                    key={student.user_id}
                    className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                  >
                    <td className="py-4 px-6 text-sm text-gray-800 dark:text-gray-200">
                      {index + 1}
                    </td>
                    <td className="py-4 px-6 text-sm font-medium text-gray-800 dark:text-gray-200">
                      {student.student_name}
                    </td>
                    <td className="py-4 px-6 text-sm text-gray-800 dark:text-gray-200">
                      <span className="font-medium">{student.course_total_marks}</span>
                    </td>
                    <td className="py-4 px-6 text-sm text-gray-800 dark:text-gray-200">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-sm font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                        {student.total_score}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-sm text-gray-800 dark:text-gray-200">
                      {student.attempted_questions}
                    </td>
                    <td className="py-4 px-6 text-sm text-gray-800 dark:text-gray-200">
                      {student.total_questions}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Empty State */}
            {(!assessmentResult?.result || assessmentResult.result.length === 0) && (
              <div className="text-center py-12">
                <p className="text-gray-500 dark:text-gray-400">No results found</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewCourseResultDetailed;