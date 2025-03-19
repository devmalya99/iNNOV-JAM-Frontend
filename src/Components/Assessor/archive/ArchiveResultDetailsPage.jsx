import React, { useState } from 'react';
import { 
  Calendar, 
  User, 
  FileText, 
  CheckCircle, 
  AlertTriangle, 
  Archive, 
  ArrowLeft, 
  ExternalLink,
  ChevronDown,
  ChevronUp,
  Award,
  MessageSquare,
  Brain,
  Sparkles
} from 'lucide-react';
import { useParams } from 'react-router';
import { FetchArchivedDataOfUser } from '../../../services/Assessor/Archive-Quaries/FetchArchivedDataOfUserOfAssessment';

const ArchiveResultDetailsPage = () => {
  const [expandedId, setExpandedId] = useState(null);
  const { assessmentId, userId } = useParams();
  const { data, isLoading, error } = FetchArchivedDataOfUser(assessmentId, userId);

  if (isLoading) return (
    <div className="flex justify-center items-center h-screen dark:bg-gray-900">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
    </div>
  );
  
  if (error) return (
    <div className="flex flex-col justify-center items-center h-screen dark:bg-gray-900">
      <AlertTriangle size={48} className="text-red-500 mb-4" />
      <div className="text-red-500 dark:text-red-400">Error: {error.message}</div>
    </div>
  );

  const toggleExpand = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <div className=" p-6 bg-gray-50 h-[calc(100vh-80px)]
    dark:bg-gray-900  overflow-hidden
    transition-colors duration-200">

      <div className="max-w-6xl mx-auto ">
        <div className="flex items-center mb-8">
          <button 
            className="mr-4 p-2 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            onClick={() => window.history.back()}
          >
            <ArrowLeft size={20} className="text-gray-700 dark:text-gray-300" />
          </button>
          <h2 className="text-3xl font-bold text-gray-800 dark:text-white flex items-center">
            <Archive className="mr-3" /> Archive Result Details
          </h2>
        </div>

        <div className="bg-purple-50 dark:bg-purple-900/20 p-5 rounded-xl shadow-sm mb-8 border border-purple-100 dark:border-purple-800/30">
          <h4 className="text-lg font-medium text-gray-700 dark:text-gray-200 flex items-center mb-3">
            <Brain className="mr-2" /> AI Details
          </h4>
          <div className="mt-2 text-gray-600 dark:text-gray-300 space-y-2">
            <p className="flex items-center"><Sparkles size={18} className="mr-2 text-purple-500" /> LLM Names: {data.data[0].aiDetails.llm_name.join(', ')}</p>
            <p className="flex items-center"><FileText size={18} className="mr-2 text-purple-500" /> Model Types: {data.data[0].aiDetails.model_type.join(', ')}</p>
            <p className="flex items-center"><Award size={18} className="mr-2 text-purple-500" /> Weightage: {data.data[0].aiDetails.weightage.join(', ')}</p>
          </div>
        </div>

        <div className="space-y-6  h-[calc(100vh-400px)] overflow-y-auto ">
          {data.data.map((item) => (
            <div key={item._id} className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-200 border border-gray-100 dark:border-gray-700">
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-200 flex items-center">
                  <FileText className="mr-2 text-blue-500" /> 
                  Question {item?.question.question_number}
                </h3>
                <button
                  onClick={() => toggleExpand(item?._id)}
                  className="flex items-center px-3 py-2 text-sm bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-800/40 transition-colors"
                >
                  {expandedId === item._id ? (
                    <>Collapse <ChevronUp size={16} className="ml-1" /></>
                  ) : (
                    <>Expand <ChevronDown size={16} className="ml-1" /></>
                  )}
                </button>
              </div>
              
              <p className="text-gray-600 dark:text-gray-300 mt-4 pl-4 border-l-2 border-blue-300 dark:border-blue-700">
                {item?.question.question}
              </p>
              
              {expandedId === item._id && (
                <div className="mt-6 space-y-5 transition-all duration-300">
                  <div className="bg-gray-50 dark:bg-gray-700/40 p-5 rounded-xl border border-gray-100 dark:border-gray-600">
                    <h4 className="text-lg font-medium text-gray-700 dark:text-gray-200 flex items-center">
                      <MessageSquare className="mr-2 text-gray-500" /> Student Answer
                    </h4>
                    <div
                      className="mt-3 text-gray-600 dark:text-gray-300 prose dark:prose-invert max-w-none"
                      dangerouslySetInnerHTML={{ __html: item?.student_response_formated }}
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-green-50 dark:bg-green-900/20 p-5 rounded-xl border border-green-100 dark:border-green-800/30">
                      <h4 className="text-lg font-medium text-gray-700 dark:text-gray-200 flex items-center">
                        <CheckCircle className="mr-2 text-green-500" /> First Score
                      </h4>
                      <p className="mt-2 text-2xl font-bold text-green-600 dark:text-green-400">{item.first_score}</p>
                      <div className="mt-3 text-gray-600 dark:text-gray-300">
                        {item?.first_score_feedback}
                      </div>
                    </div>
                    
                    <div className="bg-blue-50 dark:bg-blue-900/20 p-5 rounded-xl border border-blue-100 dark:border-blue-800/30">
                      <h4 className="text-lg font-medium text-gray-700 dark:text-gray-200 flex items-center">
                        <CheckCircle className="mr-2 text-blue-500" /> Second Score
                      </h4>
                      <p className="mt-2 text-2xl font-bold text-blue-600 dark:text-blue-400">{item?.second_score}</p>
                      <div className="mt-3 text-gray-600 dark:text-gray-300">
                        {item?.second_score_feedback}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ArchiveResultDetailsPage;