import { useState } from "react";
import { FaClipboardList } from "react-icons/fa";
import { IoMdBook } from "react-icons/io";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useNavigate, useParams } from "react-router";
import {FetchAllAssessmentsByCourse} from "../../services/fetchAllAssessmentsByCourse";
import { motion } from "framer-motion";

export default function ViewAssessmentModal() {
  const { courseid } = useParams();
  const { data: assessments, isLoading, error } = FetchAllAssessmentsByCourse(courseid);
  const [selectedAssessment, setSelectedAssessment] = useState(null);
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-6 overflow-y-auto">
      <div className="max-w-6xl mx-auto p-6 rounded-xl shadow-2xl bg-white dark:bg-gray-800">
        <h1 className="text-3xl font-extrabold text-blue-800 dark:text-blue-400 text-center mb-6">
          Assessments
        </h1>

        {isLoading ? (
          <div className="flex justify-center items-center min-h-[200px]">
            <AiOutlineLoading3Quarters className="text-blue-500 dark:text-blue-300 text-4xl animate-spin" />
          </div>
        ) : error ? (
          <p className="text-red-500 dark:text-red-400 text-center">Failed to load assessments.</p>
        ) : (
          <div className="space-y-4">
            {assessments?.map((assessment) => (
              <div key={assessment?._id}>
                <button
               
                onClick={() => setSelectedAssessment(assessment)}
                className="block w-full text-left p-4 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-300 rounded-lg shadow-md hover:bg-blue-200 dark:hover:bg-blue-700">
                <FaClipboardList className="inline mr-2" /> {assessment?.assessment_name}
              </button>

            

              </div>
              
              
            ))}
              <div className="flex justify-between">

                {/* Reupload file button */}
                {/* <button className="button-style mt-4"
                onClick={()=>navigate(`/home/create-course/courses/${courseid}`)}
                >Reupload files</button> */}

              <button 
              onClick={()=>navigate(`/home/all-assessments`)}
                
              className="button-style mt-4">Save and back to dashboard</button>
              
              </div>
          </div>
        )}
      </div>

      {selectedAssessment && 
      (
       <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-50">


<motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-white dark:bg-gray-800 h-screen overflow-y-auto p-8 rounded-xl w-[40rem] shadow-xl mx-4 "
          >
            <button
              onClick={() => setSelectedAssessment(null)}
              className="absolute top-3 right-3 text-red-500 dark:text-red-400 text-4xl font-bold">
              ×
            </button>
            <h2 className="text-2xl font-bold text-blue-900 dark:text-blue-300 flex items-center gap-2">
              <FaClipboardList /> {selectedAssessment?.assessment_name}
            </h2>
            <p className="text-lg text-gray-700 dark:text-gray-300">
              Course: <span className="font-semibold">{selectedAssessment?.course_name}</span>
            </p>
            <p className="text-md text-gray-600 dark:text-gray-400 italic">
              Assessment Type: {selectedAssessment?.assessment_type?.replace("_", " ")}
            </p>
            
            {selectedAssessment?.case_study_context && (
              <p className="mt-4 p-3 bg-gray-200 dark:bg-gray-600 text-gray-800 dark:text-gray-300 rounded-lg">
                <IoMdBook className="inline mr-2" /> <span className="font-semibold">Case Study Context:</span> {selectedAssessment?.case_study_context}
              </p>
            )}

            <div className="mt-6 space-y-6">
              {selectedAssessment?.data?.map((question) => (
                <div key={question?._id} className="p-4 border-l-4 border-blue-500 bg-white dark:bg-gray-800 shadow-md rounded-lg">
                  <h3 className="text-lg font-semibold text-blue-800 dark:text-blue-400">
                    {question?.question_number}: {question?.question}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 italic">{question?.question_instruction}</p>
                  <h4 className="mt-2 font-semibold text-blue-700 dark:text-blue-300">Suggested Answers:</h4>
                  <ul className="list-disc pl-6 mt-2 space-y-2 text-gray-700 dark:text-gray-300">
                    {question?.suggested_answer?.map((answer, i) => (
                      <li key={i} className="bg-blue-100 dark:bg-blue-900 p-2 rounded-lg">{answer}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
            

          </motion.div>
        </div>
      )}
    </div>
  );
}
