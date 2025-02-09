import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import evaluate from "../../hooks/useEvaluate";
import { handleError, handleSuccess } from "../../utils/toast";
import { useFetchAssessmentData } from "../../hooks/useFetchAssessmentData";
import { updateAssessmentData } from "../../services/updateAssessment";

const ConfirmModal = () => {
  const navigate = useNavigate(); // Initialize useNavigate
  const { id } = useParams(); // Fetch the id from the UR

  const { data, refetch } = useFetchAssessmentData(id); // Fetch assessment data
    
  useEffect(() => {
      refetch();
    }, [refetch]);
 
  const [isLoading, setIsLoading] = useState(false); // Loading state for spinner
  
  const [currentDummyIndex, setCurrentDummyIndex] = useState(0);

  const dummyData = [
    "Initializing submission process...",
    "Setting up secure connection protocols...",
    "Authenticating credentials using multi-factor authentication...",
    "Verifying user identity...",
    "this will take less than 30 seconds...",
    
    "Connecting to evaluation service endpoints...",
    "Uploading assessment data...",
    "this will take less than 30 seconds...",
    "Analyzing input data structure...",
    "Validating assessment data for accuracy...",
    
    "Evaluating learner responses using AI models...",
    "Generating feedback reports with personalized insights...",
    "Cross-referencing learner responses against knowledge base...",
    "this will take less than 30 seconds...",
    "Performing sentiment analysis on learner responses...",
    
    "Encrypting learner data with AES-256 encryption...",
    "Storing evaluation data in secure data centers...",
    "Generating final assessment summary reports...",
    "Syncing feedback data to learner accounts..."
    
  ];
  

  // Handle dummy data updates
  useEffect(() => {
    let interval;
    if (isLoading) {
      interval = setInterval(() => {
        setCurrentDummyIndex((prevIndex) =>
          prevIndex < dummyData.length - 1 ? prevIndex + 1 : 0
        );
      }, 1100);
    }

    return () => clearInterval(interval);
  }, [isLoading]);
  
 

  if (!data) {
    console.error("Data not available for evaluation");
    return;
  }

  const processFinalEvaluatedData = (aiResponse,data) => {
    const processedData = data?.data?.map((item, index) => {
      //update the item with the new updated field
      return {
        ...item,
        feedback: aiResponse.results[index].feedback,
        gemini_score: aiResponse.results[index].gemini_score,
        gpt_score: aiResponse.results[index].gpt_score,
        sbert_score: aiResponse.results[index].sbert_score,
        roberta_score: aiResponse.results[index].roberta_score,
        distilroberta_score: aiResponse.results[index].distilroberta_score,
        t5_score: aiResponse.results[index].t5_score,
        minilm_score: aiResponse.results[index].minilm_score,
        labse_score: aiResponse.results[index].labse_score,
      };
    });
    return processedData;
  };

  const handleConfirmSubmission = async (data) => {
    setIsLoading(true); // Start loading spinner
    try {
      const response = await evaluate(data);
      console.log("Evaluation response from AI RECIEVED:", response);

      const processedData = processFinalEvaluatedData(response,data);
      console.log("Processed data to update database:", processedData);
      console.log("Sending data to database")
      const databaseResponse = await updateAssessmentData(id, processedData);
      console.log("Database response:", databaseResponse);


      if (response) {

        localStorage.removeItem("assessment");
        handleSuccess({ success: "Assessment submitted successfully" });
        navigate("/home");

      } else {

        handleError({
          errors: "Error submitting assessment please contact supervisor",
        });

        return;

      }
    } catch (error) {
      console.error("Error during evaluation:", error);
      handleError({ errors: "Error submitting assessment" });
    } finally {
      setIsLoading(false); // Stop loading spinner
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-90 flex justify-center items-center z-50">
      <div className={`flex ${isLoading ? "bg-white" : "bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-transparent bg-clip-text "}    px-4 py-2 rounded-xl 
      h-1/4`}>
        {isLoading ? (
          <div>
          <div className="flex flex-col justify-center items-center w-full h-full gap-6 p-4">
            <p className="text-xl font-bold font-serif bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-transparent bg-clip-text "> 
            {dummyData[currentDummyIndex]}
            </p>
            {/* Simple loading spinner */}
            <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-blue-500 "></div>
            <p className="text-lg text-red-600">Please do not close this window !</p>

            <p className="text-md">Please wait while we are submitting your assessment !</p>
          </div>
          </div>
        ) : (
          <div className="flex flex-col justify-center items-center 
           bg-gray-100 px-4 border  py-2 rounded-lg dark:bg-gray-900 ">
            <p className="text-2xl mb-4 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-transparent bg-clip-text ">
              Are you sure you want to submit this assessment ?
            </p>

            <div className="mt-4">
              <button
                onClick={() => handleConfirmSubmission(data)}
                className="bg-green-500 text-white rounded-lg px-4 py-3 hover:bg-green-600"
              >
                Confirm Submission
              </button>

              <button
                onClick={() => {
                  navigate(
                    `/home/learner/answer-writing/${
                      JSON.parse(localStorage.getItem("assessment")).id
                    }`
                  );
                }}
                className="bg-gray-300 hover:bg-blue-gray-500 text-black rounded-lg px-6 py-3 ml-4"
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ConfirmModal;
