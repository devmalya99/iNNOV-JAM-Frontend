import React from 'react';
import { FaEdit, FaTrashAlt, FaPlus } from 'react-icons/fa'; // Importing icons
import UnderDevelopment from '../UnderDevelopmentComponent';

// Dummy data for learners
const learnersData = [
  { id: 1, name: 'Alice Johnson', course: 'JavaScript Fundamentals' },
  { id: 2, name: 'David Lee', course: 'React Basics' },
  { id: 3, name: 'Sophia Williams', course: 'Node.js for Beginners' },
  { id: 4, name: 'Michael Brown', course: 'Python Programming' }
];

const AssignLearner = () => {
  return (
    <div className="p-6 m-4  bg-white
     dark:bg-gray-800 shadow-lg rounded-xl">
      
      {/* Under Development feature */}
      <UnderDevelopment content={"This feature will allow Admins to assign learners to courses."}/> 
      
      {/* Add Learner Button */}
      <div className="flex justify-end mb-4">
        <button className="bg-blue-500 text-white rounded-lg px-6 py-2 hover:bg-blue-600 transition duration-300">
          <FaPlus className="inline mr-2" /> Add Learner
        </button>
      </div>

      {/* Learners List */}
      <div>
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-6">Assigned Learners</h2>

        <div className="space-y-4">
          {learnersData.map((learner) => (
            <div key={learner.id} className="flex justify-between items-center bg-gray-100 dark:bg-gray-700 p-4 rounded-xl">
              <div>
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white">{learner.name}</h3>
                <p className="text-gray-600 dark:text-white">{learner.course}</p>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4">
                <button className="text-green-600 hover:text-yellow-600">
                  <FaEdit size={20} />
                </button>
                <button className="text-red-500 hover:text-red-600">
                  <FaTrashAlt size={20} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AssignLearner;
