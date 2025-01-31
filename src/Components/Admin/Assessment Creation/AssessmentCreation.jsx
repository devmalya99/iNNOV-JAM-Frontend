import React, { useState } from "react";
import { motion } from "framer-motion";
import { useParams } from "react-router";
import { 
  Check, RefreshCcw, Users, X, Upload, 
  Eye, Plus, FileText, Loader2, 
  CloudDownload,
  Cloud,
  File
} from "lucide-react";
import { FetchCourseAssessments } from "../../../services/FetchCourseAssessments";
import axios from "axios";
import { FaSpinner } from "react-icons/fa";
import { SiTicktick } from "react-icons/si";

const VITE_API_URL = import.meta.env.VITE_API_URL;


const AssessmentCreation = () => {
  const { courseid } = useParams();
  const { data, isLoading, refetch } = FetchCourseAssessments(courseid);
  const [file, setFile] = useState({});
  const [selectedFileName, setSelectedFileName] = useState({});
  const [creationState, setCreationState] = useState({});


  // Handle file upload
  const handleFileUpload = (event,assessmentId) => {
    const uploadedFile = event.target.files[0];
    setFile((prev) => ({...prev, [assessmentId]: uploadedFile}));
    setCreationState((prev) => ({...prev, [assessmentId]: "file-selected"}));
  };


  // Handle submit files
  const submitFiles = async (assessmentId,name) => {

    if (!file[assessmentId]) return;
    
    setCreationState((prev)=>({...prev, [assessmentId]:"uploading"}));

    const formData = new FormData();
    formData.append("title", name);
    formData.append("file", file[assessmentId]);

    try {
      const result = await axios.post(
        `${VITE_API_URL}/api/upload-assesmentFiles`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      console.log(result);
      setFile((prev) => ({ ...prev, [assessmentId]: null })); // Clear file after upload
      setCreationState((prev) => ({
        ...prev,
        [assessmentId]: "file-upload-success",
      }));
      // fetchFiles(); // Refetch files after upload

    } catch (error) {
      console.error("Error uploading file:", error);
    }
    setCreationState((prev)=>({...prev,[assessmentId]:"file-upload-success"}));
  };

  const handleView = (id) => console.log(`View file: ${files}`);

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


                  {/* Choose File */}
                  <div className="relative flex-grow sm:flex-grow-0 min-w-[50px] sm:min-w-0">
  <label className="block w-full">
    <span className="sr-only">Choose file</span>
    <input
      type="file"
      className="block w-full text-sm text-gray-500
                 file:mr-4 file:py-2 file:px-4
                 file:rounded-lg file:border-0
                 file:text-sm file:font-semibold
                 file:bg-blue-500 file:text-white
                 hover:file:bg-blue-600
                 transition-colors duration-200
                 cursor-pointer "
    onChange={(e)=>handleFileUpload(e,assessment._id)}
      accept=".pdf,.doc,.docx,.txt"
    />
  </label>
</div>

                  {/* Upload button */}
                  <div
                    onClick={()=>submitFiles(assessment._id,assessment.name)}
                    className="flex items-center px-3 py-1.5  text-white rounded-lg transition-colors"
                  >
                    
                   


                      { creationState[assessment._id]==="file-selected" && (<div className="flex button-style">
                        <Upload className="w-4 h-4 mr-2" />
                        <p>Upload</p>
                      </div>)
                      }

                      {creationState[assessment._id]==="uploading" && (
                        <div className="flex button-style">                          <FaSpinner className="animate-spin" />
                        </div>
                      )}

                      {creationState[assessment._id]==="file-upload-success" && (
                        <div className="flex button-style">
                          <SiTicktick size={20}/>
                        </div>
                        )
                      }
                      
                      
                  </div>



                  {/* View Assessment button */}

                  {
                    creationState==="assessment-creation-completed" && 
                    <button
                    onClick={() => handleView(assessment._id)}
                    className="flex items-center px-3 py-1.5 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-colors"
                  >
                    <Eye className="w-4 h-4 mr-2" />
                    <span className="text-sm">View</span>
                  </button>
                  }
                  
                  

                  {/* Create button */}

                  {
                    creationState[assessment._id]==="file-upload-success" 
                    &&
                    <button
                    onClick={() => handleCreate(assessment._id)}
                    className="flex items-center px-3 py-1.5 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    <span className="text-sm">Create</span>
                  </button>
                    
                  }
                  
                  
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
            <span>Save Assessments</span>
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default AssessmentCreation;