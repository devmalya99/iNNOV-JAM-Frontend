import { FaUserPlus } from "react-icons/fa";
import { Link } from "react-router";
import useCourseStore from "../../Zustand/useCourseStore";

const AssignSection = () => {
  const {setOpenAssignModal,isOpenAssignModal}=useCourseStore();
  return (
    <div className="space-y-6 p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
      {/* Assign to trainers */}
      <div 
      
      className="flex flex-col sm:flex-row justify-between items-center gap-4 p-4 bg-gradient-to-r from-blue-50 to-blue-100 dark:from-gray-700 dark:to-gray-800 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300">
        <p className="text-gray-700 dark:text-gray-300 font-semibold text-lg">
          Assign Trainers
        </p>
        <Link to="assign-trainers" 
        onClick={() => setOpenAssignModal(true)}
        className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg shadow-md hover:from-blue-600 hover:to-blue-700 transition-all duration-300">
          <FaUserPlus className="w-5 h-5" />
          <span>Assign +</span>
        </Link>
      </div>

      {/* Assign to learners */}
      <div 
      
      className="flex flex-col sm:flex-row justify-between items-center gap-4 p-4 bg-gradient-to-r from-green-50 to-green-100 dark:from-gray-700 dark:to-gray-800 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300">
        <p className="text-gray-700 dark:text-gray-300 font-semibold text-lg">
          Assign Learners
        </p>
        <Link to="assign-learners"  
        onClick={() => setOpenAssignModal(true)}
        className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg shadow-md hover:from-green-600 hover:to-green-700 transition-all duration-300">
          <FaUserPlus className="w-5 h-5" />
          <span>Assign +</span>
        </Link>
      </div>

      {/* Assign to assessors */}
      <div 
      className="flex flex-col sm:flex-row justify-between items-center gap-4 p-4 bg-gradient-to-r from-purple-50 to-purple-100 dark:from-gray-700 dark:to-gray-800 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300">
        <p className="text-gray-700 dark:text-gray-300 font-semibold text-lg">
          Assign Assessors
        </p>
        <Link to="assign-assessors"
        onClick={() => setOpenAssignModal(true)}
        className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-lg shadow-md hover:from-purple-600 hover:to-purple-700 transition-all duration-300">
          <FaUserPlus className="w-5 h-5" />
          <span>Assign +</span>
        </Link>
      </div>
    </div>
  );
};

export default AssignSection;