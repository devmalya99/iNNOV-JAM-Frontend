import { useState } from "react";
import axios from "axios";
import { TbLoader } from "react-icons/tb"; // Loading spinner icon
const VITE_API_URL = import.meta.env.VITE_API_URL;
const CreateExamModal = ({ file, setShowCreateExamModal }) => {
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const createExam = async () => {
    setProcessing(true);
    setError(null);
    setSuccess(false);

    try {
      const response = await axios.post(
        `${VITE_API_URL}/api/create-exam/${file._id}`
      );

      if (response.status === 200) {
        console.log("Exam creation started successfully.");
        setSuccess(true); // Mark as started
      } else {
        throw new Error("Unexpected response from server.");
      }
    } catch (error) {
      console.error("Error starting exam creation:", error);
      setError("Failed to start exam creation. Please try again.");
    } finally {
      setProcessing(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-90 flex justify-center items-center z-50">
      <div className="bg-white p-8 rounded-xl w-1/3 max-h-[80vh] overflow-auto">
        <h3 className="text-xl mb-4">Creating Exam from: {file.title}</h3>

        {processing && (
          <div className="flex justify-center items-center py-4">
            <TbLoader className="animate-spin text-4xl text-blue-500" />
            <h1 className="ml-4 text-lg text-gray-700">
              Processing exam data...
            </h1>
            <p className="text-gray-700 text-lg">This may take a while...</p>

          </div>
        )}

        {error && <p className="text-red-500">{error}</p>}

        {success && !processing && (
          <div className="mt-4">
            <h4 className="text-lg font-semibold">
              Assessment Created Successfully! 🎉
            </h4>
            <p className="mt-2 text-gray-700">
              Assessment is now available to candidates.
            </p>
          </div>
        )}

        <div className="mt-6 flex justify-end gap-4">
          <button
            onClick={() => setShowCreateExamModal(false)}
            className="bg-gray-300 text-black rounded-lg px-6 py-3"
          >
            Close
          </button>
          <button
            onClick={createExam}
            className="bg-blue-500 text-white rounded-lg px-6 py-3"
          >
            Start Exam Creation
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateExamModal;
