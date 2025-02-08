import React from "react";
import { useFetchAllCourses } from "../../services/FetchAllCourses";
import { motion } from "framer-motion";
import {
  FaBook,
  FaChalkboardTeacher,
  FaUsers,
  FaCalendarAlt,
  FaFileContract,
  FaEdit,
  FaTrash,
} from "react-icons/fa";
import { ImSpinner8 } from "react-icons/im";
import { useNavigate } from "react-router";
import {handleSuccess, handleError} from "../../utils/toast";
import axios from "axios";



const VITE_API_URL = import.meta.env.VITE_API_URL;


const handleDelete = async (id, refetch) => {
  const confirmDelete = window.confirm(
    "Are you sure you want to delete this course? This action cannot be undone."
  );

  if (!confirmDelete) return;

  try {
    const response = await axios.delete(`${VITE_API_URL}/api/courses/remove/${id}`);

    if (response.status === 200) {
      handleSuccess({ success: "Course deleted successfully!" });
      refetch(); // Refetch courses after deletion
    } else {
      throw new Error("Failed to delete course. Please try again.");
    }
  } catch (error) {
    console.error("Error deleting course:", error);
    
  }
};

const CoursesDashboard = () => {
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
    <div className="p-8 h-[calc(100vh-72px)] overflow-y-auto bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800">
      <h1 className="text-3xl font-bold text-center mb-8 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
        Explore Our Courses
      </h1>
      {courses?.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {courses.map((course) => (
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
                    {course?.course_name}
                  </h2>
                </div>
                <div className="px-3 py-1 text-sm bg-green-50 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded-full">
                  {course?.course_code}
                </div>

                <div className="px-3 py-1 text-sm bg-green-50 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded-full">
                  {course?.visibility}
                </div>
              </div>
              <p className="text-gray-600 dark:text-gray-400 mb-6 line-clamp-2 min-h-12">
                {course?.description}
              </p>
              <div className="flex items-center gap-3 p-2 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                <FaUsers className="text-lg text-gray-500 dark:text-gray-400" />
                <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  {course?.total_enrollment} Students Enrolled
                </p>
              </div>

              
              <div className="flex items-center gap-3 p-2 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                <FaCalendarAlt className="text-lg text-gray-500 dark:text-gray-400" />
                <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  {new Date(course?.startDate).toLocaleDateString()} -{" "}
                  {new Date(course?.endDate).toLocaleDateString()}
                </p>
              </div>
              <div
                onClick={() =>
                  navigate(`/home/view/all-assessments/${course?._id}`)
                }
                className="flex items-center justify-between gap-3 p-2 bg-gray-50 dark:bg-gray-700/50 rounded-lg cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <FaFileContract className="text-lg text-gray-500 dark:text-gray-400" />
                  <p className="text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400 hover:underline transition duration-200">
                    View Assessments
                  </p>

                  
                </div>
              </div>

              {/* Footer action button */}

              <div className="action button footer flex items-center justify-between gap-3 p-2 bg-gray-50 dark:bg-gray-700/50 rounded-lg cursor-pointer mt-4">

                <button className="bg-red-700 px-4 py-2 rounded-lg">
                  <FaTrash 

                  onClick={()=>handleDelete(course?._id)}
                  
                  className="text-md text-gray-100 dark:text-gray-400" />
                </button>

                <button className="flex items-center justify-center bg-green-700 px-4 py-2 rounded-lg">
                  <FaEdit className="text-md text-gray-100 dark:text-gray-400" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="text-center p-8 bg-gray-100 dark:bg-gray-800 rounded-lg">
          <p className="text-lg font-medium text-gray-600 dark:text-gray-300">
            No courses available
          </p>
        </div>
      )}
    </div>
  );
};

export default CoursesDashboard;
