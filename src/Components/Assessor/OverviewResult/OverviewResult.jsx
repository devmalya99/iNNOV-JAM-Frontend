import React from 'react'
import calculatePredeterminedGrade, { getBackgroundGradient } from '../../../utils/helper';
import OverviewResultSkeleton from './OverviewResultSkeleton';
const OverviewResult = ({examData,avgScore, onClose,aiGrade,isLoading}) => {

    // console.log("Exam Data",examData)

     // Calculate average score for each question
  const calculateAvgScore = (question) => {
    const scores = [
      question.sbert_score,
      question.roberta_score,
      question.distilroberta_score,
      question.t5_score,
      question.minilm_score,
      question.labse_score,
      question.gemini_score,
    ].filter((score) => score !== null);

    const totalScore = scores.reduce((acc, score) => acc + score, 0);
    return (totalScore / scores.length).toFixed(2);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    {
      isLoading? (
      <OverviewResultSkeleton/>
      )
      : (
    
      <div className="bg-white rounded-lg shadow-lg w-11/12 max-w-4xl p-6 relative">
        {/* Modal Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold text-gray-800">Exam Overview</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-200 rounded-full"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
  
        {/* Modal Content */}
        <div className="overflow-y-auto max-h-96">
          <table className="table-auto w-full text-left border-collapse">
            <thead>
              <tr className="border-b">
                <th className="py-2 px-4 text-gray-600 font-medium">Question Number</th>
                <th className="py-2 px-4 text-gray-600 font-medium">Question</th>
                <th className="py-2 px-4 text-gray-600 font-medium">Gen AI Marks</th>
              </tr>
            </thead>
            <tbody>
              {examData?.map((question) => (
                <tr key={question._id} className="border-b hover:bg-gray-50">
                  <td className="py-2 px-4 text-gray-800 ">{question.question_number}</td>
                  <td className="py-2 px-4 text-gray-800 truncate max-w-md">
                    {question.question}
                  </td>
                  <td className={`py-2 px-4 text-gray-800 text-center rounded-lg   
                    ${getBackgroundGradient(calculateAvgScore(question))}`}>
                  {calculatePredeterminedGrade(calculateAvgScore(question))}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
  
        {/* Modal Footer */}
        <div className="mt-4 flex justify-end">
          <button
            onClick={onClose}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Close
          </button>
        </div>
      </div>
    )}


    </div>

   
  
  )}

export default OverviewResult