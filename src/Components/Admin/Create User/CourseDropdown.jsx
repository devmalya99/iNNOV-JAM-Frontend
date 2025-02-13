import React, { useEffect, useState } from "react";
import { handleSuccess } from "../../../utils/toast";
import handleCreateUsers from "../../../services/handleCreateUsers";
import { useFetchAllCourses } from "../../../services/FetchAllCourses";
import { useNavigate } from "react-router";

// --- Reusable Components ---

// 1. Course Selection Dropdown
const CourseDropdown = ({ courses, selectedCourses, onSelect, onRemove }) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleOpen = () => setIsOpen(!isOpen);

  return (
    <div className="relative w-64">
      <div
        className="border p-2 rounded cursor-pointer bg-white dark:bg-gray-700 dark:border-gray-600 dark:text-white "
        onClick={toggleOpen}
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
                    onRemove(code);
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
      {isOpen && (
        <ul className="absolute w-full border mt-1 bg-white shadow-md rounded">
          {courses.map((code) => (
            <li
              key={code}
              className={`p-2 bg-gray-300 border border-gray-200 cursor-pointer hover:bg-gray-200 flex justify-between`}
              onClick={() => onSelect(code)}
            >
              <span className="">{code}</span>
              {selectedCourses.includes(code) && <span>&#10003;</span>}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CourseDropdown;