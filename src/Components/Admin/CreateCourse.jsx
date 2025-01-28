import { useState, useEffect } from "react";
import { FiPlus, FiTrash2 } from "react-icons/fi";
import { MdOutlineAddCircle } from "react-icons/md";

import axios from "axios";
import fetchUsersByRole from "../../services/fetchUsersByRole";
import AssignSection from "./AssignSection";
import UserListModal from "./UserListModal";

const VITE_LOCAL_URL = import.meta.env.VITE_LOCAL_URL; // Replace with your backend URL if needed

function CreateCourse() {
  const [courseName, setCourseName] = useState("");
  const [category, setCategory] = useState("General");
  const [customCategory, setCustomCategory] = useState("");
  const [assessments, setAssessments] = useState([{ name: "" }]);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isOpenAssignModal, setOpenAssignModal] = useState(false);

  const [trainers, setTrainers] = useState([]); // List of trainers fetched from the backend
  const [learners, setLearners] = useState([]); // List of learners fetched from the backend
  const [assessors, setAssessors] = useState([]); // List of assessors fetched from the backend
  

  const handleCourseNameChange = (e) => {
    setCourseName(e.target.value);
    setError(null);
  };

  useEffect(() => {
    const fetchData = async () => {
      setTrainers(await fetchUsersByRole("trainer"));
      setLearners(await fetchUsersByRole("learner"));
      setAssessors(await fetchUsersByRole("assessor"));
    };
    fetchData();
  }, []);

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
    if (e.target.value !== "Custom") {
      setCustomCategory(""); // Reset custom category if another option is selected
    }
    setError(null);
  };

  const handleCustomCategoryChange = (e) => {
    setCustomCategory(e.target.value);
    setError(null);
  };

  const handleAssessmentChange = (index, value) => {
    const updatedAssessments = [...assessments];
    updatedAssessments[index].name = value;
    setAssessments(updatedAssessments);
    setError(null);
  };

  const addAssessment = () => {
    setAssessments([...assessments, { name: "" }]);
  };

  const removeAssessment = (index) => {
    const updatedAssessments = assessments.filter((_, i) => i !== index);
    setAssessments(updatedAssessments);
  };

  const handleSubmit = async () => {
    if (
      !courseName.trim() ||
      (!category.trim() && !customCategory.trim()) ||
      assessments.some((a) => !a.name.trim())
    ) {
      setError("Please fill out all fields before submitting.");
      return;
    }

    const courseData = {
      courseName,
      category: customCategory.trim() || category,
      description: "This is a test course description", // Example static description
      organisationName: "Test Organisation", // Example static organisation
      assessments,
      trainer: selectedTrainer, // Store the selected trainer ID
      learners: selectedLearners, // Store the selected learners IDs
      assessors: selectedAssessors, // Store the selected assessors IDs
    };

    try {
      console.log(courseData);
      setLoading(true);
      setError(null);
      setSuccessMessage(null);

      // POST request to save the course
      const response = await axios.post(
        `${VITE_LOCAL_URL}/api/create-new-course`,
        courseData
      );

      // Success feedback
      setSuccessMessage("Course created successfully!");
      console.log("Course Created:", response.data);

      // Clear the form after submission
      setCourseName("");
      setCategory("General");
      setCustomCategory("");
      setAssessments([{ name: "" }]);
    } catch (error) {
      console.error("Failed to create course:", error);
      setError("Failed to create course. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-6 px-4 sm:px-6 lg:px-8 dark:bg-gray-900">
      
      {/* Assign Modal */}
      {isOpenAssignModal && (
        <UserListModal isOpenAssignModal={isOpenAssignModal} setOpenAssignModal={setOpenAssignModal} users={learners} title="Assign Learners" onSelect={(selectedLearners) => setSelectedLearners(selectedLearners)} />
      )}
      
      
      <div className="bg-white dark:bg-gray-800 shadow-xl rounded-2xl p-6 sm:p-8">
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800 dark:text-gray-100">
          Create a New Course
        </h2>

        {/* Course Name */}
        <div className="mb-6">
          <label className="block text-gray-700 dark:text-gray-300 font-medium mb-2">
            Course Name
          </label>
          <input
            type="text"
            value={courseName}
            onChange={handleCourseNameChange}
            className="w-full px-4 py-2 border rounded-lg dark:border-gray-700 dark:bg-gray-700 dark:text-gray-100"
            placeholder="Enter course name"
          />
        </div>

        {/* Category */}
        <div className="mb-6">
          <label className="block text-gray-700 dark:text-gray-300 font-medium mb-2">
            Category
          </label>
          <select
            value={category}
            onChange={handleCategoryChange}
            className="w-full px-4 py-2 border rounded-lg dark:border-gray-700 dark:bg-gray-700 dark:text-gray-100"
          >
            <option value="General">General</option>
            <option value="Technical">Technical</option>
            <option value="Management">Management</option>
            <option value="Custom">Custom</option>
          </select>
          {category === "Custom" && (
            <input
              type="text"
              value={customCategory}
              onChange={handleCustomCategoryChange}
              className="w-full px-4 py-2 mt-4 border rounded-lg dark:border-gray-700 dark:bg-gray-700 dark:text-gray-100"
              placeholder="Enter custom category"
            />
          )}
        </div>

        {/* Assessments */}
        <div className="mb-6">
          <label className="block text-gray-700 dark:text-gray-300 font-medium mb-2">
            Assessments
          </label>
          {assessments.map((assessment, index) => (
            <div key={index} className="flex items-center gap-4 mb-4">
              <input
                type="text"
                value={assessment.name}
                onChange={(e) => handleAssessmentChange(index, e.target.value)}
                className="w-full px-4 py-2 border rounded-lg dark:border-gray-700 dark:bg-gray-700 dark:text-gray-100"
                placeholder={`Assessment ${index + 1}`}
              />
              {assessments.length > 1 && (
                <button
                  onClick={() => removeAssessment(index)}
                  className="text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-600"
                  aria-label="Remove Assessment"
                >
                  <FiTrash2 className="text-xl" />
                </button>
              )}
            </div>
          ))}
          <button
            onClick={addAssessment}
            className="flex items-center gap-2 text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-500"
          >
            <MdOutlineAddCircle className="text-2xl" />
            Add Assessment
          </button>
        </div>

        {/* Assign user section */}

        <AssignSection setOpenAssignModal={setOpenAssignModal}/>

        {/* Error Message */}
        {error && (
          <p className="text-red-500 dark:text-red-400 mb-4">{error}</p>
        )}

        {/* Success Message */}
        {successMessage && (
          <p className="text-green-500 dark:text-green-400 mb-4">
            {successMessage}
          </p>
        )}

        {/* Submit Button */}
        <button
          onClick={handleSubmit}
          disabled={loading}
          className={`bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white px-4 py-2 rounded-lg w-full ${
            loading ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          {loading ? "Creating..." : "Create Course"}
        </button>
      </div>
    </div>
  );
}

export default CreateCourse;
