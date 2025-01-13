import React from 'react';
import { FaEdit, FaTrashAlt, FaPlus } from 'react-icons/fa'; // Importing icons

const trainersData = [
  { id: 1, name: 'John Doe', specialty: 'Digital Marketing' },
  { id: 2, name: 'Jane Smith', specialty: 'Sales' },
  { id: 3, name: 'Robert Brown', specialty: 'Finance' },
  { id: 4, name: 'Emily White', specialty: 'Web Development' }
];

const AssignTrainers = () => {
  return (
    <div className="p-6 bg-white dark:bg-gray-800 shadow-lg rounded-xl m-4">
      {/* Add Trainer Button */}
      <div className="flex justify-end mb-4">
        <button className="bg-blue-500 text-white rounded-lg px-6 py-2 hover:bg-blue-600 transition duration-300">
          <FaPlus className="inline mr-2" /> Add Trainer
        </button>
      </div>

      {/* Trainers List */}
      <div>
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-6">Assigned Trainers</h2>

        <div className="space-y-4">
          {trainersData.map((trainer) => (
            <div key={trainer.id} className="flex justify-between items-center bg-gray-100 dark:bg-gray-700 p-4 rounded-xl">
              <div>
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white">{trainer.name}</h3>
                <p className="text-gray-600 dark:text-white">{trainer.specialty}</p>
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

export default AssignTrainers;
