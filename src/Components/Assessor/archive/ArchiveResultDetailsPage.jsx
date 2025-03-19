import React, { useState } from 'react';
import { Calendar, User, FileText, CheckCircle, AlertTriangle, Archive, ArrowLeft, ExternalLink } from 'lucide-react';
import { useParams } from 'react-router';
import { FetchArchivedDataOfUser } from '../../../services/Assessor/Archive-Quaries/FetchArchivedDataOfUserOfAssessment';

const ArchiveResultDetailsPage = () => {
  const [expandedId, setExpandedId] = useState(null);
  const { assessmentId, userId } = useParams();
  const { data, isLoading, error } = FetchArchivedDataOfUser(assessmentId, userId);

  if (isLoading) return <div className="flex justify-center items-center h-screen">Loading...</div>;
  if (error) return <div className="flex justify-center items-center h-screen text-red-500">Error: {error.message}</div>;

  const toggleExpand = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">Archive Result Details</h2>

      <div className="bg-purple-50 p-4 rounded-lg">
                  <h4 className="text-lg font-medium text-gray-700">AI Details</h4>
                  <div className="mt-2 text-gray-600">
                    <p>LLM Names: {data.data[0].aiDetails.llm_name.join(', ')}</p>
                    <p>Model Types: {data.data[0].aiDetails.model_type.join(', ')}</p>
                    <p>Weightage: {data.data[0].aiDetails.weightage.join(', ')}</p>
                  </div>
                </div>
      <div className="space-y-6">
        {data.data.map((item) => (
          <div key={item._id} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <div className="flex justify-between items-center">
              <h3 className="text-xl font-semibold text-gray-700">Question {item.question.question_number}</h3>
              <button
                onClick={() => toggleExpand(item._id)}
                className="text-blue-500 hover:text-blue-700 transition-colors"
              >
                {expandedId === item._id ? 'Collapse' : 'Expand'}
              </button>
            </div>
            <p className="text-gray-600 mt-2">{item.question.question}</p>
            {expandedId === item._id && (
              <div className="mt-4 space-y-4">
                <div className="bg-gray-100 p-4 rounded-lg">
                  <h4 className="text-lg font-medium text-gray-700">Student Answer</h4>
                  <div
                    className="mt-2 text-gray-600"
                    dangerouslySetInnerHTML={{ __html: item.student_response_formated }}
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-green-50 p-4 rounded-lg">
                    <h4 className="text-lg font-medium text-gray-700">First Score</h4>
                    <p className="mt-2 text-gray-600">{item.first_score}</p>
                    <p className="mt-2 text-gray-600">{item.first_score_feedback}</p>
                  </div>
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h4 className="text-lg font-medium text-gray-700">Second Score</h4>
                    <p className="mt-2 text-gray-600">{item.second_score}</p>
                    <p className="mt-2 text-gray-600">{item.second_score_feedback}</p>
                  </div>
                </div>
                
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ArchiveResultDetailsPage;