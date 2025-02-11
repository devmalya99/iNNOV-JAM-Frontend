import { FaClipboard, FaCode, FaLanguage, FaCogs, FaUsers, FaBrain } from "react-icons/fa";
import { useNavigate, useParams } from "react-router";
import { FetchAiScoreOfQuestion } from "../../services/Assessor/FetchAiScoreOfQuestion";

const ViewScore = () => {
  const { userId, questionId } = useParams();
  const navigate = useNavigate();

  const { data: scores, isLoading } = FetchAiScoreOfQuestion(questionId, userId);

  if (isLoading) return <div className="text-center text-white">Loading scores...</div>;

  const scoreData = scores?.aiScoreReport || {};

  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-90 flex justify-center items-center z-50 transition-all ease-in-out duration-300">
      <div className="bg-gradient-to-bl from-blue-100 via-gray-100 to-gray-100 p-8 rounded-xl w-4/5 max-h-[80vh] overflow-auto shadow-xl transform transition-all ease-in-out duration-500">
        {/* Modal Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-transparent bg-clip-text">
            AI Evaluation Scores
          </h2>
          <button
            className="text-gray-600 hover:text-gray-800 transition-colors duration-300"
            onClick={() => navigate(-1)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Score Details */}
        <div className="space-y-5">
          <div className="space-y-3">
            {/* <p className="text-gray-700">
              <strong className="font-bold text-gray-900">Student Answer:</strong> {scoreData.student_answer}
            </p> */}
            <p className="text-gray-700">
              <strong className="font-bold text-gray-900">Competency Status:</strong>{" "}
              {scoreData.isCompetent ? "Competent ✅" : "Not Competent ❌"}
            </p>
          </div>

          {/* Scores List */}
          <div className="space-y-4 max-h-[50vh] overflow-y-auto">
            {[
              {
                label: "Gemini Score",
                value: scoreData.gemini_score,
                description: "Google's AI model for reasoning and understanding.",
                icon: <FaClipboard className="text-orange-500 text-3xl" />,
              },
              {
                label: "SBERT Score",
                value: scoreData.sbert_score,
                description: "Measures sentence similarity and contextual meaning.",
                icon: <FaUsers className="text-pink-500 text-3xl" />,
              },
              {
                label: "MiniLM Score",
                value: scoreData.minilm_score,
                description: "Compact AI model for NLP tasks.",
                icon: <FaCogs className="text-red-500 text-3xl" />,
              },
              {
                label: "LabSE Score",
                value: scoreData.labse_score,
                description: "Multilingual sentence embeddings.",
                icon: <FaLanguage className="text-teal-500 text-3xl" />,
              },
            ].map(({ label, value, description, icon }) => (
              <div
                key={label}
                className="flex justify-between items-center py-3 px-4 mx-4 rounded-lg bg-gray-50 shadow-sm hover:shadow-lg transition-transform transform hover:scale-105"
              >
                <div className="flex items-center space-x-3">
                  {icon}
                  <span className="text-gray-600 font-semibold">{label}</span>
                </div>
                <div className="text-right flex-1">
                  <p className="text-sm text-gray-500">{description}</p>
                  {value !== null ? (
                    <span className="text-gray-900 font-bold">{value.toFixed(2)}</span>
                  ) : (
                    <p className="text-red-500">Not available</p>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Feedback */}
          <div>
            <p className="text-gray-700">
              <strong className="font-bold text-gray-900">AI Feedback:</strong>
            </p>
            <p className="text-gray-600">{scoreData.feedback || "No feedback available."}</p>
          </div>
        </div>

        {/* Close Button */}
        <div className="mt-6 flex justify-end">
          <button
            className="bg-blue-600 text-white py-2 px-6 rounded-lg text-sm font-medium hover:bg-blue-700 transition-all duration-200"
            onClick={() => navigate(-1)}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default ViewScore;
