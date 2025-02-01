import React from 'react';
import { Link } from 'react-router';
const CourseResultsTable = () => {
    const courseData = [
        { 
          date: '01/10/2024', 
          courseName: 'Digital Marketing 1', 
          submissions: '20/20', 
          results: '10/20',
          path: './exam' // New path field for redirection
        },
        
      ];

  // Helper function to determine if a result is highlighted (in red)
  const isHighlighted = (result) => {
    if (result === '9/10' || result === '19/20' || result === '17/20') {
      return true;
    }
    return false;
  };

  return (
    <div className=" m-4 bg-white dark:bg-gray-900  rounded-lg shadow-lg p-2 ">
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr>
              <th className="bg-blue-600 text-white p-3 text-left border border-blue-700">
                Class Date
              </th>
              <th className="bg-blue-600 text-white p-3 text-left border border-blue-700">
                Course Name
              </th>
              <th className="bg-blue-600 text-white p-3 text-left border border-blue-700">
                No. of Submission
              </th>
              <th className="bg-blue-600 text-white p-3 text-left border border-blue-700">
                Results (Competent)
              </th>
            </tr>
          </thead>
          <tbody>
            {courseData.map((row, index) => (
              <tr key={index} className="bg-blue-50 dark:bg-gray-800 dark:text-white">
                <td className="p-3 border border-gray-300">
                  {row.date}
                </td>
                <td className="p-3 border border-gray-300">
                <Link to='./exam/date'  className="text-blue-600 hover:text-blue-800 cursor-pointer">
                    {row.courseName}
                  </Link>
                  </td>
                <td className="p-3 border border-gray-300">
                  {row.submissions}
                </td>
                <td className="p-3 border border-gray-300">
                  <span className={isHighlighted(row.results) ? 'text-red-600' : ''}>
                    {row.results}
                  </span>
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