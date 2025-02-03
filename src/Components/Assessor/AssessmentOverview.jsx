import React from 'react';
import { useFetchAllCourses } from '../../services/FetchAllCourses'; // Assuming your custom hook is in the 'hooks.js' file
import { Link } from 'react-router';

const CourseResultsTable = () => {
  // Using the custom hook to fetch courses data
  const { data, isLoading, isError, error } = useFetchAllCourses();

  // Helper function to format date
  const formatDate = (date) => {
    if (!date) return 'N/A';
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(date).toLocaleDateString(undefined, options);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="m-4 bg-white dark:bg-gray-900 rounded-lg shadow-lg p-2">
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr>
              <th className="bg-blue-600 text-white p-3 text-left border border-blue-700">Course Name</th>
              <th className="bg-blue-600 text-white p-3 text-left border border-blue-700">Exam Schedule Date</th>
              <th className="bg-blue-600 text-white p-3 text-left border border-blue-700">Total Enrolled Students</th>
              <th className="bg-blue-600 text-white p-3 text-left border border-blue-700">Submission Completed</th>
            </tr>
          </thead>
          <tbody>
            {data.map((course) => (
              <tr key={course._id} className="bg-blue-50 dark:bg-gray-800 dark:text-white">
                <td className="p-3 border border-gray-300">
                  <Link to={`exam/date`} className="text-blue-600 hover:text-blue-800 cursor-pointer">
                    {course.courseName}
                  </Link>
                </td>
                <td className="p-3 border border-gray-300">{formatDate(course.examScheduleDate)}</td>
                <td className="p-3 border border-gray-300">{course.assigned_learners.length}</td>
                <td className="p-3 border border-gray-300">
                  1/{course.assigned_learners.length}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CourseResultsTable;
