
import { motion } from "framer-motion";
import Heading from "./Heading";
import { useRef, useState } from "react";
import Headbar from "./Headbar";
import FooterSec from "./FooterSec";
import JoditEditor from "jodit-react";
import { useFetchAssessmentData } from "../../../hooks/useFetchAssessmentData";

import axios from "axios";
import { useNavigate, useParams } from "react-router";
import { FaArrowLeft, FaArrowRight, FaSave, FaSpinner } from "react-icons/fa";
const VITE_API_URL = import.meta.env.VITE_API_URL;

function AnswerWritingPage() {
  const [activeQuestion, setActiveQuestion] = useState(0);
  const editor = useRef(null);
  const [content, setContent] = useState("");
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));
  const user_id = user?.id;


  

  const { assessmentId } = useParams();
  console.log("assessment assessmentId is", assessmentId);
  console.log("userId is", user_id);

  //if active exam exists in local storage get the item and make it active assessmentId
  //if active exam does not exist in local storage make PARAMS assessmentId active assessmentId AND STORE IT

  const getPlainText = (html) => {
    const doc = new DOMParser().parseFromString(html, "text/html");
    return doc.body.textContent || "";
  };

  //console.log("active assessmentId is",assessmentId)

  //call the useFetchAssessmentData hook to fetch data
  const { data, refetch, error, isLoading, isError } =
    useFetchAssessmentData(assessmentId);

  console.log("fetched assessment data", data);

  const saveAnswer = async (user_id, question_id, studentAnswer) => {
    try {
      await axios.post(
        `${VITE_API_URL}/api/student-answers/create`,
        { user_id, 
          question_id, 

          student_answer:studentAnswer },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      refetch(); // Refresh the data after saving
    } catch (error) {
      console.error("Error saving data:", error);
    }
};


const saveAndUpdateData = (user_id, question_id) => {
  setContent((prevContent) => {
    const studentAnswer = getPlainText(prevContent);
    console.log("Saving data:", { user_id, question_id, studentAnswer });

    if (user_id && question_id && studentAnswer) {
      saveAnswer(user_id, question_id, studentAnswer);
    }

    return ""; // Reset after saving
  });
};


  const handlePrevious = (user_id,question_id) => {
    setActiveQuestion((prev) => Math.max(prev - 1, 0));
    saveAndUpdateData(user_id,question_id);
  };

  const handleNext = () => {
    const question_id = data?.questions?.[activeQuestion]?._id;
    saveAndUpdateData(user_id, question_id);
    setActiveQuestion((prev) => Math.min(prev + 1, data?.questions?.length - 1));
  };
  

  const handleSubmit=()=>{
    saveAndUpdateData();
    navigate(`/home/learner/assessment-submission/confirm/${assessmentId}`);
  }

  
  return (
    <div className="grid grid-cols-12 dark:bg-gray-900 h-[calc(100vh-70px)] gap-4 p-4">
      {isError && (
        <div className="col-span-12 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4 flex items-center text-red-700 dark:text-red-400">
          <FaExclamationCircle className="mr-2" />
          Error fetching data: {error.message}
        </div>
      )}

      {/* Case Study Section */}
      {data?.assessment_type === "case_study" && (
        <div className="col-span-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-lg overflow-hidden">
          <div className="p-4 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800">
            <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
              Case Study Context
            </h2>
          </div>
          <div className="p-4 overflow-y-auto max-h-[calc(100vh-200px)] prose dark:prose-invert">
            {isLoading ? (
              <div className="flex items-center justify-center py-4">
                <FaSpinner className="animate-spin text-gray-400" />
              </div>
            ) : (
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                {data?.case_study_context}
              </p>
            )}
          </div>
        </div>
      )}

      {/* Main Answer Section */}
      <div className={`${data?.assessment_type === "case_study" ? "col-span-7" : "col-span-10"} flex flex-col h-[calc(100vh-90px)]`}>
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden flex flex-col h-full">
          {/* Header */}
          <div className="p-4 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800">
            <Heading 
            subject={data?.assessment_type}
            duration={data?.duration}
             />
          </div>

          <div className="p-4 flex-grow flex flex-col space-y-4">
            {/* Question Display */}
            <div className="bg-gradient-to-r from-blue-600 to-blue-700 dark:from-blue-700 dark:to-blue-800 rounded-xl p-4 shadow-md">
              <p className="text-white text-lg font-medium">
                {isLoading ? (
                  <FaSpinner className="animate-spin" />
                ) : (
                  <>
                    <span className="font-bold">Question {data?.questions?.[activeQuestion].question_number}:</span>{" "}
                    {data?.questions?.[activeQuestion].question}
                  </>
                )}
              </p>
            </div>

            {/* Instruction Box */}
            <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800 rounded-xl p-3">
              <p className="text-sm text-blue-800 dark:text-blue-200">
                {isLoading ? "Loading..." : data?.questions?.[activeQuestion].question_instruction}
              </p>
            </div>

            {/* Editor */}
            <div className="flex-grow">
              <JoditEditor
                ref={editor}
                value={data?.data?.[activeQuestion]?.student_answer ?? content}
                tabIndex={1}
                onBlur={(newContent) => setContent(newContent)}
                onChange={(newContent) => setContent(newContent)}
                className="h-full"
              />
            </div>

            {/* Navigation */}
            <div className="flex justify-between items-center pt-4 border-t border-gray-200 dark:border-gray-700">
              <button
                onClick={()=>handlePrevious( data?.questions?.[activeQuestion]?._id)}
                className="px-4 py-2 flex items-center space-x-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
              >
                <FaArrowLeft /> <span>Previous</span>
              </button>

              

              <button
                onClick={()=>handleNext(data?.questions?.[activeQuestion]?._id)}
                className="px-4 py-2 flex items-center space-x-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
              >
                <span>Next</span> <FaArrowRight />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Answer Tracker */}
      <div className="col-span-2 bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden flex flex-col">
        <div className="p-4 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800">
          <h3 className="font-semibold text-gray-800 dark:text-gray-100">Question Navigator</h3>
        </div>
        
        <div className="p-4 flex-grow">
          <div className="grid grid-cols-4 gap-2">
            {data?.questions?.map((item, index) => (
              <button
                key={item._id}
                onClick={() => {
                  setActiveQuestion(Number(index));
                  saveAndUpdateData();
                }}
                className={`h-10 flex items-center justify-center rounded-lg font-medium transition-all
                  ${activeQuestion === index 
                    ? 'bg-blue-500 text-white' 
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                  }`}
              >
                {item.question_number}
              </button>
            ))}
          </div>
        </div>

        <div className="p-4 border-t border-gray-200 dark:border-gray-700">
        <button
                onClick={handleSubmit}
                className="px-6 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-colors flex items-center space-x-2"
              >
                <FaSave /> <span>Save & Submit</span>
              </button>
        </div>
      </div>
    </div>
  );
}

export default AnswerWritingPage;
