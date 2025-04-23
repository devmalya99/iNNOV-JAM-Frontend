import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { handleError } from "../../../utils/toast";

const UpdateGradeModal = ({ isOpen, onClose, grade, onUpdate }) => {
  const [formData, setFormData] = useState({
    label: '',
    startRange: '',
    endRange: ''
  });

  useEffect(() => {
    if (grade) {
      setFormData({
        label: grade.label || '',
        startRange: grade.startRange || '',
        endRange: grade.endRange || '',
        grade_id: grade?._id
      });
    }
  }, [grade]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      // Validate form data
      if (!formData.label) {
        handleError({errors: "Please enter a label"});
        return;
      }

      if (parseFloat(formData.startRange) >= parseFloat(formData.endRange)) {
        handleError({errors: "Start range must be less than end range"});
        return;
      }

      const response = await fetch(`http://192.168.1.54:7300/api/grade-ranges/update/${grade._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to update grade range');
      }

      const updatedGradeRange = await response.json();
      
      // Call onUpdate callback with updated data
      if (onUpdate) {
        onUpdate(updatedGradeRange.range);
      }
      
      onClose();
    } catch (error) {
      console.error("Error updating grade range:", error);
      handleError({errors: error.message || "Failed to update grade range"});
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/80 flex justify-center items-center z-50">
      <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl w-full max-w-md p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-red-500"
        >
          <X size={20} />
        </button>

        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
          Update Grade Range
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* <div>
            <label className="block text-sm text-gray-700 dark:text-gray-300 mb-1">
              Label
            </label>
            <select
              name="label"
              value={formData.label}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white"
              required
            >
              <option>Choose option</option>
              <option value="competent">competent</option>
              <option value="not-competent">not-competent</option>
            </select>
          </div> */}

          <div className="flex space-x-4">
            <div className="flex-1">
              <label className="block text-sm text-gray-700 dark:text-gray-300 mb-1">
                Start Range
              </label>
              <input
                type="number"
                name="startRange"
                value={formData.startRange}
                min={0}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white"
                required
              />
            </div>

            <div className="flex-1">
              <label className="block text-sm text-gray-700 dark:text-gray-300 mb-1">
                End Range
              </label>
              <input
                type="number"
                name="endRange"
                value={formData.endRange}
                max={10}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition"
          >
            Update Grade
          </button>
        </form>
        
      </div>
    </div>
  );
};

export default UpdateGradeModal;