import React, { useState } from 'react';
import { Book, Clock, Save } from 'lucide-react';

const StudentAnswer = () => {
  const [answer, setAnswer] = useState('');
  const [wordCount, setWordCount] = useState(0);

  // Sample question data
  const questionData = {
    module: "Digital Marketing",
    question: "Explain the importance of content marketing in a digital marketing strategy. Include examples of different content types and their specific benefits for business growth.",
    suggestedLength: "250-300 words",
    timeLimit: "20 minutes",
    points: "10 points"
  };

  const handleAnswerChange = (e) => {
    const text = e.target.value;
    setAnswer(text);
    setWordCount(text.trim().split(/\s+/).filter(word => word !== '').length);
  };

  const handleSave = () => {
    // Handle save functionality here
    alert('Answer saved successfully!');
    // console.log(answer)
  };

  return (
    <div className='h-[calc(100vh-80px)] overflow-y-auto'>
  <div className="max-w-4xl mx-auto p-4">
    {/* Question Header */}
    <div className="bg-blue-600 text-white rounded-t-lg p-4 dark:bg-blue-800 dark:text-white">
      <div className="flex items-center gap-2 mb-2">
        <Book className="w-5 h-5" />
        <h2 className="text-lg font-semibold">{questionData.module}</h2>
      </div>
      <div className="flex flex-wrap gap-4 text-sm mb-4">
        <span className="flex items-center gap-1">
          <Clock className="w-4 h-4" />
          Time Limit: {questionData.timeLimit}
        </span>
        <span>Points: {questionData.points}</span>
        <span>Suggested Length: {questionData.suggestedLength}</span>
      </div>
    </div>

    {/* Question Content */}
    <div className="bg-white border border-gray-200 p-6 mb-4 rounded-b-lg shadow-sm dark:bg-gray-800 dark:border-gray-700 dark:text-white">
      <h3 className="text-lg font-medium mb-4">Question:</h3>
      <p className="text-gray-700 mb-6 dark:text-gray-300">{questionData.question}</p>
    </div>

    {/* Answer Section */}
    <div className="bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
      <div className="p-4 border-b dark:border-gray-600">
        <h3 className="text-lg font-medium dark:text-white">Your Answer:</h3>
        <p className="text-sm text-gray-600 dark:text-gray-400">Write your response below. Be clear and concise.</p>
      </div>
      
      <div className="p-4">
        <textarea
          className="w-full h-64 p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:focus:ring-blue-300 dark:focus:border-blue-300"
          placeholder="Type your answer here..."
          value={answer}
          onChange={handleAnswerChange}
        />
        
        <div className="mt-4 flex justify-between items-center">
          <div className="text-sm text-gray-600 dark:text-gray-400">
            Word Count: {wordCount} words
            {wordCount < 250 && 
              <span className="text-yellow-600 ml-2">(Minimum 250 words recommended)</span>
            }
          </div>
          
          <button
            onClick={handleSave}
            className="flex items-center gap-2 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors dark:bg-blue-700 dark:hover:bg-blue-600"
          >
            <Save className="w-4 h-4" />
            Save Answer
          </button>
        </div>
      </div>
    </div>

    {/* Tips Section */}
    <div className="mt-6 bg-blue-50 border border-blue-100 rounded-lg p-4 dark:bg-blue-900 dark:border-blue-800">
      <h4 className="font-medium text-blue-800 mb-2 dark:text-blue-400">Writing Tips:</h4>
      <ul className="text-sm text-blue-700 list-disc list-inside space-y-1 dark:text-blue-300">
        <li>Make sure to address all parts of the question</li>
        <li>Include specific examples to support your points</li>
        <li>Structure your answer with clear paragraphs</li>
        <li>Proofread your answer before submitting</li>
      </ul>
    </div>
  </div>
</div>

  );
};

export default StudentAnswer;