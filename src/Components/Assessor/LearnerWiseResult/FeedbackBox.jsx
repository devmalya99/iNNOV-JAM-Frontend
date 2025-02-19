import React from 'react';
import { MessageCircle } from 'lucide-react';
import axios from 'axios';
import { handleSuccess } from '../../../utils/toast';

const FeedbackBox = ({  
    feedback, 
    setFeedback,
    openFeedbackBox, 
    setOpenFeedbackBox ,
    questionId,
    userId
  
  }) => {

    const VITE_API_URL = import.meta.env.VITE_API_URL;

    // console.log("questionId is ",questionId);
    // console.log("userId is ",userId);

    const handleUpdateFeedback = async (questionId, userId) => {
      try {
        // http://192.168.1.40:7000/api/student-answers/feedbackbyassessor?question_id=67a9a41e94e13a5c232fbe57&user_id=67a9a3c394e13a5c232fbe3e

        const response = await axios.put(
          `${VITE_API_URL}/api/student-answers/feedbackbyassessor?question_id=${questionId}&user_id=${userId}`,
          {
            feedback: feedback,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        // console.log("Feedback updated successfully:", response.data.message);
        handleSuccess({ success: "Feedback updated successfully!" });
        setOpenFeedbackBox(false);
        setFeedback("");  
      } catch (error) {
        console.error("Error updating feedback:", error);
      }
    }
  
  return (
    <>
    {
        openFeedbackBox  && (
            
    <div className="fixed inset-0 bg-black/50 
    flex items-center justify-center p-4 animate-in fade-in">
      <div className="w-full max-w-lg transform transition-all">
        <div className="relative bg-white dark:bg-gray-800
         rounded-xl p-6 shadow-2xl border border-red-200
          dark:border-red-800">
          {/* Header */}
          <div className="flex items-center gap-3 mb-4 text-red-600 dark:text-red-400">
            <MessageCircle className="h-5 w-5" />
            <h3 className="font-semibold text-lg">Provide Feedback</h3>
          </div>
          
          {/* Textarea */}
          <textarea
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            className="w-full p-4 border rounded-lg bg-white dark:bg-gray-900 
                     border-red-200 dark:border-red-700
                     focus:ring-2 focus:ring-red-500 
                     focus:border-red-500 
                     focus:outline-none transition-shadow
                     text-gray-900 dark:text-gray-100
                     placeholder:text-gray-500 dark:placeholder:text-gray-400"
            placeholder="Enter your feedback here..."
            rows={4}
          />
          
          {/* Added subtle animation and elevation on hover */}
          <div className="mt-4 flex justify-between">

          <button className='button-style'
           onClick={()=>setOpenFeedbackBox(false)}
          >Close</button>


            <button 
            onClick={() => handleUpdateFeedback(questionId, userId)}
            className="px-4 py-2 bg-red-600 hover:bg-red-700 
                           text-white rounded-lg 
                           transform transition-all duration-200
                           hover:scale-105 hover:shadow-lg
                           focus:outline-none focus:ring-2
                         focus:ring-red-500 focus:ring-offset-2">
              Submit Feedback
            </button>

            
          </div>
        </div>
      </div>
    </div>

        )
    }
    </>
  );
};

export default FeedbackBox;