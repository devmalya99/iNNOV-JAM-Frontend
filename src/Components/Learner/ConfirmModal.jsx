import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import axios from "axios";
import {TbLoader} from 'react-icons/tb'
const ConfirmModal = () => {
  const navigate = useNavigate(); // Initialize useNavigate
  const { id } = useParams(); // Fetch the id from the URL
  const VITE_API_URL = import.meta.env.VITE_API_URL;
  
  const [submissionStatus, setSubmissionStatus] = useState(null);
  const [loading, setLoading] = useState(false);
  const [redirectCountdown, setRedirectCountdown] = useState(5);

  useEffect(() => {
    if (submissionStatus) {
      const countdownInterval = setInterval(() => {
        setRedirectCountdown((prev) => {
          if (prev === 1) {
            clearInterval(countdownInterval);
            navigate("/home");
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(countdownInterval);
    }
  }, [submissionStatus, navigate]);

  const handleConfirmSubmission = async (id) => {
    setLoading(true);
    try {
      const response = await axios.put(
        `${VITE_API_URL}/api/assigned-assessments/update-assessment/${id}`,
        { status: 'completed' },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      // console.log("Response received:", response);
      setSubmissionStatus("Assessment submitted successfully! Redirecting in 5 seconds...");
    } catch (error) {
      console.error("Error updating assessment status:", error);
      setSubmissionStatus("Error submitting assessment. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-90 flex justify-center items-center z-50">
      <div className={`flex px-4 py-2 rounded-xl h-1/4`}>
        <div className="flex flex-col justify-center items-center bg-gray-100 px-4 border py-2 rounded-lg dark:bg-gray-900">
          {submissionStatus ? (
            <p className="text-2xl mb-4 text-green-500">
              Assessment submitted successfully!
            </p>
          ) : (
            <>
              <p className="text-2xl mb-4 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-transparent bg-clip-text">
                Are you sure you want to submit this assessment?
              </p>
              <div className="mt-4">
                <button
                  onClick={() => handleConfirmSubmission(id)}
                  className="bg-green-500 text-white rounded-lg px-4 py-3 hover:bg-green-600"
                  disabled={loading}
                >
                  {loading ? (
                    <TbLoader className="animate-spin text-white"/>
                  ) : "Confirm Submission"}
                </button>
                {
                  loading ? (""):(<button
                    onClick={() => navigate(-1)}
                    className="bg-gray-300 hover:bg-blue-gray-500 text-black rounded-lg px-6 py-3 ml-4"
                  >
                    Cancel
                  </button>)
                }
                
              </div>
            </>
          )}
          {submissionStatus && <p className="text-sm text-gray-500 mt-2">Redirecting in {redirectCountdown} seconds...</p>}
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
