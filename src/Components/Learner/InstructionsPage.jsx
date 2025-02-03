import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { useFetchAssessmentData } from '../../hooks/useFetchAssessmentData';
import axios from 'axios';
const VITE_API_URL = import.meta.env.VITE_API_URL;

const InstructionsPage = () => {
  const navigate = useNavigate();
  const [examState,setExamState] = useState({});
  const [assessmentData, setAssessmentData] = useState([]);


  const fetchAssessmentData = async (id) => {
    console.log("id is ",id);
    const { data } = await axios.get(
      `${VITE_API_URL}/api/assessments`
    );
    console.log("All assessments",data);
    setAssessmentData(data); // Set the fetched data to state
    return data;
  };

  useEffect(() => {
    fetchAssessmentData()
  },[])

  // const { data, refetch, error, isLoading, isError } =
  //   useFetchAssessmentData(id);

  const exams=
  {
    cs: assessmentData?.find(item => item.assessment_type === 'case_study')?._id,
    wa: assessmentData?.find(item => item.assessment_type === 'written_assessment')?._id,
  }

  const isActive = localStorage.getItem('assessment') ? true : false;

  const handleAgreeAndContinue = (examState) => {
    console.log(examState);
    if(!isActive){
      localStorage.setItem('assessment', JSON.stringify(examState));
      navigate(`/home/learner/answer-writing/${examState.id}`);
    }else{
      navigate(`/home/learner/answer-writing/${
        JSON.parse(localStorage.getItem('assessment')).id
      
      }`);
    }
  };
 

  return (
    <div className="flex flex-col items-center justify-center 
      px-6 py-8 h-[calc(100vh - 50px)] 
      fixed inset-0 bg-black bg-opacity-90">
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-2xl">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">
          Instructions to Candidates
        </h1>
        <ul className="list-disc list-inside text-gray-700 space-y-2">
          <li>
            You are required to answer all 7 questions in this Written Assessment.
          </li>
          <li>
            You have a total of <strong>60 minutes</strong> to complete the Written Assessment.
          </li>
          <li>
            Write your answers in the spaces provided below each question.
          </li>
          <li>
            If there is insufficient space, use a separate sheet of paper for your answers.
          </li>
          <li>
            Once completed, submit your answers to your Assessor for review.
          </li>
          <li>
            Ensure all answers are clear and concise. Unclear answers may lead to delays in evaluation.
          </li>
        </ul>
        <div className="mt-6">

          {
            !isActive && <div className='flex justify-between mb-4'>
            <button className='button-style'
            onClick={() =>{
              setExamState({
                "type":'Written Assessment',
                "id":exams.wa})
            } }
            >Attempt Written Assessment</button>


            <button className='button-style'
             onClick={() => setExamState({
               type:'Case Study',
               id:exams.cs
             })}
            >Attempt Case Study</button>
          </div>
          }

          
          <div className='flex justify-between'>
          <button
          disabled={!isActive && !examState.id}
            onClick={()=>handleAgreeAndContinue(examState)}
            className={` ${!isActive && !examState.id ? 'bg-gray-300 text-gray-600 cursor-not-allowed'
              :
              'button-style'
            }`}
          >
            Agree and Continue {localStorage.getItem('assessment')?
            JSON.parse(localStorage.getItem('assessment')).type
            :examState.type} 
          </button>

          <button
            className="button-style">
              <Link to="/home">Cancel</Link>
              </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InstructionsPage;
