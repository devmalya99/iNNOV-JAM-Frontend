import React, { useEffect, useState } from "react";
import { FaBook, FaCalendarAlt, FaClipboardList } from "react-icons/fa";

const API_BASE_URL = "http://192.168.1.54:7000/api/courses/courses/user/";

const UserCourses = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user || !user.id) {
      setError("User ID not found in local storage");
      setLoading(false);
      return;
    }

    fetch(`${API_BASE_URL}${user.id}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch courses");
        }
        return response.json();
      })
      .then((data) => {
        setCourses(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div className="text-center p-6">Loading courses...</div>;
  }

  if (error) {
    return <div className="text-center p-6 text-red-500">Error: {error}</div>;
  }

  return (
    <div className="p-8 bg-gray-50 dark:bg-gray-900 min-h-screen">
      <h1 className="text-3xl font-bold text-center mb-6 text-gray-900 dark:text-gray-100">
        Your Courses
      </h1>
      {courses.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course) => (
            <div
              key={course._id}
              className="cursor-pointer bg-white dark:bg-gray-800 p-6 shadow-md rounded-lg border border-gray-200 dark:border-gray-700"
            >
              <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 flex items-center gap-2">
                <FaBook className="text-blue-600 dark:text-blue-400" />
                {course.course_name}
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mt-2 line-clamp-2">
                {course.description}
              </p>
              <div className="mt-4">
                <p className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                  <FaClipboardList className="text-green-600 dark:text-green-400" />
                  Total Marks: {course.total_marks}
                </p>
                <p className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                  <FaCalendarAlt className="text-red-600 dark:text-red-400" />
                  End Date: {new Date(course.endDate).toLocaleDateString()}
                </p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center p-6 text-gray-600 dark:text-gray-300">
          No courses available.
        </div>
      )}
    </div>
  );
};

export default UserCourses;