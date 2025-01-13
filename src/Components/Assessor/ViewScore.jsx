import { FaRobot, FaBrain, FaClipboard, FaCode, FaLanguage, FaCogs, FaRegQuestionCircle, FaUsers } from "react-icons/fa";

const ViewScore = ({ scores, setOpenScoreModal,avgScore }) => {
  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-90 flex justify-center items-center z-50 transition-all ease-in-out duration-300">
      <div className="bg-gradient-to-bl from-blue-100 via-gray-100 to-gray-100 p-8 rounded-xl w-3/4 max-h-[80vh] overflow-auto shadow-xl transform transition-all ease-in-out duration-500">
        {/* Modal Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-transparent bg-clip-text">
            AI Evaluation Scores
          </h2>
          <button
            className="text-gray-600 hover:text-gray-800 transition-colors duration-300"
            onClick={() => setOpenScoreModal(false)}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Score Details */}
        <div className="space-y-5">
          <div className="space-y-3">
            <p className="text-gray-700"><strong className="font-bold text-gray-900">Question:</strong> {scores?.question}</p>
            <p className="text-gray-700"><strong className="font-bold text-gray-900">Instructions:</strong> {scores?.question_instruction}</p>
            <p className="text-gray-700"><strong className="font-bold text-gray-900">Question Number:</strong> {scores?.question_number}</p>
          </div>

          {/* Scores List with Unique Descriptions */}
          <div className="space-y-4 max-h-[50vh] overflow-y-auto">
            {[
              { label: "DistilRoBERTa Score", value: scores?.distilroberta_score, description: "A smaller, faster version of RoBERTa that balances accuracy and efficiency.", icon: <FaRobot className="text-blue-500 text-3xl transform transition-transform duration-200 hover:scale-110" /> },
              
              { label: "Gemini Score", value: scores?.gemini_score, description: "Good at general reasoning and understanding the relationship between ideas.", icon: <FaClipboard className="text-orange-500 text-3xl transform transition-transform duration-200 hover:scale-110" /> },
              { label: "GPT Score", value: scores?.gpt_score || avgScore, description: "A language model optimized for generating creative, human-like text.", icon: <FaCode className="text-purple-500 text-3xl transform transition-transform duration-200 hover:scale-110" /> },
              { label: "LabSE Score", value: scores?.labse_score, description: "Strong in multilingual tasks, matching semantic meaning across languages.", icon: <FaLanguage className="text-teal-500 text-3xl transform transition-transform duration-200 hover:scale-110" /> },
              { label: "MiniLM Score", value: scores?.minilm_score, description: "A compact model designed for efficient performance in NLP tasks.", icon: <FaCogs className="text-red-500 text-3xl transform transition-transform duration-200 hover:scale-110" /> },
              { label: "RoBERTa Score", value: scores?.roberta_score, description: "Trained on a large corpus for comprehensive understanding of language and context.", icon: <FaRegQuestionCircle className="text-indigo-500 text-3xl transform transition-transform duration-200 hover:scale-110" /> },
              { label: "SBERT Score", value: scores?.sbert_score, description: "Specializes in understanding sentence relationships and contextual meaning.", icon: <FaUsers className="text-pink-500 text-3xl transform transition-transform duration-200 hover:scale-110" /> }
            ].map(({ label, value, description, icon }) => (
              <div key={label} className="flex justify-between items-center py-3 px-4 mx-4 rounded-lg bg-gray-50 shadow-sm transform transition-transform duration-300 hover:scale-105 hover:shadow-lg">
                <div className="flex items-center space-x-3">
                  {icon}
                  <span className="text-gray-600">{label}</span>
                </div>
                <div className="text-right flex-1">
                  <p className="text-sm text-gray-500">{description}</p>
                  <span className="font-bold text-gray-800">{ value.toFixed(2)}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Feedback */}
          <div>
            <p className="text-gray-700"><strong className="font-bold text-gray-900">Feedback:</strong></p>
            <p className="text-gray-600">{scores?.feedback}</p>
          </div>
        </div>

        {/* Close Button */}
        <div className="mt-6 flex justify-end">
          <button
            className="bg-blue-600 text-white py-2 px-6 rounded-lg text-sm font-medium hover:bg-blue-700 transition-all duration-200"
            onClick={() => setOpenScoreModal(false)}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default ViewScore;
