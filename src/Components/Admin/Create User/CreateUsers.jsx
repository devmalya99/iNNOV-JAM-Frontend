import React, { useEffect, useState } from "react";
import { handleSuccess } from "../../../utils/toast";
import { UseCreateUser } from "../../../services/Admin/User Creation/UseCreateUser";
import { useFetchAllCourses } from "../../../services/FetchAllCourses";
import { useNavigate } from "react-router";

const CreateUsers = () => {
  const [userRole, setUserRole] = useState("");
  const roles = ["admin", "learner", "assessor", "trainer"];
  const { data: courses, refetch } = useFetchAllCourses();
  const navigate = useNavigate();

  // Update courses on component mount
  useEffect(() => {
    refetch();
  }, [refetch]);

  // Extract course codes from courses data
  const courseCodes = courses ? courses.map((course) => course.course_code) : [];
  const [selectedCourses, setSelectedCourses] = useState([]);
  const [isCodesOpen, setIsCodesOpen] = useState(false);

  const toggleDropdown = () => setIsCodesOpen((prev) => !prev);

  const handleRemoveCode = (code) =>
    setSelectedCourses((prev) => prev.filter((c) => c !== code));

  const handleCodeSelect = (code) => {
    setSelectedCourses((prev) =>
      prev.includes(code) ? prev.filter((c) => c !== code) : [...prev, code]
    );
  };

  const handleRoleChange = (e) => {
    setUserRole(e.target.value);
  };

  // Initialize our mutation hook
  const createUserMutation = UseCreateUser();

  // Merged function: validates form data and calls the mutation to create the user
  const handleSaveAll = (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value.trim();
    const email = form.email.value.trim();
    const password = form.password.value.trim();
    const confirmPassword = form.confirmPassword.value.trim();
    const role = userRole;
    const course_code = selectedCourses;

    if (!name || !email || !password || !confirmPassword || !role ) {
      alert("Please fill in all required fields");
      return;
    }
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    const newUser = { name, email, course_code, password, role };

    // Use the mutation to create the user (expects an array of users)
    createUserMutation.mutate([newUser]);

    // Reset form and state
    form.reset();
    setSelectedCourses([]);
    setUserRole("");

    handleSuccess({ success: "User has been created successfully!" });
    navigate("/home/user-management");
  };

 

  return (
    <div className="p-6 h-[calc(100vh-80px)] bg-gradient-to-r from-gray-100 to-blue-50 dark:from-gray-800 dark:to-gray-900 transition-colors duration-300">
      <h1 className="text-3xl font-bold text-blue-700 dark:text-white mb-6 text-center">Create Users</h1>
      <div className="flex justify-center items-center">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg w-96">
          <form onSubmit={handleSaveAll} className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                required
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                required
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                required
              />
            </div>
            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Confirm Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                required
              />
            </div>
            <div className="relative w-64">
              <div
                className="border p-2 rounded cursor-pointer bg-white dark:bg-gray-700"
                onClick={toggleDropdown}
              >
                {selectedCourses.length > 0 ? (
                  <div className="flex flex-wrap gap-2">
                    {selectedCourses.map((code) => (
                      <span key={code} className="bg-green-300 px-2 py-1 rounded flex items-center gap-1">
                        {code}
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleRemoveCode(code);
                          }}
                          className="text-red-500"
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
                      className="p-2 border cursor-pointer hover:bg-gray-200 flex justify-between"
                      onClick={() => handleCodeSelect(code)}
                    >
                      <span>{code}</span>
                      {selectedCourses.includes(code) && <span>&#10003;</span>}
                    </li>
                  ))}
                </ul>
              )}
            </div>
            <div className="w-64">
              <label className="block text-gray-700 font-medium mb-2">Select Role</label>
              <select
                value={userRole}
                onChange={handleRoleChange}
                className="w-full p-2 border rounded-lg focus:ring focus:ring-indigo-200"
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
            <div className="space-x-4">
              
              <button type="submit" className="px-4 py-2 bg-green-500 text-white font-semibold rounded-md hover:bg-green-600">
                Save User
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateUsers;
