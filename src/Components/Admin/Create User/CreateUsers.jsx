import React, { useEffect, useState } from "react";
import { handleSuccess } from "../../../utils/toast";
import handleCreateUsers from "../../../services/handleCreateUsers";
import { useFetchAllCourses } from "../../../services/FetchAllCourses";

const CreateUsers = () => {
  // State to store Users
  const [Users, setUsers] = useState([]);

  const [userRole, setUserRole] = useState("");

  const roles = ['admin', 'learner', 'assessor', 'trainer']

  const { data: courses, isLoading, isError, error,refetch } = useFetchAllCourses();

   useEffect(() => {
       refetch();
     }, [refetch]);
    

  // -------------------------------------------------
  // Course code selection

  console.log("courses", courses);
  const courseCodes = courses ? courses.map(course => course.course_code) : [];


  
  const [selectedCourses, setSelectedCourses] = useState([]);
  const [isCodesOpen, setIsCodesOpen] = useState(false);
  const toggleDropdown = () => setIsCodesOpen(!isCodesOpen);

  const handleRemoveCodes = (code) => {
    setSelectedCourses((prev) => prev.filter((ele) => ele !== code));
  };

  const handleCodeSelect = (code) => {
    setSelectedCourses((prev) =>
      prev.includes(code) ? prev.filter((ele) => ele !== code) : [...prev, code]
    );
  };

  // -------------------------------------------------

  // UI control states
  const [addMethod, setAddMethod] = useState("none"); // 'none', 'choose', 'form', 'csv'
  const [showForm, setShowForm] = useState(false);
  const [showCSVUpload, setShowCSVUpload] = useState(false);
  const [editIndex, setEditIndex] = useState(null); // null or index of assessor being edited

  // Temporary state to store CSV-parsed Users before saving
  const [csvUsers, setCsvUsers] = useState([]);

  // Handle "Add Assessor" button click
  const handleCreateUserClick = () => {
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

  // Handle role changes
  const handleRoleChange = (event) => {
    const selectedRole = event.target.value;
    setUserRole(selectedRole);
  };

  // Handle form submission for adding or editing an assessor
  const handleFormSubmit = (e) => {
    e.preventDefault();
    const name = e.target.name.value.trim();
    const email = e.target.email.value.trim();
    const course_code = selectedCourses;
    const password = e.target.password.value.trim();
    const confirmPassword = e.target.confirmPassword.value.trim();
    const role = userRole;

    if (
      name &&
      email &&
      course_code &&
      password &&
      confirmPassword &&
      role &&
      password === confirmPassword
    ) {
      if (editIndex !== null) {
        // Editing existing assessor
        const updatedUsers = Users.map((user, idx) =>
          idx === editIndex
            ? { name, email, course_code, password, confirmPassword, role }
            : user
        );
        setUsers(updatedUsers);
      } else {
        // Adding new assessor
        setUsers([...Users, { name, email, course_code, password, role }]);
        console.log("Users:", Users);
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
      const newUsers = lines
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
      setCsvUsers(newUsers);
    };
    reader.readAsText(file);
  };

  // Handle "Save" button after CSV is parsed
  const handleCSVSave = () => {
    // Merge parsed CSV Users into main state
    setUsers([...Users, ...csvUsers]);
    // Reset & close
    setCsvUsers([]);
    setShowCSVUpload(false);
    setAddMethod("none");
  };

  // Handle deletion of an assessor
  const handleDelete = (index) => {
    setUsers(Users.filter((_, i) => i !== index));
  };

  // Handle editing of an assessor
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
    // Discard any parsed CSV Users if user cancels
    setCsvUsers([]);
  };

  // Handle Save All button click (for entire list)
  const handleSaveAll = () => {
    // Add role field to all learners
    const newUsers = Users.map((user) => ({ ...user }));
    setUsers(newUsers);
    console.log("Saving newLearners:", newUsers);
    handleCreateUsers(newUsers);
    handleSuccess({ success: "All Users have been saved successfully!" });
    alert("All Users have been saved successfully!");
  };

  console.log(Users);

  return (
    // Toggle the dark class if darkMode is true
    <div>
      {/* Outer container with Tailwind's dark mode support */}
      <div className="p-6 h-screen-[calc(100vh-40px)] bg-gradient-to-r from-blue-100 to-blue-50 dark:from-gray-800 dark:to-gray-900 transition-colors duration-300">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
          {/* Title */}
          <h1 className="text-3xl font-bold text-blue-700 dark:text-white mb-4 sm:mb-0">
            Create Users
          </h1>

          <div className="flex space-x-3">
            {/* Add Assessor Button */}
            <button
              onClick={handleCreateUserClick}
              className="px-6 py-2 bg-blue-500 text-white font-semibold rounded-md shadow-lg hover:bg-blue-600 transition-all"
            >
              Create New Users
            </button>
          </div>
        </div>

        {/*Display Users List */}
        <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg overflow-auto">
          {/* Table Header */}
          <div className="hidden md:flex bg-gray-100 dark:bg-gray-700 p-4 font-semibold text-gray-700 dark:text-gray-200">
            <div className="w-1/4">Name</div>
            <div className="w-1/4">Email</div>
            <div className="w-1/4">Course</div>
            <div className="w-1/4">Actions</div>
          </div>

          {/* User Rows */}
          {Users?.length > 0 ? (
            Users?.map((user, index) => (
              // On mobile, use flex-col; on md+ screens, use flex-row
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
                    {index + 1}. {user?.name}
                  </span>
                </div>
                {/* Email */}
                <div className="w-full md:w-1/4 mb-2 md:mb-0">
                  <span className="text-sm text-gray-600 dark:text-gray-300">
                    {user?.email}
                  </span>
                </div>
                {/* Course */}
                <div className="w-full md:w-1/4 mb-2 md:mb-0">
                  <span className="text-sm text-gray-600 dark:text-gray-300">
                    {user?.course_code.join(", ")}
                  </span>
                </div>
                {/* Actions */}
                <div className="w-full md:w-1/4 flex space-x-2">
                  <button
                    onClick={() => handleEdit(index)}
                    className="px-3 py-1 bg-green-800 text-white text-sm font-medium rounded hover:bg-yellow-600"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(index)}
                    className="px-3 py-1 bg-red-800 text-white text-sm font-medium rounded hover:bg-red-600"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="p-4 text-center text-gray-500 dark:text-gray-400">
              No Users available.
            </div>
          )}
        </div>

        {/* Save All Button */}
        <div className="mt-4 flex justify-center">
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
                Create New Users
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
                {editIndex !== null ? "Edit User" : "Add User"}
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
                      editIndex !== null ? Users[editIndex]?.name : ""
                    }
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                    required
                  />
                </div>

                {/* Email */}

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
                      editIndex !== null ? Users[editIndex]?.email : ""
                    }
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                    required
                  />
                </div>

                {/* Password */}

                <div>
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    defaultValue={
                      editIndex !== null ? Users[editIndex]?.email : ""
                    }
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                    required
                  />
                </div>

                {/* Confirm Password */}
                <div>
                  <label
                    htmlFor="confirmPassword"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                  >
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    id="confirmPassword"
                    name="confirmPassword"
                    defaultValue={
                      editIndex !== null ? Users[editIndex]?.email : ""
                    }
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                    required
                  />
                </div>

                {/* Course */}
                <div className="relative w-64">
                  <div
                    className="border p-2 rounded cursor-pointer bg-white dark:bg-gray-700 dark:border-gray-600 dark:text-white "
                    onClick={toggleDropdown}
                  >
                    {selectedCourses.length > 0 ? (
                      <div className="flex flex-wrap gap-2 p-2">
                        {selectedCourses.map((code) => (
                          <span
                            key={code}
                            className="bg-green-300 px-2 py-1 rounded flex items-center gap-1"
                          >
                            {code}
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                handleRemoveCodes(code);
                              }}
                              className="text-red-500 ml-1"
                            >
                              &#10005;
                            </button>
                          </span>
                        ))}
                      </div>
                    ) : (
                      "Select course codes"
                    )}
                  </div>
                  {isCodesOpen && (
                    <ul className="absolute w-full border mt-1 bg-white shadow-md rounded">
                      {courseCodes?.map((code) => (
                        <li
                          key={code}
                          className={`p-2  bg-gray-300 border border-gray-200 cursor-pointer hover:bg-gray-200 flex justify-between`}
                          onClick={() => handleCodeSelect(code)}
                        >
                          <span className="">{code}</span>
                          {selectedCourses.includes(code) && (
                            <span>&#10003;</span>
                          )}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>

                {/* Role selection */}
                <div className="w-64">
                  <label className="block text-gray-700 font-medium mb-2">
                    Select Role
                  </label>
                  <select
                    value={userRole}
                    onChange={handleRoleChange}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring focus:ring-indigo-200"
                  >
                    <option value="" disabled>
                      Select a role
                    </option>
                    {roles.map((roleOption) => (
                      <option key={roleOption} value={roleOption}>
                        {roleOption}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Cancel */}
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

              {/* Preview the number of parsed Users */}
              {csvUsers.length > 0 && (
                <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900 border border-blue-200 dark:border-blue-700 rounded">
                  <p className="text-sm text-blue-800 dark:text-blue-200">
                    Found <strong>{csvUsers.length}</strong> Users in CSV.
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
                {/* Show Save button only if csvUsers > 0 */}
                {csvUsers.length > 0 && (
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

export default CreateUsers;
