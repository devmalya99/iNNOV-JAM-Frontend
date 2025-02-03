
import { motion } from "framer-motion";
import Heading from "./Heading";
import { useRef, useState } from "react";
import Headbar from "./Headbar";
import FooterSec from "./FooterSec";
import JoditEditor from "jodit-react";
import { useFetchAssessmentData } from "../../../hooks/useFetchAssessmentData";

import axios from "axios";
import { useNavigate, useParams } from "react-router";
const VITE_API_URL = import.meta.env.VITE_API_URL;

function AnswerWritingPage() {
  const [activeQuestion, setActiveQuestion] = useState(0);
  const editor = useRef(null);
  const [content, setContent] = useState("");
  const navigate = useNavigate();

  const activeId = localStorage.getItem("assessment").id;

  const { id } = useParams();

  //if active exam exists in local storage get the item and make it active id
  //if active exam does not exist in local storage make PARAMS ID active id AND STORE IT

  const getPlainText = (html) => {
    const doc = new DOMParser().parseFromString(html, "text/html");
    return doc.body.textContent || "";
  };

  //console.log("active id is",id)

  //call the useFetchAssessmentData hook to fetch data
  const { data, refetch, error, isLoading, isError } =
    useFetchAssessmentData(id);

  console.log("fetched assessment data", data);

  const saveAnswer = async (assessmentId, questionId, studentAnswer) => {
    try {
      await axios.put(
        `${VITE_API_URL}/api/assessments/${assessmentId}/questions/${questionId}`,
        { student_answer: studentAnswer }
      );
      //handleSuccess({ success: "Answer saved successfully" });
      refetch(); // Trigger refetch to get updated data
      //console.log(data)
    } catch {
      //handleError({ error: "Error saving data" });
    }
  };

  const saveAndUpdateData = () => {
    const studentAnswer = getPlainText(content); // Extract plain text from HTML content
    const questionId = data?.data?.[activeQuestion]._id;
    console.log("before sending data to database", {
      id,
      questionId,
      studentAnswer,
    });

    if (questionId && studentAnswer) {
      saveAnswer(id, questionId, studentAnswer);
    }

    setContent("");
  };

  const handlePrevious = () => {
    setActiveQuestion((prev) => Math.max(prev - 1, 0));
    saveAndUpdateData();
  };

  const handleNext = () => {
    setActiveQuestion((prev) => Math.min(prev + 1, data?.data?.length - 1));
    saveAndUpdateData();
  };

  const handleSubmit=()=>{
    saveAndUpdateData();
    navigate(`/home/learner/assessment-submission/confirm/${id}`);
  }

  // useEffect(() => {
  //   // Trigger fullscreen when this component is mounted
  //   const handleFullScreen = () => {
  //     if (document.documentElement.requestFullscreen) {
  //       document.documentElement.requestFullscreen();
  //     } else if (document.documentElement.mozRequestFullScreen) {
  //       // Firefox
  //       document.documentElement.mozRequestFullScreen();
  //     } else if (document.documentElement.webkitRequestFullscreen) {
  //       // Chrome, Safari and Opera
  //       document.documentElement.webkitRequestFullscreen();
  //     } else if (document.documentElement.msRequestFullscreen) {
  //       // IE/Edge
  //       document.documentElement.msRequestFullscreen();
  //     }
  //   };

  //   handleFullScreen(); // Trigger fullscreen when the page loads

  //   // Clean up when the component is unmounted or leaves fullscreen
  //   return () => {
  //     if (document.exitFullscreen) {
  //       document.exitFullscreen();
  //     } else if (document.mozCancelFullScreen) {
  //       document.mozCancelFullScreen(); // Firefox
  //     } else if (document.webkitExitFullscreen) {
  //       document.webkitExitFullscreen(); // Safari and Chrome
  //     } else if (document.msExitFullscreen) {
  //       document.msExitFullscreen(); // IE/Edge
  //     }
  //   };
  // }, []);

  //Final function to send data to AI model for evaluation

  return (
    <div className="grid grid-cols-12 dark:bg-gray-900 h-[calc(100vh-80px)]">
      {isError && (
        <div className="text-red-500">Error fetching data: {error.message}</div>
      )}

      {/* Case Study box in left */}
      {data?.assessment_type === "case_study" && (
        <div className="box-1 col-span-3 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg my-1 shadow-md p-6 mx-1 overflow-y-auto">
          {/* Title */}
          <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-4">
            Case Study Context
          </h2>
          {/* Content */}
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            {isLoading ? "Loading..." : data?.case_study_context}
          </p>
        </div>
      )}

      {/* Answer Writing box in middle */}

      <div
        className={`box-2 leftBox1  ${
          data?.assessment_type === "case_study" ? "col-span-7" : "col-span-10"
        }  h-[calc(100vh-80px)] m-1`}
      >
        <div className="bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700 rounded-lg shadow-md p-6 h-full">
          <Heading subject={data?.assessment_type}/>

          {/* Question Box */}
          <div className="border-2 p-2 bg-gradient-to-r from-cyan-500 to-blue-500 dark:from-cyan-700 dark:to-blue-700 backdrop-blur-lg my-4 rounded-xl font-semibold flex justify-between">
            <p className="text-gray-100 text-md">
              {isLoading
                ? "Loading..."
                : data?.data?.[activeQuestion].question_number}
              {". "}
              {isLoading ? "Loading..." : 
              data?.data?.[activeQuestion].question}
            </p>
          </div>

          {/* Instruction Box */}
          <div className="border-2 px-2 py-1 bg-gradient-to-r from-cyan-200 to-blue-100 dark:from-cyan-800 dark:to-blue-800 backdrop-blur-lg my-2 rounded-xl font-bold flex justify-between">
            <p className="text-sm text-gray-800 dark:text-gray-200">
              {isLoading
                ? "Loading..."
                : data?.data?.[activeQuestion].question_instruction}
            </p>
          </div>

          {/* Text Editor */}

          <div className="max-w-full  mb-auto">
            <JoditEditor
              ref={editor}
              value={
                data?.data?.[activeQuestion]?.student_answer
                  ? data?.data?.[activeQuestion]?.student_answer
                  : content
              }
              tabIndex={1} // tabIndex of textarea
              onBlur={(newContent) => setContent(newContent)} // preferred to use only this option to update the content for performance reasons
              onChange={(newContent) => setContent(newContent)}
            />
          </div>

          {/* Navigation */}
          <div className="flex flex-col mt-auto justify-end">
            <div className="flex justify-between items-center p-2 bg-white/30 rounded-md text-white font-bold hover:bg-white/40 transition-all duration-300 ease-in-out cursor-pointer">
              <div className="button-style" onClick={() => handlePrevious()}>
                Previous
              </div>

              <div className="button-style" onClick={() => handleNext()}>
                Next
              </div>
            </div>
          </div>

          
        </div>
      </div>

      {/* ANswer Tracker Component */}

      <div className="box-3 col-span-2  p-1 mx-1 dark:bg-gray-800 bg-gray-100 backdrop-blur-lg rounded-lg shadow-md max-h-[calc(100vh-80px)] ">
        <Headbar />

        <div className="grid grid-cols-5  gap-2 p-2 ">
          {data?.data?.map((item, index) => (
            <div
              key={item._id}
              className="border-2 flex justify-center items-center px-2 py-1 bg-white/65 rounded-lg shadow-sm hover:shadow-lg transition-all duration-200 ease-in-out dark:shadow-gray-400  cursor-pointer"
              onClick={() => {
                setActiveQuestion(Number(index));
                saveAndUpdateData();
                //console.log(activeQuestion)
              }}
            >
              <span className="text-lg font-medium text-gray-700">
                {item.question_number}
              </span>
            </div>
          ))}
        </div>

        {/* Footer */}
        <FooterSec className="mt-auto " />
      </div>
    </div>
  );
}

export default AnswerWritingPage;
