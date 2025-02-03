import React from "react";
import { useFetchAllCourses } from "../../services/FetchAllCourses";
import { motion } from "framer-motion";
import { FaBook, FaChalkboardTeacher, FaUsers, FaCalendarAlt, FaFile, FaFileContract } from "react-icons/fa";
import { ImSpinner8 } from "react-icons/im";
import { FaTextSlash } from "react-icons/fa6";
import { useNavigate } from "react-router";

const VITE_API_URL = import.meta.env.VITE_API_URL;

const CoursesList = () => {
  const { data: courses, isLoading, isError, error } = useFetchAllCourses();
  const navigate = useNavigate();
  

  if (isLoading) {
    return (
      <div className="p-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {[...Array(6)].map((_, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="animate-pulse border rounded-xl p-6 shadow-lg bg-gray-100 dark:bg-gray-700 h-48"
          ></motion.div>
        ))}
      </div>
    );
  }

  if (isError) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center p-8 bg-red-50 dark:bg-red-900/20 rounded-lg">
          <p className="text-red-600 dark:text-red-400 text-lg font-medium">
            Error: {error?.message}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8 h-[calc(100vh-72px)] overflow-y-auto
    bg-gradient-to-b from-white to-gray-50
    dark:from-gray-900 dark:to-gray-800">
      <h1 className="text-3xl font-bold text-center mb-8 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
        Explore Our Courses
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {courses?.map((course) => (
          <motion.div
            key={course?._id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl p-6 shadow-lg hover:shadow-xl hover:scale-102 transform transition-all duration-300"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-50 dark:bg-blue-900/30 rounded-lg">
                  <FaBook className="text-xl text-blue-600 dark:text-blue-400" />
                </div>
                <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">
                  {course?.courseName}
                </h2>
              </div>
              <div className="px-3 py-1 text-sm bg-green-50 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded-full">
                Active
              </div>
            </div>
            
            <p className="text-gray-600 dark:text-gray-400 mb-6 line-clamp-2 min-h-12">
              {course?.description}
            </p>

            <div className="space-y-4">
              <div className="flex items-center gap-3 p-2 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                <FaChalkboardTeacher className="text-lg text-gray-500 dark:text-gray-400" />
                <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  {course?.assigned_trainers?.join(", ") || "No trainers assigned"}
                </p>
              </div>

              <div className="flex items-center gap-3 p-2 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                <FaUsers className="text-lg text-gray-500 dark:text-gray-400" />
                <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  {course?.assigned_learners?.length || 0} Students Enrolled
                </p>
              </div>

              <div className="flex items-center gap-3 p-2 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                <FaCalendarAlt className="text-lg text-gray-500 dark:text-gray-400" />
                <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  {new Date(course?.examScheduleDate).toLocaleDateString() || "TBD"}
                </p>
              </div>

              {/* View Assessments Button */}
              <div 
              onClick={() => {
                navigate(`/home/view/all-assessments/${course?._id}`);
              }}
              className="flex items-center justify-between gap-3
               p-2 bg-gray-50 dark:bg-gray-700/50 rounded-lg cursor-pointer">
                <div className="flex items-center gap-3">
                <FaFileContract className="text-lg text-gray-500 dark:text-gray-400" />
                <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  View Assessments
                </p>
                </div>

                <p className="text-sm font-medium text-green-700 dark:text-green-300">
                  {course?.assessments?.length || 0}
                </p>
              </div>


            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default CoursesList;