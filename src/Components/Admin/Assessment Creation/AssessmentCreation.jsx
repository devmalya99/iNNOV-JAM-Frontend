import React, { useState } from "react";
import { motion } from "framer-motion";
import { Plus, Upload, Check, EyeIcon, X } from "lucide-react";
import { FaSpinner } from "react-icons/fa";
import { SiTicktick } from "react-icons/si";
import axios from "axios";
import { useNavigate, useParams } from "react-router";
import { handleSuccess, handleError } from "../../../utils/toast";

const VITE_API_URL = import.meta.env.VITE_API_URL;

const AssessmentCreation = () => {
  const { courseid } = useParams();
  const navigate = useNavigate();

  const [assessments, setAssessments] = useState([]);
  const [files, setFiles] = useState({});
  const [creationState, setCreationState] = useState({});

  const addAssessment = () => {
    setAssessments([...assessments, { id: Date.now(), name: "" }]);
  };

  const updateAssessmentName = (id, name) => {
    setAssessments((prev) =>
      prev.map((assessment) =>
        assessment.id === id ? { ...assessment, name } : assessment
      )
    );
  };

  const handleFileUpload = (event, id) => {
    const uploadedFile = event.target.files[0];
    setFiles((prev) => ({ ...prev, [id]: uploadedFile }));
    setCreationState((prev) => ({ ...prev, [id]: "file-selected" }));
  };

  const submitFiles = async (id, name) => {
    if (!files[id]) return;
    setCreationState((prev) => ({ ...prev, [id]: "uploading" }));

    const formData = new FormData();
    formData.append("title", name);
    formData.append("file", files[id]);

    try {
      await axios.post(`${VITE_API_URL}/api/upload-assesmentFiles`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setCreationState((prev) => ({ ...prev, [id]: "file-upload-success" }));
    } catch (error) {
      console.error("Error uploading file:", error);
      handleError({ errors: "File upload failed. Try again." });
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur-md z-50 p-4">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        className="bg-white dark:bg-[#252527] p-4 sm:p-6 rounded-xl w-full max-w-4xl shadow-xl"
      >
        {/* Header */}
        <div className="flex justify-between items-center mb-6 pb-4 border-b dark:border-gray-700">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            Create Assessments
          </h2>
          <button
            onClick={addAssessment}
            className="flex items-center px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition"
          >
            <Plus className="w-5 h-5 mr-2" />
            Add Assessment
          </button>
        </div>

        {/* Assessment List */}
        <div className="space-y-4">
          {assessments.map((assessment) => (
            <div
              key={assessment.id}
              className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg flex flex-col sm:flex-row sm:items-center justify-between gap-4"
            >
              {/* Input for Assessment Name */}
              <input
                type="text"
                placeholder="Assessment Name"
                value={assessment.name}
                onChange={(e) => updateAssessmentName(assessment.id, e.target.value)}
                className="border p-2 rounded-md w-full sm:w-1/2"
              />

              {/* File Upload */}
              <input
                type="file"
                onChange={(e) => handleFileUpload(e, assessment.id)}
                accept=".pdf,.doc,.docx,.txt"
                className="cursor-pointer text-sm"
              />

              {/* Upload Button */}
              {creationState[assessment.id] === "file-selected" && (
                <button
                  onClick={() => submitFiles(assessment.id, assessment.name)}
                  className="px-3 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg"
                >
                  <Upload className="w-4 h-4 inline mr-2" />
                  Upload
                </button>
              )}

              {creationState[assessment.id] === "uploading" && (
                <FaSpinner className="animate-spin text-blue-500" />
              )}

              {creationState[assessment.id] === "file-upload-success" && (
                <SiTicktick size={20} className="text-green-500" />
              )}

              {/* Delete Assessment */}
              <button
                onClick={() =>
                  setAssessments((prev) => prev.filter((a) => a.id !== assessment.id))
                }
                className="text-red-500 hover:text-red-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-3 mt-6 pt-4 border-t dark:border-gray-700">
          <button
            onClick={() => navigate(`/home/view/all-assessments/${courseid}`)}
            className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg transition"
          >
            <EyeIcon className="w-4 h-4 inline mr-2" />
            View Assessments
          </button>
          <button
            onClick={() => {
              navigate(`/home`);
              handleSuccess({ success: "Assessments saved successfully" });
            }}
            className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition"
          >
            <Check className="w-4 h-4 inline mr-2" />
            Save Assessments
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default AssessmentCreation;
