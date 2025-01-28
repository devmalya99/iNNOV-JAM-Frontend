import React, { useState, useEffect } from "react";
import { FiCheckCircle, FiXCircle } from "react-icons/fi";
import {handleError, handleSuccess} from "../../utils/toast";
const UserListModal = ({ 
    isOpenAssignModal, 
    setOpenAssignModal, 
    users, 
    title, 
    onSelect, 
    loading, 
    error }) => {
        
  const [selectedUsers, setSelectedUsers] = useState([]);

  useEffect(() => {
    // Reset selected users when the modal is opened
    if (isOpenAssignModal) {
      setSelectedUsers([]);
    }
  }, [isOpenAssignModal]);

  const handleToggleSelect = (userId) => {
    setSelectedUsers((prevSelectedUsers) =>
      prevSelectedUsers.includes(userId)
        ? prevSelectedUsers.filter((id) => id !== userId)
        : [...prevSelectedUsers, userId]
    );
  };

  const handleSelectAll = () => {
    setSelectedUsers(users?.map((user) => user?._id) || []); // Select all users, use optional chaining to avoid errors
  };

  const handleSubmit = () => {
    if (selectedUsers?.length > 0) {
      onSelect(selectedUsers); // Send selected users back to the parent
      handleSuccess({success:"Users assigned successfully"});
      setOpenAssignModal(false); // Close modal after selection
    } else {
        handleError({ error: "Please select at least one user." });
      return
    }
  };

  return (
    isOpenAssignModal && (
      <div className="fixed inset-0 flex justify-center items-center bg-gray-900 bg-opacity-50 z-50">
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-lg w-full">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100">{title}</h2>
            <button onClick={() => setOpenAssignModal(false)} className="text-gray-500 dark:text-gray-400">
              <FiXCircle className="text-2xl" />
            </button>
          </div>

          <div className="mt-4">
            {/* Loading State */}
            {loading ? (
              <div className="flex justify-center items-center py-4">
                <div className="animate-spin border-t-4 border-blue-600 w-8 h-8 rounded-full"></div>
                <span className="ml-2 text-gray-600 dark:text-gray-300">Loading...</span>
              </div>
            ) : error ? (
              <div className="text-red-600 dark:text-red-400">{error}</div>
            ) : (
              <>
                {/* Select All Button */}
                <button
                  onClick={handleSelectAll}
                  className="mb-4 text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-500"
                >
                  Select All
                </button>

                {/* User List */}
                <ul className="space-y-2">
                  {users?.length > 0 ? (
                    users.map((user) => (
                      <li key={user?._id} className="flex items-center">
                        <input
                          type="checkbox"
                          checked={selectedUsers?.includes(user?._id)}
                          onChange={() => handleToggleSelect(user?._id)}
                          className="mr-2"
                        />
                        <span className="text-gray-800 dark:text-gray-100">{user?.name}</span>
                      </li>
                    ))
                  ) : (
                    <li>No users found</li>
                  )}
                </ul>
              </>
            )}
          </div>

          <div className="mt-6 flex justify-end">
            <button
              onClick={handleSubmit}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
            >
              Confirm Selection
            </button>
          </div>
        </div>
      </div>
    )
  );
};

export default UserListModal;
