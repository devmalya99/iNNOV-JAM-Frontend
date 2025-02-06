
const AddUserForm = (
    showForm, 
    handleFormSubmit, 
    Users, editIndex,
    toggleDropdown,
    selectedCourses,
    handleRemoveCodes,
    isCodesOpen,
    courseCodes,
    userRole,
    handleRoleChange,
    handleCodeSelect,
    roles,
    handleCancel


) => {
  return (
    <div>
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
                      {courseCodes.map((code) => (
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
    </div>
  )
}

export default AddUserForm