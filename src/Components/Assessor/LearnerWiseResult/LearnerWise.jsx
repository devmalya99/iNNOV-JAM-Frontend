import { useEffect, useState } from "react";

import { useParams } from "react-router";
import { useFetchAssessmentData } from "../../../hooks/useFetchAssessmentData";

import ViewScore from "../ViewScore";
import CaseStudyModal from "../CaseStudyModal";
import OverviewResult from "../OverviewResult/OverviewResult";
import OverviewResultSkeleton from "../OverviewResult/OverviewResultSkeleton";
import LearnerWiseSkeleton from "../LearnerWiseResult/LearnerWiseSkeleton";


import { FaPenNib } from "react-icons/fa";
import { ChevronDown, MessageCircle } from "lucide-react";
import FeedbackBox from "./FeedbackBox";
import { FetchAssessmentResultDataByLearner } from "../../../services/Assessor/FetchAssessmentResultDataByLearner";
const LearnerWise = () => {
  const [activeNumber, setActiveNumber] = useState(0);

  const [openOverview, setOpenOverview] = useState(true);

  const { assessmentId,userId } = useParams();

  

  


   console.log("assessmentId" ,assessmentId);
   console.log("userId", userId);
  const { data, isLoading,refetch } = FetchAssessmentResultDataByLearner(assessmentId,userId);

  console.log("fetched assessment result data by learner is", data)

  // use refetch on screen load
  useEffect(() => {
    refetch();
  }, [refetch]);

  const [openScoreModal, setOpenScoreModal] = useState(false);
  const [openCaseStudy, setOpenCaseStudy] = useState(false);

  const [competency, setCompetency] = useState("");
  const [feedback, setFeedback] = useState("");
  const [openFeedbackBox, setOpenFeedbackBox] = useState(false);

  

 

  

  

  function handleOpenDetails() {
    setOpenScoreModal(true);
  }

  function handleOpenCaseStudy() {
    setOpenCaseStudy(true);
  }

  console.log(competency);

  return (
    <>
      {isLoading ? (
        <LearnerWiseSkeleton />
      ) : (
        <div className="w-full  p-4 h-[calc(100vh-90px)] bg-gray-100 dark:bg-gray-900 ">
          <h2 className="text-xl font-semibold mb-4 dark:text-gray-400">
            {`${data?.student_name} – ${
              isLoading
                ? "loading"
                : data?.assessment?.assessment_name?.replace("_", " ").toUpperCase()
            } `}
          </h2>
          <div>
            <div className="bg-blue-50 p-4 mb-4 rounded-md font-semibold tracking-wide h-[80px]">
              {data?.studentResponses[activeNumber]?.question_number}{" "}
              {data?.studentResponses[activeNumber]?.question}
            </div>

            {/* Popup modal */}
            {openScoreModal && (
              <ViewScore
                scores={data?.data[activeNumber]}
                setOpenScoreModal={setOpenScoreModal}
                
                
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
                
                onClose={() => setOpenOverview(false)}
                isLoading={isLoading}
              />
            )}

            {/* Human assessor feedback box */}
            {openFeedbackBox && (
              <FeedbackBox
                competency={competency}
                feedback={feedback}
                setFeedback={setFeedback}
                openFeedbackBox={openFeedbackBox}
                setOpenFeedbackBox={setOpenFeedbackBox}
                
              />
            )}

            {/* Suggested Answer  and Student Answer Block */}

            <div className="flex gap-4">
              {/* Suggested Answer Section */}
              <div className="w-1/2 bg-white/80 dark:bg-gray-800 rounded-lg shadow-md p-4">
                <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4">
                  Suggested Answers
                </h2>
                <div className="overflow-y-auto h-[calc(100vh-420px)]">
                  {data?.studentResponses[activeNumber]?.suggested_answer.map(
                    (item, index) => {
                      const colonIndex = item?.indexOf(":");
                      const beforeColon =
                        colonIndex > -1
                          ? item.slice(0, colonIndex + 1).trim()
                          : item.trim();
                      const afterColon =
                        colonIndex > -1
                          ? item.slice(colonIndex + 1).trim()
                          : "";

                      return (
                        <div
                          key={index}
                          className="bg-gray-100 dark:bg-gray-700 rounded-lg p-3 mb-4 shadow-sm hover:shadow-lg transition-shadow"
                        >
                          <div className="flex items-center gap-2 mb-2">
                            <FaPenNib className="text-blue-500 text-lg" />
                            <strong className="text-gray-700 dark:text-gray-200">
                              {beforeColon}
                            </strong>
                          </div>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            {afterColon}
                          </p>
                        </div>
                      );
                    }
                  )}
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
                      {data?.studentResponses[activeNumber]?.student_answer ||
                        "No response provided."}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white/75 dark:bg-gray-800
             dark:text-gray-900 rounded-md p-2 mb-2 ">
              <div className="flex gap-2 justify-between mb-2 ">
                {/* gen ai remark */}
                <div className="flex gap-2" onClick={handleOpenDetails}>
                  <div
                    className={`rounded-xl shadow-lg `}
                  >
                    <div className="flex p-2 m-1 cursor-pointer rounded-lg hover:font-bold transition duration-300">
                      <strong className="mr-2">AI Grade: </strong>
                      <p className="font-semibold hover:scale-105 transition-transform duration-300">
                        ai grade
                      </p>
                    </div>

                    <p
                      className="p-2 inline-block 
        bg-gradient-to-br from-blue-500 to-purple-600 
        cursor-pointer rounded-lg shadow-lg hover:shadow-xl hover:translate-y-[-2px] text-transparent bg-clip-text "
                    >
                      Click here to see details
                    </p>
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
                <div className="space-y-4">
                  {/* Human Assessor Remark */}
                  <div className="flex items-center gap-4 bg-gradient-to-r from-blue-600/10 to-blue-400/10 p-4 rounded-xl backdrop-blur-sm shadow-lg">
                    <strong className="text-gray-700 dark:text-gray-200">
                      Human Assessor Remark:
                    </strong>
                    <div className="relative w-60">
                      <select
                        id="competency-dropdown"
                        value={competency}
                        onChange={(e) => {
                          const value = e.target.value;
                          setCompetency(value);
                          setOpenFeedbackBox(competency !== "not-competent"); 
                          // Open feedback box only when 'not-competent' is selected
                        }}
                        className="appearance-none bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 px-4 py-2 pr-10 rounded-lg border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 font-medium cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 w-full"
                      >
                        <option value="">Select Competency</option>
                        <option value="competent">Competent</option>
                        <option value="not-competent">Not Competent</option>
                      </select>

                      <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500 dark:text-gray-400">
                        <ChevronDown size={18} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default LearnerWise;
