import { motion } from "framer-motion";
import Heading from "./Heading";
import { useEffect, useRef, useState } from "react";
import Headbar from "./Headbar";
import FooterSec from "./FooterSec";
import JoditEditor from "jodit-react";
import { useFetchAssessmentData } from "../../../hooks/useFetchAssessmentData";

import axios from "axios";
import { useNavigate, useParams } from "react-router";
import {
  FaArrowLeft,
  FaArrowRight,
  FaExclamationCircle,
  FaSave,
  FaSpinner,
  FaSync,
} from "react-icons/fa";
import { handleSuccess } from "../../../utils/toast";
const VITE_API_URL = import.meta.env.VITE_API_URL;

function AnswerWritingPage() {
  const [activeQuestion, setActiveQuestion] = useState(0);
  const editor = useRef(null);
  const [content, setContent] = useState("");

  const [answeredQuestions, setAnsweredQuestions] = useState({});

  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));
  const user_id = user?.id;

  const { assessmentId } = useParams();
  

  // On screen Load make it full screen
  useEffect(() => {
    // Request full screen when component loads
    const enterFullScreen = () => {
      if (document.documentElement.requestFullscreen) {
        document.documentElement.requestFullscreen();
      } else if (document.documentElement.mozRequestFullScreen) {
        // Firefox
        document.documentElement.mozRequestFullScreen();
      } else if (document.documentElement.webkitRequestFullscreen) {
        // Chrome, Safari, Opera
        document.documentElement.webkitRequestFullscreen();
      } else if (document.documentElement.msRequestFullscreen) {
        // IE/Edge
        document.documentElement.msRequestFullscreen();
      }
    };

    enterFullScreen();
  }, []);

  const getPlainText = (html) => {
    const doc = new DOMParser().parseFromString(html, "text/html");
    return doc.body.textContent || "";
  };

  //console.log("active assessmentId is",assessmentId)

  //call the useFetchAssessmentData hook to fetch data
  const { data, refetch, error, isLoading, isError } = useFetchAssessmentData(
    assessmentId,
    user_id
  );

  useEffect(() => {
    refetch();
    // console.log("fetched assessment data", data);
  }, [refetch]);

  const saveAnswer = async (user_id, question_id, studentAnswer) => {
    try {
      await axios.post(
        `${VITE_API_URL}/api/student-answers/create`,
        {
          user_id,
          question_id,

          student_answer: studentAnswer,
        },
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

  // Function to fetch the latest answer

  const fetchLatestAnswer = async (user_id, question_id) => {
    try {
      const response = await axios.get(
        `${VITE_API_URL}/api/student-answers/getanswerbyquestion`,
        {
          params: { user_id, question_id },
        }
      );

      if (response.data && response.data.student_answer) {
        setContent(response.data.student_answer);
        // console.log("fetched latest answer", response.data.student_answer);
      } else {
        setContent(""); // Reset if no answer is found
      }
    } catch (error) {
      console.error("Error fetching latest answer:", error);
    }
  };

  const saveAndUpdateData = (question_id) => {
    setContent((prevContent) => {
      const studentAnswer = getPlainText(prevContent);
      // console.log("Saving data:", { user_id, question_id, studentAnswer });

      if (user_id && question_id && studentAnswer) {
        saveAnswer(user_id, question_id, studentAnswer);
      }

      return ""; // Reset after saving
    });
  };

  // Check if the current question is the last question
  const answerCountTracker = () => {
    const answeredQuestions = data?.assessmentdata?.questions?.filter(
      (q) => q.status !== 0 // Filter answered questions
    );
    return answeredQuestions?.length;
  };

  const latestAnswerCount = answerCountTracker();
  // console.log("Answered count", latestAnswerCount);

  // Check if the current question is the last question
  const checkIfLastQuestion = () => {
    // ensure that we got the questions array before performing this actions
    const questions = data?.assessmentdata?.questions || [];

    if (questions.length === 0 || activeQuestion >= questions.length) {
      return false;
    }

    const unansweredQuestions = data?.assessmentdata?.questions?.filter(
      (q) => q.status !== 1 // Filter unanswered questions
    );

    // Check if the active question is the last one in the list of unanswered questions
    return (
      unansweredQuestions[unansweredQuestions?.length - 1]?._id ===
      data?.assessmentdata?.questions[activeQuestion]?._id
    );
  };

  const isLastQuestion = checkIfLastQuestion();
  console.log("Is this the last question?", isLastQuestion);

  const handlePrevious = () => {
    saveAndUpdateData(data?.assessmentdata?.questions?.[activeQuestion]?._id);
    setActiveQuestion((prev) => {
      const prevQuestionIndex = Math.max(prev - 1, 0);
      const prevQuestionId =
        data?.assessmentdata?.questions?.[prevQuestionIndex]?._id;

      if (prevQuestionId) {
        fetchLatestAnswer(user_id, prevQuestionId);
      }

      return prevQuestionIndex;
    });
  };

  // Function to handle question click and fetch new data

  const handleQuestionClick = (index) => {
    saveAndUpdateData(
      user_id,
      data?.assessmentdata?.questions?.[activeQuestion]?._id
    );
    setActiveQuestion(index);
    const questionId = data?.assessmentdata?.questions?.[index]?._id;

    if (questionId) {
      fetchLatestAnswer(user_id, questionId);
    }
  };

  const handleNext = () => {
    const question_id = data?.assessmentdata?.questions?.[activeQuestion]?._id;
    saveAndUpdateData(question_id);
    setActiveQuestion((prev) => {
      const nextQuestionIndex = Math.min(
        prev + 1,
        data?.assessmentdata?.questions?.length - 1
      );
      const nextQuestionId =
        data?.assessmentdata?.questions?.[nextQuestionIndex]?._id;

      if (nextQuestionId) {
        fetchLatestAnswer(user_id, nextQuestionId);
      }

      return nextQuestionIndex;
    });
  };

  const handleSubmit = (id) => {

    const question_id = data?.assessmentdata?.questions?.[activeQuestion]?._id;
    saveAndUpdateData(question_id);

    // Navigate to the confirmation page
    navigate(`/home/learner/assessment-submission/confirm/${id}`);
  };

  console.log("text content is", getPlainText(content).length);

  return (
    <div className="parent-container fixed inset-0 z-50 grid grid-cols-12 dark:bg-gray-900 gap-4 p-4">
      {isError && (
        <div className="col-span-12 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4 flex items-center text-red-700 dark:text-red-400">
          <FaExclamationCircle className="mr-2" />
          Error fetching data: {error.message}
        </div>
      )}

      {/* Case Study Section */}
      {data?.assessmentdata?.assessment_type === "case_study" && (
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
                {data?.assessmentdata?.case_study_context}
              </p>
            )}
          </div>
        </div>
      )}

      {/* Main Answer Section */}
      <div
        className={`${
          data?.assessmentdata?.assessment_type === "case_study"
            ? "col-span-7"
            : "col-span-10"
        } flex flex-col h-[calc(100vh-20px)]`}
      >
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden flex flex-col h-full">
          {/* Header */}
          <div className="p-4 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800">
            <Heading
              subject={data?.assessmentdata?.assessment_type}
              duration={data?.assessmentdata?.duration}
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
                    <span className="font-bold">
                      Question{" "}
                      {
                        data?.assessmentdata?.questions?.[activeQuestion]
                          .question_number
                      }
                      :
                    </span>{" "}
                    {data?.assessmentdata?.questions?.[activeQuestion].question}
                  </>
                )}
              </p>
            </div>

            {/* Instruction Box */}
            <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800 rounded-xl p-3">
              <p className="text-sm text-blue-800 dark:text-blue-200">
                {isLoading
                  ? "Loading..."
                  : data?.assessmentdata?.questions?.[activeQuestion]
                      .question_instruction}
              </p>
            </div>

            {/* Editor */}
            <div className="flex-grow">
              <JoditEditor
                ref={editor}
                value={content}
                tabIndex={1}
                onChange={(newContent) => {
                  setContent(newContent); // Update content state immediately
                }}
                onBlur={(newContent) => {
                  setContent(newContent);

                  const textContent = getPlainText(newContent);
                  setAnsweredQuestions((prev) => ({
                    ...prev,
                    [data?.assessmentdata?.questions?.[activeQuestion]?._id]:
                      textContent.trim().length > 0,
                  }));
                }}
              />
            </div>

            {/* Navigation */}
            <div className="flex justify-between items-center pt-4 border-t border-gray-200 dark:border-gray-700">
              <button
                onClick={() =>
                  handlePrevious(
                    data?.assessmentdata?.questions?.[activeQuestion]?._id
                  )
                }
                className={`${
                  activeQuestion === 0
                    ? "opacity-50 cursor-not-allowed border border-gray-500 rounded-xl px-4 py-2 flex "
                    : "px-4 py-2 flex button-style items-center space-x-2 text-gray-700 dark:text-gray-200 hover:bg-blue-700  hover:text-white rounded-lg transition-colors "
                } `}
                disabled={activeQuestion === 0}
              >
                <FaArrowLeft /> <span>Previous !</span>
              </button>

              <button
                onClick={() =>
                  handleNext(
                    data?.assessmentdata?.questions?.[activeQuestion]?._id
                  )
                }
                className={`${
                  activeQuestion + 1 === data?.assessmentdata?.questions?.length
                    ? "opacity-50 cursor-not-allowed border border-gray-500 rounded-xl px-4 py-2 flex "
                    : "px-4 py-2 flex button-style items-center space-x-2 text-gray-700 dark:text-gray-200 hover:bg-blue-700  hover:text-white rounded-lg transition-colors "
                } `}
                disabled={
                  activeQuestion + 1 === data?.assessmentdata?.questions?.length
                }
              >
                <span>Save & Next !</span> <FaArrowRight />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Answer Tracker */}
      <div className="col-span-2 bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden flex flex-col">
        <div className="p-4 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800">
          <h3 className="font-semibold text-gray-800 dark:text-gray-100">
            Question Navigator
          </h3>
        </div>

        <div className="p-4 flex justify-between text-sm font-medium">
          <span className="text-green-600">Answered: {latestAnswerCount}</span>
          <span className="text-red-600">
            Not Answered:{" "}
            {data?.assessmentdata?.questions?.length - latestAnswerCount}
          </span>
        </div>

        <div className="p-4 flex-grow">
          <div className="grid grid-cols-4 gap-2">
            {data?.assessmentdata?.questions?.map((item, index) => (
              <button
                key={item._id}
                onClick={() => {
                  setActiveQuestion(Number(index));
                  saveAndUpdateData(
                    data?.assessmentdata?.questions?.[activeQuestion]?._id
                  );
                  handleQuestionClick(index);
                }}
                className={`h-10 flex items-center justify-center rounded-lg font-medium transition-all
                  ${
                    activeQuestion === index
                      ? "bg-blue-500 text-white"
                      : item.status === 1
                      ? "bg-green-500 text-white" // Marked as answered
                      : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
                  }`}
              >
                {item.question_number}
              </button>
            ))}
          </div>
        </div>

        {/* Only show Save & Submit when all questions are answered */}
        {((isLastQuestion && getPlainText(content)?.length > 0) ||
          latestAnswerCount === data?.assessmentdata?.questions?.length) && (
          <div className="p-4 border-t border-gray-200 dark:border-gray-700">
            <button
              onClick={() => handleSubmit(data?.assigned?._id)}
              className="px-6 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-colors flex items-center space-x-2"
            >
              <FaSave /> <span>Save & Submit</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default AnswerWritingPage;
