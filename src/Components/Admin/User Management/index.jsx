import React, { useEffect, useState } from "react";
import { FetchAllUsers } from "../../../services/FetchAllUsers";
import { motion, AnimatePresence } from "framer-motion";
import {
  Users,
  UserCog,
  GraduationCap,
  ClipboardCheck,
  RotateCw,
  Search,
  Edit2,
  Trash2,
  Calendar,
  RefreshCw,
  Delete,
  ChartColumnStacked,
} from "lucide-react";
import EditUserModal from "./EditUserModal";
import DeleteUserModal from "./DeleteUserModal";
import { deleteUser } from "../../../services/Admin/UseDeleteUser";
import { FaUserAstronaut } from "react-icons/fa";
import {  useMutation, useQueryClient } from "react-query";
import UpdateAssignedCourses from "./UpdateAssignedCourses";
import { handleError } from "../../../utils/toast";

const UserManagement = () => {

  // Declare queryClient first so it's available for useEffect
  const queryClient = useQueryClient();


  const { data: All_Users_Data, refetch, isLoading } = FetchAllUsers();

   // Force a refetch when the component mounts
   useEffect(() => {
    queryClient.invalidateQueries(["allUsers"]);
    refetch();
  }, [refetch]);



  const [deleteModal, setDeleteModal] = useState({ isOpen: false, user: null });

  const [EditUserCoursesModalStatus, setEditUserCoursesModalStatus] = useState({ isOpen: false, user: null });

  const [EditUserModalStatus, setEditUserModalStatus] = useState({ isOpen: false, user: null });

  // Mutation Function to delete users

  const DeleteUserMutation = useMutation({
    mutationFn: (userId) => deleteUser(userId),
    onSuccess: (data, userId) => {
      
      // Invalidate the query to force a refetch.
      queryClient.invalidateQueries(["allUsers"]);     
    },
    onError: (error) => {
      // Use the error message returned from the `deleteUser` function
    handleError({ errors: error.message || "Assigned learners can't be deleted" });
      console.error("Error deleting user:", error.message);
    },
  });

  // const [searchTerm, setSearchTerm] = useState('');

  const handleCourseUpdate=(user)=>{
    setEditUserCoursesModalStatus({ isOpen: true, user: user });
    // console.log("edit courses  for user",user);
  }

  const handleDelete = (user) => {
    console.log("Deleting user:", user);
    setDeleteModal({ isOpen: true, user: user });
  };

  const handleEdit = (user) => {
    // Implement edit functionality
    // console.log("Edit user:", user);
    setEditUserModalStatus({ isOpen: true, user: user });
  };

  const handleConfirmDelete = async (user) => {
    if (user.role === "super_admin") {
      alert("Super Admin cannot be deleted");
      setDeleteModal({ isOpen: false, user: null });
      return;
    }



    // Call mutate and let onSuccess handle refetch/invalidation
  DeleteUserMutation.mutate(user._id);
  setDeleteModal({ isOpen: false, user: null });


  };

  const UserTable = ({ users, title, icon: Icon }) => (
    <div className="mb-8 bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
      <div className="p-6 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Icon className="w-6 h-6 text-blue-500" />
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              {title}
            </h2>
            <span className="px-3 py-1 text-sm bg-blue-100 text-blue-600 rounded-full">
              {users?.length || 0} users
            </span>
          </div>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 dark:bg-gray-700">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Email
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Course Code
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
            {users?.map((user) => (
              <motion.tr
                key={user._id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="hover:bg-gray-50 dark:hover:bg-gray-700/50"
              >
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900 dark:text-white">
                    {user.name}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-500 dark:text-gray-300">
                    {user.email}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-500 dark:text-gray-300">
                    {user.course_code?.join(", ") || "-"}
                    <button
                      onClick={() => handleCourseUpdate(user)}
                      className="p-1 text-blue-600 hover:bg-blue-100 rounded transition-colors"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                  
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEdit(user)}
                      className="p-1 text-blue-600 hover:bg-blue-100 rounded transition-colors"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(user)}
                      className="p-1 text-red-600 hover:bg-red-100 rounded transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  if (isLoading) {
    return (
      <div className=" refetch button flex items-center justify-center min-h-screen">
        <RefreshCw className="w-8 h-8 animate-spin text-blue-500" />
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6 max-w-7xl h-[calc(100vh-80px)] overflow-y-auto">
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            User Management
          </h1>

          {/* Search user feature */}
          {/* <div className="relative">
            <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search users..."
              className="pl-10 pr-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div> */}

          <button
            onClick={() => refetch()}
            className="p-2 mx-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
          >
            <div  className="flex gap-2 button-style">
              <span>Get Latest data</span>
              <RefreshCw
              className={`w-5 h-5 text-gray-500  
            `}
            />
            </div>
            
          </button>
        </div>
      </div>

      <UserTable
        users={All_Users_Data?.superadmin}
        title="Super Admins"
        icon={FaUserAstronaut}
      />

      <UserTable
        users={All_Users_Data?.admins}
        title="Admins"
        icon={UserCog}
      />

      <UserTable
        users={All_Users_Data?.trainers}
        title="Trainer"
        icon={ChartColumnStacked}
      />

      <UserTable
        users={All_Users_Data?.learners}
        title="Learners"
        icon={GraduationCap}
      />
      <UserTable
        users={All_Users_Data?.assessors}
        title="Assessors"
        icon={ClipboardCheck}
      />

      {/* Edit User courses */}

      {/* Edit Profile Modal */}
      <UpdateAssignedCourses
        isOpen={EditUserCoursesModalStatus.isOpen}
        onClose={() => setEditUserCoursesModalStatus({ isOpen: false, user: null })}
        // onConfirm={() => handleConfirmDelete(deleteModal.user)}
        user={EditUserCoursesModalStatus.user}
      />



      {/* Edit Profile Modal */}
      <EditUserModal
        isOpen={EditUserModalStatus.isOpen}
        onClose={() => setEditUserModalStatus({ isOpen: false, user: null })}
        // onConfirm={() => handleConfirmDelete(deleteModal.user)}
        user={EditUserModalStatus.user}
      />



      {/* Delete Confirmation Modal */}
      <DeleteUserModal
        isOpen={deleteModal.isOpen}
        onClose={() => setDeleteModal({ isOpen: false, user: null })}
        onConfirm={() => handleConfirmDelete(deleteModal.user)}
        itemName={`${deleteModal.user?.name}'s account`}
      />
    </div>
  );
};

export default UserManagement;
