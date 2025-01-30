import React, { useState } from "react";
import { motion } from "framer-motion";
import { useParams } from "react-router";
import { 
  Check, RefreshCcw, Users, X, Upload, 
  Eye, Plus, FileText, Loader2 
} from "lucide-react";
import { FetchCourseAssessments } from "../../../services/FetchCourseAssessments";

const AssessmentCreation = () => {
  const { courseid } = useParams();
  const { data, isLoading, refetch } = FetchCourseAssessments(courseid);
  const [files, setFiles] = useState({});
  const [selectedFileName, setSelectedFileName] = useState({});

  const handleFileChange = (id, event) => {
    const file = event.target.files[0];
    if (file) {
      setFiles((prev) => ({ ...prev, [id]: file }));
      setSelectedFileName((prev) => ({ ...prev, [id]: file.name }));
    }
  };

  const handleUpload = (id) => {
    if (!files[id]) {
      console.log(`No file selected for assessment ID: ${id}`);
      return;
    }
    console.log(`Uploading file for Assessment ID: ${id}`, files[id]);
  };

  const handleView = (id) => console.log(`View Assessment ID: ${id}`);
  const handleCreate = (id) => console.log(`Create new assessment for ID: ${id}`);

  if (!courseid) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-md z-50 p-4">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        className="bg-white dark:bg-gray-900 p-4 sm:p-6 rounded-xl w-full max-w-4xl shadow-xl"
      >
        {/* Header */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6 pb-4 border-b dark:border-gray-700">
          <div className="flex items-center gap-3">
            <Users size={24} className="text-blue-500" />
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              Assessments
            </h2>
          </div>
          <div className="flex gap-2">
            <button
              onClick={refetch}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg"
            >
              <RefreshCcw size={20} className="text-gray-500 dark:text-gray-400" />
            </button>
            <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg">
              <X size={20} className="text-gray-500 dark:text-gray-400" />
            </button>
          </div>
        </div>

        {/* Assessment List */}
        <div className="space-y-3">
          {isLoading ? (
            <div className="flex justify-center py-8">
              <Loader2 className="w-6 h-6 text-blue-500 animate-spin" />
            </div>
          ) : data?.assessments?.length > 0 ? (
            data.assessments.map((assessment, index) => (
              <motion.div
                key={assessment._id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-750 transition-colors gap-4"
              >
                {/* Assessment Info */}
                <div className="flex items-center gap-3">
                  <FileText className="w-5 h-5 text-gray-400 flex-shrink-0" />
                  <span className="font-medium text-gray-700 dark:text-gray-200">
                    {assessment.name || `Assessment ${index + 1}`}
                  </span>
                </div>

                {/* Actions */}
                <div className="flex flex-wrap items-center gap-3">
                  <div className="relative flex-grow sm:flex-grow-0 min-w-[200px] sm:min-w-0">
                    <label className="flex items-center px-3 py-1.5 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 rounded-lg cursor-pointer transition-colors group">
                      <Upload className="w-4 h-4 mr-2 text-gray-600 dark:text-gray-300 group-hover:scale-105 transition-transform" />
                      <span className="text-sm text-gray-600 dark:text-gray-300 truncate">
                        {selectedFileName[assessment._id] || "Choose file"}
                      </span>
                      <input
                        type="file"
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                        onChange={(e) => handleFileChange(assessment._id, e)}
                        accept=".pdf,.doc,.docx,.txt"
                      />
                    </label>
                  </div>
                  
                  <button
                    onClick={() => handleView(assessment._id)}
                    className="flex items-center px-3 py-1.5 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-colors"
                  >
                    <Eye className="w-4 h-4 mr-2" />
                    <span className="text-sm">View</span>
                  </button>
                  
                  <button
                    onClick={() => handleCreate(assessment._id)}
                    className="flex items-center px-3 py-1.5 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    <span className="text-sm">Create</span>
                  </button>
                </div>
              </motion.div>
            ))
          ) : (
            <div className="text-center py-8 text-gray-500 dark:text-gray-400">
              No assessments found.
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex flex-col-reverse sm:flex-row justify-end gap-3 mt-6 pt-4 border-t dark:border-gray-700">
          <button className="w-full sm:w-auto px-4 py-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors">
            Cancel
          </button>
          <button className="w-full sm:w-auto flex items-center justify-center gap-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors">
            <Check size={18} />
            <span>Assign Selected</span>
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default AssessmentCreation;