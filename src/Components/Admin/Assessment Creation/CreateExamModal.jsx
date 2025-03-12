import { useState } from "react";
import axios from "axios";
import { handleSuccess, handleError } from "../../../utils/toast";
import { useNavigate, useParams } from "react-router";
import { motion, AnimatePresence } from "framer-motion";
import {
  Loader2,
  X,
  FileText,
  CheckCircle,
  AlertCircle,
  RefreshCcw,
} from "lucide-react";
import { FetchAiModelsApi } from "../../../services/Admin/AiModels/FetchAiModelsApi";
import { FetchAllGrade } from "../../../services/Admin/FetchAllGrade";
const VITE_API_URL = import.meta.env.VITE_API_URL;

const CreateExamModal = ({ assessment, setShowCreateAssessmentModal }) => {
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const { courseid } = useParams();
  const [selectedAiModel, setSelectedAiModel] = useState(null); // New state for selected AI model

  const [selectedGrade, setSelectedGrade] = useState(null);

  

  const {
    data: all_aiModalCombo,
    isLoading: isLoadingAiModels,
    refetch: refetchAiModels,
  } = FetchAiModelsApi();
  const {
    data: all_fetched_grades,
    isLoading: isLoadingGrades,
    refetch: refetchGrades,
  } = FetchAllGrade();

  // console.log("all_aiiModalCombo", all_aiModalCombo);
  // console.log("all_fetched_grades", all_fetched_grades);

  const navigate = useNavigate();

  const createExam = async (assessment) => {
    if (!assessment) return;

    setProcessing(true);
    setError(null);

    const newAssessmentFiles = {
      course_id: courseid,
      fileId: assessment?._id,
      assessment_name: assessment?.title,
      grade_id: selectedGrade?._id,
      ai_model_id: selectedAiModel?._id, // Send the selected AI model ID
    };

    // console.log("newAssessmentFiles", newAssessmentFiles);

    try {
      const response = await axios.post(
        `${VITE_API_URL}/api/assessments/createassesment`,
        newAssessmentFiles,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      // console.log("Response from AI API received:", response.data);

      setSuccess(true);
      handleSuccess({ success: "Assessment Created Successfully!" });
    } catch (error) {
      setError(error.response?.data?.message || "Failed to create assessment");
      handleError({ error: "Failed to create assessment. Try again." });
    } finally {
      setProcessing(false);
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/60 backdrop-blur-sm flex justify-center items-center z-50 p-4"
      >

        
        

        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          className="bg-white dark:bg-gray-800 rounded-2xl w-full max-w-lg overflow-hidden shadow-xl"
        >
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b dark:border-gray-700">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-50 dark:bg-blue-900/30 rounded-lg">
                <FileText className="h-6 w-6 text-blue-500 dark:text-blue-400" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                  Create New Assessment
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                  From: {assessment?.title || "Untitled Assessment"}
                </p>
              </div>
            </div>
            <button
              onClick={() => navigate(`/home/view/all-assessments/${courseid}`)}
              className="p-2 text-gray-400 hover:text-gray-500 dark:text-gray-500 dark:hover:text-gray-400 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* AI Model Selection */}
          <div className="p-6">
            <label className="block text-sm font-medium text-gray-700">
              Select AI Model
            </label>
            <select
              value={selectedAiModel?._id || ""}
              onChange={(e) =>
                setSelectedAiModel(
                  all_aiModalCombo?.data.find(
                    (model) => model._id === e.target.value
                  )
                )
              }
              className="block w-full mt-1 border-gray-300 rounded-md shadow-sm"
            >
              <option value="">{all_aiModalCombo?.data?.length === 0 ? "No AI Models Available please create one" : "Select an AI Model"}</option>
              {all_aiModalCombo?.data.map((model) => (
                <option key={model._id} value={model._id}>
                  {`${model.llm_name[0]} & ${model.llm_name[1]} (${model.model_type[0]} / ${model.model_type[1]})`}
                </option>
              ))}
            </select>
          </div>


          {/* Grade Selection */}
<div className="p-6">
  <label className="block text-sm font-medium text-gray-700">
    Select Grade
  </label>
  <select
    value={selectedGrade?._id || ""}
    onChange={(e) => 
      setSelectedGrade(
        all_fetched_grades?.find((grade) => grade._id === e.target.value)
      )
    }
    className="block w-full mt-1 border-gray-300 rounded-md shadow-sm"
  >
    <option value="">
      {all_fetched_grades?.length === 0
        ? "No grades available, please create one"
        : "Select a Grade"}
    </option>
    {all_fetched_grades?.map((grade) => (
      <option key={grade._id} value={grade._id}>
        {grade.name} {/* Display grade name here */}
      </option>
    ))}
  </select>
</div>




          {/* Content */}
          <div className="p-6">
            <AnimatePresence mode="wait">
              {processing && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="flex flex-col items-center py-8"
                >
                  <Loader2 className="h-12 w-12 text-blue-500 animate-spin" />
                  <h2 className="mt-4 text-lg font-medium text-gray-900 dark:text-gray-100">
                    Processing Exam Data
                  </h2>
                  <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                    Please wait while we create your assessment...
                  </p>
                </motion.div>
              )}

              {error && !processing && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="flex items-center gap-3 p-4 bg-red-50 dark:bg-red-900/30 rounded-lg"
                >
                  <AlertCircle className="h-5 w-5 text-red-500 dark:text-red-400" />
                  <p className="text-sm text-red-600 dark:text-red-400">
                    {error}
                  </p>
                </motion.div>
              )}

              {success && !processing && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="flex flex-col items-center py-8"
                >
                  <div className="p-3 bg-green-100 dark:bg-green-900/30 rounded-full">
                    <CheckCircle className="h-8 w-8 text-green-500 dark:text-green-400" />
                  </div>
                  <h2 className="mt-4 text-lg font-medium text-gray-900 dark:text-gray-100">
                    Assessment Created Successfully! 🎉
                  </h2>
                  <p className="mt-2 text-sm text-center text-gray-500 dark:text-gray-400">
                    The assessment is now available to candidates. You can close
                    this window.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-end gap-3 px-6 py-4 bg-gray-50 dark:bg-gray-800/50 border-t dark:border-gray-700">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => {
                navigate(`/home/view/all-assessments/${courseid}`);
              }}
              className={`button-style-close -pointer  `}
              disabled={processing}
            >
              {processing ? "please wait" : "Close"}
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => createExam(assessment)}
              disabled={processing || success}
              className={`px-4 py-2 text-sm font-medium text-white rounded-lg focus:outline-none 
                         focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:focus:ring-offset-gray-800 
                         transition-colors ${
                           processing || success
                             ? "bg-gray-400 cursor-not-allowed"
                             : "bg-blue-500 hover:bg-blue-600"
                         }`}
            >
              { processing
                ? "Creating..."
                : success
                ? "Created!"
                : "Create Assessment"}
            </motion.button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default CreateExamModal;
