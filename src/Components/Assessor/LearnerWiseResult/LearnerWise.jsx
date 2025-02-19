import { useEffect, useState } from "react";

import { useNavigate, useParams } from "react-router";
import { useFetchAssessmentData } from "../../../hooks/useFetchAssessmentData";

import ViewScore from "../ViewScore";
import CaseStudyModal from "../CaseStudyModal";
import OverviewResult from "../OverviewResult/OverviewResult";
import OverviewResultSkeleton from "../OverviewResult/OverviewResultSkeleton";
import LearnerWiseSkeleton from "../LearnerWiseResult/LearnerWiseSkeleton";


import { FaPenNib } from "react-icons/fa";
import { ChevronDown, MessageCircle, RefreshCcw } from "lucide-react";
import FeedbackBox from "./FeedbackBox";
import { FetchAssessmentResultDataByLearner } from "../../../services/Assessor/FetchAssessmentResultDataByLearner";
const LearnerWise = () => {
  const [activeNumber, setActiveNumber] = useState(0);
  const [openScoreModal, setOpenScoreModal] = useState(false);
  const [openCaseStudy, setOpenCaseStudy] = useState(false);

  const [competency, setCompetency] = useState("");
  const [feedback, setFeedback] = useState("");
  const [openFeedbackBox, setOpenFeedbackBox] = useState(false);

  

  const navigate = useNavigate();

  const [openOverview, setOpenOverview] = useState(true);

  const { assessmentId,userId } = useParams();

 

  

  


  //  console.log("assessmentId" ,assessmentId);
  //  console.log("userId", userId);
  const { data, isLoading,refetch } = FetchAssessmentResultDataByLearner(assessmentId,userId);

  // console.log("fetched assessment result data by learner is", data)

  // use refetch on screen load
  useEffect(() => {
    refetch();
  }, [refetch]);


  const findFirstNotCompetent = (studentResponses) => {
    return studentResponses?.findIndex(response => response.status === 'not-competent');
  };

  useEffect(() => {
    const firstNotCompetent = findFirstNotCompetent(data?.studentResponses);
    setActiveNumber(firstNotCompetent);
    // console.log("firstNotCompetent", firstNotCompetent);
    
  }, [data]);

  function handleOpenDetails() {
    setOpenScoreModal(true);
  }

  function handleOpenCaseStudy() {
    setOpenCaseStudy(true);
  }

  // console.log(competency);

  return (
    <>
      {isLoading ? (
        <LearnerWiseSkeleton />
      ) : (
        <div className="w-full  p-4 h-[calc(100vh-80px)] bg-gray-100 dark:bg-gray-900 overflow-y-auto">
          <div className="flex justify-between">
            <h2 className="text-xl font-semibold mb-4 dark:text-gray-400">
            {`${data?.student_name} – ${
              isLoading
                ? "loading"
                : data?.assessment?.assessment_name?.replace("_", " ").toUpperCase()
            } `}
          </h2>

          <button className="button-style"
          onClick={()=>refetch()}
          >
            <RefreshCcw/>
            <p>Refetch Data</p>
          </button>
          </div>
          
          <div>
            <div className="bg-blue-50 p-4 mb-4 rounded-md font-semibold tracking-wide h-[80px]">
              {data?.studentResponses[activeNumber]?.question_number}{" "}
              {data?.studentResponses[activeNumber]?.question}
            </div>
            <div className=" mb-4 bg-blue-50 text-center rounded-md font-semibold tracking-wide h-[20px]">
              {data?.studentResponses[activeNumber]?.
comparison_instruction}
            </div>



            

            {/* Case Study Modal */}
            {openCaseStudy && (
              <CaseStudyModal
                Open={openCaseStudy}
                onClose={() => setOpenCaseStudy(false)}
                context={data?.assessment?.case_study_context}
              />
            )}

            

            {/* Human assessor feedback box */}
            {openFeedbackBox && (
              <FeedbackBox
              questionId={data?.studentResponses[activeNumber]?.question_id}
              userId={userId}
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
                <div className="flex gap-2" onClick={()=>navigate(`/home/assessment/view-learner-aiScore/${data?.studentResponses[activeNumber]?.question_id}/${userId}`)}>
                  <div
                    className={`rounded-xl shadow-lg `}
                  >
                    <div className="flex p-2 m-1 cursor-pointer rounded-lg hover:font-bold transition duration-300">
                      <strong className="mr-2">AI Grade: </strong>
                      <p className="font-semibold hover:scale-105 transition-transform duration-300">
                       {data?.studentResponses[activeNumber]?.status}
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

                  
                </div>

                {data?.assessment?.assessment_type === "case_study" && (
                    <button
                      onClick={handleOpenCaseStudy}
                      className="bg-blue-500 text-white rounded-lg px-6 py-2 hover:bg-blue-600 transition duration-300 shadow-lg hover:shadow-xl hover:translate-y-[-2px]"
                    >
                      Read Case Study
                    </button>
                  )}

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
                    disabled={activeNumber === data?.studentResponses?.length - 1}
                  >
                    »
                  </button>
                </div>

                {/* Human Assessor Remark */}
                <div className="space-y-4">
                  {/* Human Assessor Remark */}
                  <div className="flex items-center gap-4 bg-gradient-to-r from-blue-600/10 to-blue-400/10 p-4 rounded-xl backdrop-blur-sm shadow-lg">
                    
                    {/* Button to Open Feedback Box */}
      <div className="flex items-center gap-4 bg-gradient-to-r from-blue-600/10 to-blue-400/10 p-4 rounded-xl shadow-lg">
        <strong className="text-gray-700 dark:text-gray-200">Human Assessor Remark:</strong>
        <button
          onClick={() => setOpenFeedbackBox(!openFeedbackBox)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-all duration-200"
        >
          {openFeedbackBox ? "Close Feedback" : "Add Feedback"}
        </button>
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
