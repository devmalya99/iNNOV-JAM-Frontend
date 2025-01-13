import React from 'react';
import { FaEdit, FaTrashAlt, FaPlus } from 'react-icons/fa'; // Importing icons

// Dummy data for assessors
const assessorsData = [
  { id: 1, name: 'Thomas Green', position: 'Lead Assessor' },
  { id: 2, name: 'Emma Stone', position: 'Senior Assessor' },
  { id: 3, name: 'James Taylor', position: 'Junior Assessor' },
  { id: 4, name: 'Olivia Brown', position: 'Assessor' }
];

const AssignTSC = () => {
  return (
    <div className="p-6 bg-white dark:bg-gray-800 shadow-lg rounded-xl m-4">
      {/* Add Assessor Button */}
      <div className="flex justify-end mb-4">
        <button className="bg-blue-500 text-white rounded-lg px-6 py-2 hover:bg-blue-600 transition duration-300">
          <FaPlus className="inline mr-2" /> Add Assessor
        </button>
      </div>

      {/* Assessors List */}
      <div>
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-6">Assigned Assessors</h2>

        <div className="space-y-4">
          {assessorsData.map((assessor) => (
            <div key={assessor.id} className="flex justify-between items-center bg-gray-100 dark:bg-gray-700 p-4 rounded-xl">
              <div>
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white">{assessor.name}</h3>
                <p className="text-gray-600 dark:text-white">{assessor.position}</p>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4">
                <button className="text-yellow-500 hover:text-yellow-600">
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

export default AssignTSC;
