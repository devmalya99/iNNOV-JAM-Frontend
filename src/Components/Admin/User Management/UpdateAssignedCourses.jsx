import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Check, RefreshCcwIcon, X } from "lucide-react";
import { UseUpdateUserCourses } from "../../../services/Admin/UpdateUserCourses/UseUpdateUserCourses";
import {useFetchAllCourses} from "../../../services/FetchAllCourses";
const UpdateAssignedCourses = ({ isOpen, onClose,user }) => {
  const [selectedCourses, setSelectedCourses] = useState([]);
  const [isAllSelected, setIsAllSelected] = useState(false);
  // Initialize our mutation hook
      const updateUserCoursesMutation = UseUpdateUserCourses();
  
      const { data: all_Courses_List = [], isLoading, refetch } = useFetchAllCourses();
      console.log("all_Courses_List", all_Courses_List);
      console.log("selected course code",selectedCourses);

  

  // Function to handle "Select All" functionality
  const handleSelectAll = () => {
    if (isAllSelected) {
      setSelectedCourses([]);
    } else {
      const allCourseCourse = all_Courses_List.map(course => course.course_code);
      setSelectedCourses(allCourseCourse);
    }
    setIsAllSelected(!isAllSelected);
  };

  // Function to handle individual course selection
  const handleSelect = (courseCode) => {
    setSelectedCourses(prev => {
      if (prev.includes(courseCode)) {
        const newSelection = prev.filter(code => code !== course_code);
        setIsAllSelected(false);
        return newSelection;
      } else {
        const newSelection = [...prev, courseCode];
        setIsAllSelected(newSelection.length === all_Courses_List.length);
        return newSelection;
      }
    });
  };

  const handleUpdateAssignedCourses = () => {
    console.log("Selected courses:", selectedCourses);
    // Add your update logic here
    updateUserCoursesMutation.mutate({userId: user?._id ,selectedCourses});
    onClose();
  };

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-50">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-white dark:bg-gray-800 p-8 rounded-xl w-[32rem] shadow-xl mx-4"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-semibold dark:text-white flex items-center gap-2">
                Select Courses
              </h2>

              <button
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
                onClick={() => refetch()}
              >
                <RefreshCcwIcon size={24} />
              </button>

              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
              >
                <X className="w-5 h-5 dark:text-gray-400" />
              </button>
            </div>

            <div className="mb-4">
              <label className="flex items-center gap-2 py-2 px-4 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg cursor-pointer">
                <input
                  type="checkbox"
                  checked={isAllSelected}
                  onChange={handleSelectAll}
                  className="w-4 h-4 rounded border-gray-300 text-blue-500 focus:ring-blue-500"
                />
                <span className="text-sm font-medium dark:text-white">
                  Select All Courses
                </span>
              </label>
            </div>

            <div className="h-[24rem] overflow-y-auto pr-2">
              {isLoading ? (
                <div className="space-y-3">
                  {Array.from({ length: 5 }).map((_, index) => (
                    <div key={index} className="h-16 bg-gray-300 dark:bg-gray-700 rounded-lg animate-pulse" />
                  ))}
                </div>
              ) : (
                <motion.ul className="space-y-3">
                  {all_Courses_List.map((course, index) => (
                    <motion.li
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      key={course._id}
                      className={`p-4 border dark:border-gray-700 rounded-xl transition-colors ${
                        selectedCourses.includes(course._id)
                          ? "bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800"
                          : "hover:bg-gray-50 dark:hover:bg-gray-700"
                      }`}
                    >
                      <label className="flex items-start gap-3 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={selectedCourses.includes(course?.course_code)}
                          onChange={() => handleSelect(course?.course_code)}
                          className="w-4 h-4 mt-1 rounded border-gray-300 text-blue-500 focus:ring-blue-500"
                        />
                        <div>
                          <p className="font-medium dark:text-white">{course.course_name}</p>
                          <p className="text-sm text-gray-500 dark:text-gray-400">Code: {course.course_code}</p>
                          <p className="text-sm text-gray-600 dark:text-gray-400">{course.description}</p>
                        </div>
                      </label>
                    </motion.li>
                  ))}
                </motion.ul>
              )}
            </div>

            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={onClose}
                className="px-4 py-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleUpdateAssignedCourses}
                className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg flex items-center gap-2 transition-colors"
              >
                <Check size={20} />
                Update Selected Courses
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </>
  );
};

export default UpdateAssignedCourses;