import React, { useState } from 'react';
import useGradeStore from '../../../store';
import { handleError } from '../../../utils/toast';

const GradeInput = () => {
  // State to hold the grades and the current form input values
  const { grades, addGrade } = useGradeStore();
  const [gradeName, setGradeName] = useState('');
  const [rangeStart, setRangeStart] = useState();
  const [rangeEnd, setRangeEnd] = useState();
  const [isFormVisible, setIsFormVisible] = useState(false);

  // Grade start and end ranges
  const startRanges = [50, 60, 70, 80, 90];
  const endRanges = [60, 70, 80, 90, 100];

  // Function to handle form submission
  const handleSaveAndAdd = () => {
    if (!gradeName) {
      alert('Please provide a Grade label');
      return;
    }
  
    // Convert rangeStart and rangeEnd to numbers for correct comparison
    const start = Number(rangeStart);
    const end = Number(rangeEnd);
  
    if (gradeName && start && end && start < end) {
      // Add the new grade to the grades list
      addGrade({
        name: gradeName,
        start: start,
        end: end,
      });
      // Clear the form fields after submission
      setGradeName('');
      setRangeStart('');
      setRangeEnd('');
      setIsFormVisible(false);
      console.log("grades", grades);
    } else {
      handleError({ error: 'Starting Range must be lower than ending range' });
      return;
    }
  };
  

  return (
    <div className="flex justify-center min-h-screen  py-8">
      <div className="max-w-4xl w-full px-6 sm:px-8 lg:px-12">
        {/* Left Section: Form to create grades */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 mb-8">
          {/* Button to toggle form visibility */}
          <button
            onClick={() => setIsFormVisible(!isFormVisible)}
            className="w-full px-6 py-3 text-lg font-semibold bg-blue-600 text-white dark:bg-blue-500 dark:hover:bg-blue-400 rounded-lg hover:bg-blue-700 transition duration-300"
          >
            {isFormVisible ? 'Cancel' : 'Create New Grade'}
          </button>

          {/* Form to add new grade */}
          {isFormVisible && (
            <div className="mt-5 space-y-6">
              <div>
                <label className="block text-gray-700 dark:text-gray-200 font-medium">Grade Label</label>
                <input
                  type="text"
                  value={gradeName}
                  onChange={(e) => setGradeName(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  placeholder="Enter grade label"
                  required
                />
              </div>

              {/* Start Range Dropdown */}
              <div>
                <label className="block text-gray-700 dark:text-gray-200 font-medium">Start Range</label>
                <select
                  value={rangeStart}
                  onChange={(e) => setRangeStart(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                >
                  <option value="">Select start range</option>
                  {startRanges.map((range, index) => (
                    <option key={index} value={range}>
                      {range}
                    </option>
                  ))}
                </select>
              </div>

              {/* End Range Dropdown */}
              <div>
                <label className="block text-gray-700 dark:text-gray-200 font-medium">End Range</label>
                <select
                  value={rangeEnd}
                  onChange={(e) => setRangeEnd(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                >
                  <option value="">Select end range</option>
                  {endRanges.map((range, index) => (
                    <option key={index} value={range}>
                      {range}
                    </option>
                  ))}
                </select>
              </div>

              <button
                onClick={handleSaveAndAdd}
                className="w-full px-6 py-3 bg-green-600 text-white dark:bg-green-500 dark:hover:bg-green-400 rounded-lg hover:bg-green-700 transition duration-300"
              >
                Save and Add
              </button>
            </div>
          )}
        </div>

        {/* Right Section: Display Created Grades */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700">
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-6">Created Grades</h2>
          {grades.length > 0 ? (
            <ul className="space-y-4">
              {grades.map((grade, index) => (
                <li
                  key={index}
                  className="flex justify-between items-center text-lg text-gray-800 dark:text-white border-2 px-8 py-3 rounded-md gap-6 dark:border-gray-600"
                >
                  <div>{grade.name}</div>
                  <div className="flex justify-end text-gray-500 dark:text-gray-400 w-full">
                    ({grade.start} - {grade.end}) %
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500 dark:text-gray-400">No grades created yet.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default GradeInput;
