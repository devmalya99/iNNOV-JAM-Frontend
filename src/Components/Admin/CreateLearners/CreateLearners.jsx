import React, { useState } from "react";
import { handleSuccess } from "../../../utils/toast";
import handleCreateUsers from "../../../services/handleCreateUsers";

const CreateLearners = () => {
  const [learners, setLearners] = useState([]);
  const [addMethod, setAddMethod] = useState("none"); // 'none', 'choose', 'form', 'csv'
  const [showForm, setShowForm] = useState(false);
  const [showCSVUpload, setShowCSVUpload] = useState(false);
  const [editIndex, setEditIndex] = useState(null); // null or index of learner being edited
  const [csvLearners, setCsvLearners] = useState([]); // Temporary state to store CSV-parsed learners

  // Handle "Add Learner" button click
  const handleAddLearnerClick = () => {
    setAddMethod("choose");
    setEditIndex(null);
  };

  // Handle selection of add method
  const handleSelectAddMethod = (method) => {
    if (method === "form") {
      setShowForm(true);
    } else if (method === "csv") {
      setShowCSVUpload(true);
    }
    setAddMethod(method);
  };

  // Handle form submission for adding or editing a learner
  const handleFormSubmit = (e) => {
    e.preventDefault();
    const name = e.target.name.value.trim();
    const email = e.target.email.value.trim();
    const course = e.target.course.value.trim();
    if (name && email && course) {
      if (editIndex !== null) {
        // Editing existing learner
        const updatedLearners = learners.map((learner, idx) =>
          idx === editIndex ? { name, email, course } : learner
        );
        setLearners(updatedLearners);
      } else {
        // Adding new learner
        setLearners([...learners, { name, email, course }]);
      }
      // Reset states
      setShowForm(false);
      setAddMethod("none");
      setEditIndex(null);
    }
  };

  // Handle CSV file selection & parsing
  const handleCSVUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const lines = event.target.result.split("\n").slice(1); // Skip header line
      const newLearners = lines
        .map((line) => {
          // Expecting: name,email,course
          const columns = line.split(",");
          if (columns.length >= 3) {
            const name = columns[0]?.trim();
            const email = columns[1]?.trim();
            const course = columns[2]?.trim();
            return name && email && course ? { name, email, course } : null;
          }
          return null;
        })
        .filter(Boolean);
      setCsvLearners(newLearners);
    };
    reader.readAsText(file);
  };

  // Handle "Save" button after CSV is parsed
  const handleCSVSave = () => {
    // Merge parsed CSV learners into main state
    setLearners([...learners, ...csvLearners]);
    // Reset & close
    setCsvLearners([]);
    setShowCSVUpload(false);
    setAddMethod("none");
  };

  // Handle deletion of a learner
  const handleDelete = (index) => {
    setLearners(learners.filter((_, i) => i !== index));
  };

  // Handle editing of a learner
  const handleEdit = (index) => {
    setEditIndex(index);
    setAddMethod("form");
    setShowForm(true);
  };

  // Handle cancellation of add or edit forms
  const handleCancel = () => {
    setAddMethod("none");
    setShowForm(false);
    setShowCSVUpload(false);
    setEditIndex(null);
    // Discard any parsed CSV learners if user cancels
    setCsvLearners([]);
  };

  // Handle Save All button click (for entire list)
  const handleSaveAll = () => {
    // Add role field to all learners
const newLearners = learners.map((learner) => ({ ...learner, role: "learner" }));
setLearners(newLearners);
console.log("Saving newLearners:", newLearners);
handleCreateUsers(newLearners)
handleSuccess({ success: "All learners have been saved successfully!" });
alert("All learners have been saved successfully!");
  };

  return (
    <div>
      {/* Outer container with Tailwind's dark mode support */}
      <div className="p-6 h-[calc(100vh-5rem)] 
      overflow-y-auto
      bg-gradient-to-r from-blue-100 to-blue-50 dark:from-gray-800 dark:to-gray-900 transition-colors duration-300">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
          {/* Title */}
          <h1 className="text-3xl font-bold text-blue-700 dark:text-white mb-4 sm:mb-0">
            Create Learners
          </h1>

          <div className="flex space-x-3">
            {/* Add Learner Button */}
            <button
              onClick={handleAddLearnerClick}
              className="px-6 py-2 bg-blue-500 text-white font-semibold rounded-md shadow-lg hover:bg-blue-600 transition-all"
            >
              Add Learner
            </button>
          </div>
        </div>

        {/* Learners List */}
        <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg overflow-auto">
          {/* Table Header */}
          <div className="hidden md:flex bg-gray-100 dark:bg-gray-700 p-4 font-semibold text-gray-700 dark:text-gray-200">
            <div className="w-1/4">Name</div>
            <div className="w-1/4">Email</div>
            <div className="w-1/4">Course</div>
            <div className="w-1/4">Actions</div>
          </div>

          {/* Learner Rows */}
          {learners.length > 0 ? (
            learners.map((learner, index) => (
              <div
                key={index}
                className={`flex flex-col md:flex-row items-start md:items-center p-4 border-t border-gray-200 dark:border-gray-700 ${
                  index % 2 === 0
                    ? "bg-white dark:bg-gray-800"
                    : "bg-gray-50 dark:bg-gray-900"
                } hover:bg-gray-100 dark:hover:bg-gray-700 transition-all`}
              >
                {/* Name */}
                <div className="w-full md:w-1/4 flex items-center space-x-2 mb-2 md:mb-0">
                  <span className="text-base md:text-lg font-medium text-gray-800 dark:text-gray-200">
                    {index + 1}. {learner.name}
                  </span>
                </div>
                {/* Email */}
                <div className="w-full md:w-1/4 mb-2 md:mb-0">
                  <span className="text-sm text-gray-600 dark:text-gray-300">
                    {learner.email}
                  </span>
                </div>
                {/* Course */}
                <div className="w-full md:w-1/4 mb-2 md:mb-0">
                  <span className="text-sm text-gray-600 dark:text-gray-300">
                    {learner.course}
                  </span>
                </div>
                {/* Actions */}
                <div className="w-full md:w-1/4 flex space-x-2">
                  <button
                    onClick={() => handleEdit(index)}
                    className="px-3 py-1 bg-yellow-800 text-white text-sm font-medium rounded hover:bg-yellow-600"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(index)}
                    className="px-3 py-1 bg-red-500 text-white text-sm font-medium rounded hover:bg-red-600"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="p-4 text-center text-gray-500 dark:text-gray-400">
              No learners available.
            </div>
          )}
        </div>

        {/* Save All Button */}
        <div className="mt-4 flex justify-end">
          <button
            onClick={handleSaveAll}
            className="w-40 px-6 py-2 bg-green-500 text-white font-semibold rounded-md shadow-lg hover:bg-green-600 transition-all"
          >
            Save All
          </button>
        </div>

        {/* Add Method Selection Modal */}
        {addMethod === "choose" && (
          <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg w-80">
              <h2 className="text-xl font-bold text-gray-700 dark:text-gray-200 mb-4">
                Add Learner
              </h2>
              <button
                onClick={() => handleSelectAddMethod("form")}
                className="block w-full px-4 py-2 mb-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition-all"
              >
                Add with Form
              </button>
              <button
                onClick={() => handleSelectAddMethod("csv")}
                className="block w-full px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition-all"
              >
                Add with CSV
              </button>
              <button
                onClick={handleCancel}
                className="mt-4 text-sm text-gray-500 dark:text-gray-300 hover:underline"
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        {/* Add/Edit Form Modal */}
        {showForm && (
          <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg w-96">
              <h2 className="text-xl font-bold text-gray-700 dark:text-gray-200 mb-4">
                {editIndex !== null ? "Edit Learner" : "Add Learner"}
              </h2>
              <form onSubmit={handleFormSubmit} className="space-y-4">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    defaultValue={
                      editIndex !== null ? learners[editIndex]?.name : ""
                    }
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    defaultValue={
                      editIndex !== null ? learners[editIndex]?.email : ""
                    }
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="course"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                  >
                    Course
                  </label>
                  <input
                    type="text"
                    id="course"
                    name="course"
                    defaultValue={
                      editIndex !== null ? learners[editIndex]?.course : ""
                    }
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                    required
                  />
                </div>
                <div className="flex justify-end space-x-4">
                  <button
                    type="button"
                    onClick={handleCancel}
                    className="px-4 py-2 bg-gray-300 dark:bg-gray-600 text-gray-700 dark:text-gray-200 rounded-md hover:bg-gray-400 dark:hover:bg-gray-500"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600"
                  >
                    {editIndex !== null ? "Update" : "Submit"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* CSV Upload Modal */}
        {showCSVUpload && (
          <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg w-96">
              <h2 className="text-xl font-bold text-gray-700 dark:text-gray-200 mb-4">
                Upload CSV
              </h2>

              {/* CSV File Input */}
              <input
                type="file"
                accept=".csv"
                onChange={handleCSVUpload}
                className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
              />

              {/* Preview the number of parsed learners */}
              {csvLearners.length > 0 && (
                <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900 border border-blue-200 dark:border-blue-700 rounded">
                  <p className="text-sm text-blue-800 dark:text-blue-200">
                    Found <strong>{csvLearners.length}</strong> learners in CSV.
                  </p>
                </div>
              )}

              {/* Buttons: Cancel | Save */}
              <div className="mt-4 flex justify-end space-x-4">
                <button
                  onClick={handleCancel}
                  className="px-4 py-2 bg-gray-300 dark:bg-gray-600 text-gray-700 dark:text-gray-200 rounded-md hover:bg-gray-400 dark:hover:bg-gray-500"
                >
                  Cancel
                </button>
                {/* Show Save button only if csvLearners > 0 */}
                {csvLearners.length > 0 && (
                  <button
                    onClick={handleCSVSave}
                    className="px-4 py-2 bg-green-500 text-white font-semibold rounded-md hover:bg-green-600"
                  >
                    Save
                  </button>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CreateLearners;