import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import { FetchAiScoreOfQuestion } from "../../services/Assessor/FetchAiScoreOfQuestion";
import { Loader2, XCircle, X, ClipboardCheck, Users, Cog, Languages } from "lucide-react";

const ViewScore = () => {
  const { userId, questionId } = useParams();
  const navigate = useNavigate();
  const { data: scores, isLoading, error, refetch } = FetchAiScoreOfQuestion(questionId, userId);

  useEffect(() => {
    refetch();
  }, [refetch]);

  if (isLoading) {
    return (
      <div className="fixed inset-0 bg-gray-900/90 flex justify-center items-center z-50">
        <div className="flex flex-col items-center space-y-4 p-8 rounded-lg bg-white dark:bg-gray-800">
          <Loader2 className="h-8 w-8 animate-spin text-blue-600 dark:text-blue-400" />
          <p className="text-gray-600 dark:text-gray-400 animate-pulse">Analyzing scores...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="fixed inset-0 bg-gray-900/90 flex justify-center items-center z-50">
        <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-xl max-w-md mx-4">
          <div className="flex flex-col items-center space-y-4">
            <XCircle className="h-12 w-12 text-red-500" />
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Failed to Load Scores</h3>
            <p className="text-gray-500 dark:text-gray-400 text-center">There was an error loading the AI evaluation scores. Please try again.</p>
            <button onClick={() => navigate(-1)} className="mt-4 px-4 py-2 bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 rounded-md transition-colors">
              Go Back
            </button>
          </div>
        </div>
      </div>
    );
  }

  const scoreData = scores?.aiScoreReport || {};

  const scoreItems = [
    { label: "First AI Score", value: scoreData?.first_score, description: "First AI evaluation score.", icon: <ClipboardCheck className="text-orange-500 h-6 w-6" /> },
    { label: "Second AI Score", value: scoreData?.second_score, description: "Second AI evaluation score.", icon: <Users className="text-pink-500 h-6 w-6" /> }
  ];

  return (
    <div className="fixed inset-0 bg-gray-900/90 flex justify-center items-center z-50 p-4 animate-in fade-in duration-200">
      <div className="bg-gradient-to-bl from-blue-100 via-gray-100 to-gray-100 dark:from-gray-800 dark:via-gray-900 dark:to-gray-900 
                    p-6 md:p-8 rounded-xl w-full max-w-4xl max-h-[90vh] overflow-auto shadow-xl transform transition-all duration-300 animate-in slide-in-from-bottom-4">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-transparent bg-clip-text">
            AI Evaluation Scores
          </h2>
          <button className="text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200 transition-colors" onClick={() => navigate(-1)}>
            <X className="h-6 w-6" />
          </button>
        </div>

        <div className="grid gap-4 mb-6">
          {scoreItems.map(({ label, value, description, icon }, index) => (
            <div key={label} className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm hover:shadow-md transition-all duration-200 
                       transform hover:scale-[1.02] animate-in slide-in-from-bottom-4" style={{ animationDelay: `${index * 100}ms` }}>
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">{icon}</div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-1">{label}</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">{description}</p>
                  <span className="text-lg font-bold text-gray-900 dark:text-white">{value ?? "N/A"}/10</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg mb-6">
          <h3 className="font-semibold text-gray-900 dark:text-white mb-2">AI Feedback</h3>
          <p className="text-gray-600 dark:text-gray-300">{scoreData?.first_score_feedback || "No feedback available."}</p>
        </div>

        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg mb-6">
          <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Additional AI Feedback</h3>
          <p className="text-gray-600 dark:text-gray-300">{scoreData?.second_score_feedback || "No feedback available."}</p>
        </div>

        <div className="flex justify-end">
          <button onClick={() => navigate(-1)} className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors duration-200 transform hover:scale-105">
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default ViewScore;
