import { useState } from "react";
import { FiPlus, FiTrash2 } from "react-icons/fi";
import { MdOutlineAddCircle } from "react-icons/md";
import axios from "axios";
import AssignSection from "./AssignSection";
import { Outlet, useNavigate } from "react-router";
import useCourseStore from "../../Zustand/useCourseStore";

const VITE_API_URL = import.meta.env.VITE_API_URL; // Replace with your backend URL if needed

function CreateCourse() {
  const {
    courseName,
    courseCode,
    courseDescription,
    category,
    customCategory,
    totalMarks,
    startDate,
    endDate,
    totalEnrollmentCount,
    visibility,
    assessments,
    setCourseName,
    setCourseCode,
    setCourseDescription,
    setTotalMarks,
    setStartDate,
    setEndDate,
    setTotalEnrollmentCount,
    setVisibility,
    setAssessments,
    selectedLearners,
    selectedTrainers,
    selectedAssessors,
    scheduleExamDate,
    
  } = useCourseStore();

  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleAssessmentChange = (index, value) => {
    const updatedAssessments = [...assessments];
    updatedAssessments[index].name = value;
    setAssessments(updatedAssessments);
    setError(null);
  };

  const handleSubmit = async () => {
    console.log("course clicked")
    if (
      !courseName.trim() ||
      !courseCode.trim() ||
      !courseDescription.trim() ||
      !startDate ||
      !endDate ||
      !visibility ||
      totalMarks <= 0
    ) {
      setError("Please fill out all fields before submitting.");
      alert("Please fill out all fields before submitting.");
      return;
    }

    const courseData = {
      course_name:courseName,
      course_code:courseCode,
      description:courseDescription,
      category: customCategory.trim() || category,
      total_marks:totalMarks,
      startDate:startDate,
      endDate:endDate,
      total_enrollment:0,
      visibility:visibility,
    };

    console.log("courseData", courseData);

    try {
      setLoading(true);
      setError(null);
      setSuccessMessage(null);

      const response = await axios.post(
        `${VITE_API_URL}/api/courses/create`,
        courseData
      );

      setSuccessMessage("Course created successfully!");
      console.log("Course Created:", response?.data);

      // Navigate to the newly created course page
      navigate(`/home/all-assessments`);
    } catch (error) {
      console.error("Failed to create course:", error);
      setError("Failed to create course. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-6 px-4 sm:px-6 lg:px-8 dark:bg-gray-900 h-[calc(100vh-80px)] overflow-y-auto">
      <div className="bg-white dark:bg-gray-800 shadow-xl rounded-2xl p-6 sm:p-8">
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800 dark:text-gray-100">
          Create a New Course
        </h2>

        <Outlet />

        {/* Course Name */}
        <div className="mb-6">
          <label className="block text-gray-700 dark:text-gray-300 font-medium mb-2">
            Course Name
          </label>
          <input
            type="text"
            value={courseName}
            onChange={(e) => setCourseName(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg dark:border-gray-700 dark:bg-gray-700 dark:text-gray-100"
            placeholder="Enter course name"
          />
        </div>

        {/* Course Code */}
        <div className="mb-6">
          <label className="block text-gray-700 dark:text-gray-300 font-medium mb-2">
            Course Code
          </label>
          <input
            type="text"
            value={courseCode}
            onChange={(e) => setCourseCode(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg dark:border-gray-700 dark:bg-gray-700 dark:text-gray-100"
            placeholder="Enter course code"
          />
        </div>

        {/* Course Description */}
        <div className="mb-6">
          <label className="block text-gray-700 dark:text-gray-300 font-medium mb-2">
            Course Description
          </label>
          <textarea
            value={courseDescription}
            onChange={(e) => setCourseDescription(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg dark:border-gray-700 dark:bg-gray-700 dark:text-gray-100"
            placeholder="Enter course description"
          />
        </div>

        {/* Other Fields */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div>
            <label className="block text-gray-700 dark:text-gray-300 font-medium mb-2">
              Start Date
            </label>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg dark:border-gray-700 dark:bg-gray-700 dark:text-gray-100"
            />
          </div>
          <div>
            <label className="block text-gray-700 dark:text-gray-300 font-medium mb-2">
              End Date
            </label>
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg dark:border-gray-700 dark:text-gray-100"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-6">
          <div>
            <label className="block text-gray-700 dark:text-gray-300 font-medium mb-2">
              Total Marks
            </label>
            <input
              type="number"
              value={totalMarks}
              onChange={(e) => setTotalMarks(Number(e.target.value))}
              className="w-full px-4 py-2 border rounded-lg dark:border-gray-700 dark:bg-gray-700 dark:text-gray-100"
            />
          </div>

          

        </div>

        {/* Visibility */}
        <div className="mb-6">
          <label className="block text-gray-700 dark:text-gray-300 font-medium mb-2">
            Visibility
          </label>
          <select
            value={visibility}
            onChange={(e) => setVisibility(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg dark:border-gray-700 dark:bg-gray-700 dark:text-gray-100"
          >
            <option value="Public">Public</option>
            <option value="Private">Private</option>
          </select>
        </div>

        {/* <AssignSection /> */}

        <button
          onClick={handleSubmit}
          disabled={loading}
          className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white px-4 py-2 rounded-lg w-full"
        >
          {loading ? "Creating..." : "Create Course"}
        </button>
      </div>
    </div>
  );
}

export default CreateCourse;
