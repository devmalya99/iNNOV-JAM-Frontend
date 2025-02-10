import React from "react";
import {
  FaBook,
  FaCalendarAlt,
  FaChalkboardTeacher,
  FaChevronRight,
  FaClipboardList,
  FaSpinner,
} from "react-icons/fa";
import { FetchAllCoursesOfUser } from "../../../services/FetchAllCoursesOfUser";
import { useNavigate } from "react-router";

const AssessorCourses = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user?.id;

  const { data: courses, isLoading, error } = FetchAllCoursesOfUser(userId);

  const navigate = useNavigate()

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-75px)] bg-gray-50 dark:bg-gray-900">
        <FaSpinner className="animate-spin text-4xl text-blue-500 dark:text-blue-400 mb-4" />
        <p className="text-gray-600 dark:text-gray-300 animate-pulse">
          Loading your courses...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center p-6 text-red-500">Error: {error.message}</div>
    );
  }

  return (
    <div className="p-8 bg-gray-50 dark:bg-gray-900 min-h-[calc(100vh-75px)] transition-colors duration-300">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-center mb-8">
          <FaChalkboardTeacher className="text-4xl text-blue-500 dark:text-blue-400 mr-4 animate-bounce" />
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
            Your Assigned Courses
          </h1>
        </div>

        {courses?.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.map((course) => (
              <div
                key={course?._id}
                className="group relative overflow-hidden bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-xl 
                       transform hover:-translate-y-1 transition-all duration-300 border border-gray-200 
                       dark:border-gray-700 cursor-pointer"
              >
                {/* Course Header */}
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h2
                        className="text-xl font-semibold text-gray-900 dark:text-gray-100 flex items-center gap-2 mb-2 
                                 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-200"
                      >
                        <FaBook className="text-blue-600 dark:text-blue-400 transform group-hover:scale-110 transition-transform duration-200" />
                        {course?.course_name}
                      </h2>
                      <div className="h-20">
                        <p className="text-gray-600 dark:text-gray-300 text-sm line-clamp-3">
                          {course?.description || "No description available"}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Course Details */}
                  <div className="space-y-3 mb-6">
                    <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                      <FaClipboardList className="text-green-600 dark:text-green-400" />
                      <span className="text-sm">Total Marks: </span>
                      <span className="font-semibold">
                        {course?.total_marks || 0}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                      <FaCalendarAlt className="text-red-600 dark:text-red-400" />
                      <span className="text-sm">End Date: </span>
                      <span className="font-semibold">
                        {course?.endDate
                          ? new Date(course.endDate).toLocaleDateString()
                          : "Not set"}
                      </span>
                    </div>
                  </div>

                  {/* Action Button */}
                  <div className="relative">
                    <button
                    onClick={()=>navigate(`/home/assessment/view-course-result/${course?._id}`)}
                      className="w-full py-3 px-4 bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 
                     dark:hover:bg-blue-700 text-white rounded-lg transition-colors duration-200 
                     transform group-hover:scale-105 flex items-center justify-center gap-2"
                    >
                      <span>Go to result</span>
                      <FaChevronRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-200" />
                    </button>
                  </div>
                </div>

                {/* Decorative Elements */}
                <div className="absolute top-0 right-0 -mt-2 -mr-2 h-20 w-20 transform rotate-45 bg-gradient-to-br from-blue-500/10 to-purple-500/10 dark:from-blue-400/10 dark:to-purple-400/10" />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-white dark:bg-gray-800 rounded-xl shadow-md">
            <FaBook className="mx-auto text-6xl text-gray-400 dark:text-gray-600 mb-4 animate-pulse" />
            <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
              No Courses Yet
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              Looks like you haven't been enrolled in any courses yet.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AssessorCourses;
