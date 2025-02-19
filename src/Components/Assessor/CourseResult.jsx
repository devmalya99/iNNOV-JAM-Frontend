import React from 'react';
import { useNavigate, useParams } from 'react-router';
import { FetchCourseResultData } from '../../services/Assessor/FetchCourseResultData';
import { Loader2 } from 'lucide-react';

const CourseResult = () => {
    const { courseId } = useParams();
    const { data: resultData, isLoading, error } = FetchCourseResultData(courseId);
    // console.log("resultData", resultData);

    const navigate = useNavigate()

    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-screen dark:bg-gray-900">
                <Loader2 className="h-8 w-8 animate-spin text-primary dark:text-white" />
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex items-center justify-center min-h-screen dark:bg-gray-900">
                <div className="w-full max-w-md p-6 rounded-lg bg-white dark:bg-gray-800 shadow-md">
                    <p className="text-center text-red-500 dark:text-red-400">Error loading data</p>
                </div>
            </div>
        );
    }

    return (
        <div className="p-6 min-h-screen bg-gray-50 dark:bg-gray-900">
            <h1 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Course Results</h1>
            
            {resultData?.mappedData?.length > 0 ? (
                <div className="overflow-x-auto">
                    <div className="min-w-full bg-white dark:bg-gray-800 rounded-lg shadow-md">
                        {/* Header */}
                        <div className="grid grid-cols-6 gap-4 p-4 font-medium text-sm text-gray-500 dark:text-gray-400 border-b border-gray-200 dark:border-gray-700">
                            <div>Course Name</div>
                            <div>Assessment Name</div>
                            <div>Assessment Type</div>
                            <div>Total Assigned</div>
                            <div>Total Completed</div>
                            <div></div> {/* Space for button */}
                        </div>
                        
                        {/* Rows */}
                        {resultData.mappedData.map((item, index) => (
                            <div 
                                key={index}
                                className={`grid grid-cols-6 gap-4 p-4 items-center hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors ${
                                    index !== resultData.mappedData.length - 1 ? 'border-b border-gray-200 dark:border-gray-700' : ''
                                }`}
                            >
                                <div className="text-gray-900 dark:text-white font-medium">
                                    {item.courseName}
                                </div>
                                <div className="text-gray-700 dark:text-gray-300">
                                    {item.assessmentName}
                                </div>
                                <div className="text-gray-700 dark:text-gray-300">
                                    {item.assessmentType}
                                </div>
                                <div className="text-gray-700 dark:text-gray-300">
                                    {item.totalAssigned}
                                </div>
                                <div className="text-gray-700 dark:text-gray-300">
                                    {item.totalCompleted}
                                </div>
                                <div>
                                    <button 
                                    onClick={() => navigate(`/home/assessment/view-detailed-course-result/${courseId}/${item?.assessmentId}`)}
                                    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors dark:bg-blue-500 dark:hover:bg-blue-600 text-sm">
                                        View Result
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            ) : (
                <div className="text-center text-gray-500 dark:text-gray-400">
                    No results found.
                </div>
            )}
        </div>
    );
};

export default CourseResult;