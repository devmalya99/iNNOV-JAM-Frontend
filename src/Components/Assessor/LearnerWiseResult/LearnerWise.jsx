import { useState } from "react";

import { useParams } from "react-router";
import { useFetchAssessmentData } from "../../../hooks/useFetchAssessmentData";
import useGradeStore from "../../../store";
import ViewScore from "../ViewScore";
import CaseStudyModal from "../CaseStudyModal";
import OverviewResult from "../OverviewResult/OverviewResult";
import OverviewResultSkeleton from "../OverviewResult/OverviewResultSkeleton";
import LearnerWiseSkeleton from "../LearnerWiseResult/LearnerWiseSkeleton";


import calculatePredeterminedGrade, {
  calculateAverageScore,
  getBackgroundGradient,
} from "../../../utils/helper";
import { FaPenNib } from "react-icons/fa";
const LearnerWise = () => {
  const [activeNumber, setActiveNumber] = useState(0);

  const [openOverview, setOpenOverview] = useState(true);

  const { id } = useParams();

  const { grades, addGrade } = useGradeStore();

  const { data, isLoading } = useFetchAssessmentData(id);
  const [openScoreModal, setOpenScoreModal] = useState(false);
  const [openCaseStudy, setOpenCaseStudy] = useState(false);

  console.log("grades from zustand store", grades);

  const avgScore = calculateAverageScore(data?.data[activeNumber]);

  function handleCustomisedGrading(grades, avgscore) {
    const grade = grades.find(
      (item) => avgscore * 10 <= item.end && avgscore * 10 >= item.start
    );
    return grade ? grade.name : "No Grade Found"; // Return a fallback message
  }

  let aiGrade;
  if (grades.length === 0) {
    aiGrade = calculatePredeterminedGrade(avgScore);
    console.log("grades is empty", aiGrade, avgScore);
  } else {
    aiGrade = handleCustomisedGrading(grades, avgScore);
    console.log("grades is not empty", aiGrade, avgScore);
  }

  function handleOpenDetails() {
    setOpenScoreModal(true);
  }

  function handleOpenCaseStudy() {
    setOpenCaseStudy(true);
  }

  

  return (


    <>
    {
      isLoading ? (<LearnerWiseSkeleton/>) 
      : 
      
      (
        <div className="w-full  p-4 h-[calc(100vh-80px)] bg-gray-100 dark:bg-gray-900 ">
      <h2 className="text-xl font-semibold mb-4 dark:text-gray-400">
        {`15 October 2025 – Digital Marketing – Jhon Tan – ${
          isLoading
            ? "loading"
            : data?.assessment_type.replace("_", " ").toUpperCase()
        } `}
      </h2>
      <div>
        <div className="bg-blue-50 p-4 mb-4 rounded-md font-semibold tracking-wide h-[80px]">
          {data?.data[activeNumber]?.question_number}{" "}
          {data?.data[activeNumber]?.question}
        </div>

        {/* Popup modal */}
        {openScoreModal && (
          <ViewScore
            scores={data?.data[activeNumber]}
            setOpenScoreModal={setOpenScoreModal}
            avgScore={avgScore}
            aiGrade={aiGrade}
            isLoading={isLoading}
          />
        )}

        {/* Case Study Modal */}
        {openCaseStudy && (
          <CaseStudyModal
            Open={openCaseStudy}
            onClose={() => setOpenCaseStudy(false)}
            context={data?.case_study_context}
          />
        )}

        {/* Overview popup */}
        {openOverview && (
          <OverviewResult
            examData={data?.data}
            avgScore={avgScore}
            onClose={() => setOpenOverview(false)}
            isLoading={isLoading}
          />
        )}

        {/* Suggested Answer  and Student Answer Block */}

        <div className="flex gap-4">
      {/* Suggested Answer Section */}
      <div className="w-1/2 bg-white/80 dark:bg-gray-800 rounded-lg shadow-md p-4">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4">
          Suggested Answers
        </h2>
        <div className="overflow-y-auto h-[calc(100vh-410px)]">
          {data?.data[activeNumber]?.suggested_answer.map((item, index) => {
            const colonIndex = item?.indexOf(":");
            const beforeColon = colonIndex > -1 ? item.slice(0, colonIndex + 1).trim() : item.trim();
            const afterColon = colonIndex > -1 ? item.slice(colonIndex + 1).trim() : "";

            return (
              <div
                key={index}
                className="bg-gray-100 dark:bg-gray-700 rounded-lg p-3 mb-4 shadow-sm hover:shadow-lg transition-shadow"
              >
                <div className="flex items-center gap-2 mb-2">
                  <FaPenNib className="text-blue-500 text-lg" />
                  <strong className="text-gray-700 dark:text-gray-200">{beforeColon}</strong>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400">{afterColon}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Learner Response Section */}
      <div className="w-1/2 bg-white/80 dark:bg-gray-800 rounded-lg shadow-md p-4">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4">
          Learner Response
        </h2>
        <div className="overflow-y-auto h-[calc(100vh-500px)]">
          <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-3 mb-4 shadow-sm">
            <p className="text-gray-700 dark:text-gray-200">
              {data?.data[activeNumber]?.student_answer || "No response provided."}
            </p>
          </div>
        </div>
      </div>
    </div>

        <div className="bg-white/75 dark:bg-gray-800 dark:text-gray-900 rounded-md p-2 mb-2 ">
          <div className="flex gap-2 justify-between mb-2 ">

           {/* gen ai remark */}
           <div className="flex gap-2">
      <div className={`rounded-xl shadow-lg ${getBackgroundGradient(avgScore)}`}>
        <div className="flex p-2 m-1 cursor-pointer rounded-lg hover:font-bold transition duration-300">
          <strong className="mr-2">AI Grade: </strong>
          <p 
            className="font-semibold hover:scale-105 transition-transform duration-300" 
            onClick={handleOpenDetails}
          >
            {aiGrade}
          </p>
        </div>
      </div>

      {data?.assessment_type === "case_study" && (
        <button
          onClick={handleOpenCaseStudy}
          className="bg-blue-500 text-white rounded-lg px-6 py-2 hover:bg-blue-600 transition duration-300 shadow-lg hover:shadow-xl hover:translate-y-[-2px]"
        >
          Read Case Study
        </button>
      )}
    </div>


            {/* Pagination controller */}

            <div className="flex justify-center items-center text-black dark:text-white font-bold p-2 rounded-md gap-4">
      <button
        className="relative h-12 w-12 flex items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 text-white text-2xl shadow-lg transition-all duration-300 hover:shadow-xl hover:translate-y-[-2px] disabled:opacity-50 disabled:hover:translate-y-0 disabled:cursor-not-allowed"
        onClick={() => setActiveNumber(activeNumber - 1)}
        disabled={activeNumber === 0}
      >
        «
      </button>

      <button className="px-6 py-2 text-lg font-medium bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-xl backdrop-blur-sm">
        Question {activeNumber + 1}
      </button>

      <button
        className="relative h-12 w-12 flex items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 text-white text-2xl shadow-lg transition-all duration-300 hover:shadow-xl hover:translate-y-[-2px] disabled:opacity-50 disabled:hover:translate-y-0 disabled:cursor-not-allowed"
        onClick={() => setActiveNumber(activeNumber + 1)}
        disabled={activeNumber === data?.data?.length - 1}
      >
        »
      </button>
    </div>


             {/* Human Assessor Remark */}
             <div className="flex items-center gap-4 bg-gradient-to-r from-blue-600/10 to-blue-400/10 p-4 rounded-xl backdrop-blur-sm shadow-lg">
      <strong className="text-gray-700 dark:text-gray-200">
        Human Assessor Remark:
      </strong>
      <div className="relative">
        <select 
          id="competency-dropdown"
          className="appearance-none bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 px-4 py-2 pr-10 rounded-lg border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 font-medium cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700"
        >
          <option value="">Select Competency</option>
          <option value="competent">Competent</option>
          <option value="not-yet-competent">Not Yet Competent</option>
        </select>
        <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
          <svg 
            className="w-4 h-4 text-gray-500 dark:text-gray-400" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth="2" 
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </div>
      </div>
    </div>


          </div>
        </div>
      </div>

      
    </div>
      )
    }
    
    </>
    
  );
};

export default LearnerWise;
