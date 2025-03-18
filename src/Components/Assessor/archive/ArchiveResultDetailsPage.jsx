import React, { useState } from 'react';
import { Calendar, Clock, User, FileText, CheckCircle, AlertTriangle, Archive } from 'lucide-react';
import { useParams } from 'react-router';
import { FetchArchivedDataOfUser } from '../../../services/Assessor/Archive-Quaries/FetchArchivedDataOfUserOfAssessment';

const ArchiveResultDetailsPage = () => {
  const [expandedId, setExpandedId] = useState(null);

  const { assessmentId, userId } = useParams();

  const { data, isLoading, error } = FetchArchivedDataOfUser(assessmentId,userId);
  
  console.log(data)
  // Format date to readable format
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Get status badge based on status code
  const getStatusBadge = (status) => {
    switch (status) {
      case 0:
        return <span className="px-2 py-1 text-xs font-medium rounded-full bg-yellow-100 text-yellow-800">Pending</span>;
      case 1:
        return <span className="px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800">Completed</span>;
      case 2:
        return <span className="px-2 py-1 text-xs font-medium rounded-full bg-red-100 text-red-800">Rejected</span>;
      default:
        return <span className="px-2 py-1 text-xs font-medium rounded-full bg-gray-100 text-gray-800">Unknown</span>;
    }
  };

  const toggleExpand = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  if (!data || !data.data || data.data.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-64 bg-white rounded-lg shadow p-6">
        <Archive size={48} className="text-gray-400 mb-4" />
        <h3 className="text-lg font-medium text-gray-900">No archived results found</h3>
        <p className="text-gray-500">There are no archived responses available.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900 flex items-center">
          <Archive className="mr-2" size={24} />
          Archived Responses
        </h1>
        <span className="text-sm text-gray-500">{data.data.length} result{data.data.length !== 1 ? 's' : ''} found</span>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {data.data.map((item) => (
          <div key={item._id} className="bg-white rounded-lg shadow overflow-hidden">
            <div 
              className="p-4 cursor-pointer hover:bg-gray-50 flex justify-between items-center"
              onClick={() => toggleExpand(item._id)}
            >
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-2">
                  {getStatusBadge(item.status)}
                  <span className="text-sm text-gray-500">ID: {item._id.substring(0, 8)}...</span>
                </div>
                <div className="text-sm font-medium text-gray-900 line-clamp-1 mb-1">
                  {item.student_answer || "No answer provided"}
                </div>
                <div className="flex items-center space-x-4 text-xs text-gray-500">
                  <span className="flex items-center">
                    <User size={14} className="mr-1" />
                    {item.user_id.substring(0, 8)}...
                  </span>
                  <span className="flex items-center">
                    <Calendar size={14} className="mr-1" />
                    {formatDate(item.archivedAt)}
                  </span>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <div className="text-center">
                  <div className="text-xl font-bold text-gray-900">{item.first_score || "N/A"}</div>
                  <div className="text-xs text-gray-500">First Score</div>
                </div>
                <div className="text-center">
                  <div className="text-xl font-bold text-gray-900">{item.second_score || "N/A"}</div>
                  <div className="text-xs text-gray-500">Second Score</div>
                </div>
                <div className="ml-2">
                  <button className="text-blue-600 hover:text-blue-800">
                    {expandedId === item._id ? 
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 15l7-7 7 7"></path>
                      </svg> : 
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                      </svg>
                    }
                  </button>
                </div>
              </div>
            </div>
            
            {expandedId === item._id && (
              <div className="border-t border-gray-200 p-4 bg-gray-50">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-sm font-medium text-gray-900 mb-1">Student Answer</h3>
                      <div className="p-3 bg-white border border-gray-200 rounded-md text-sm text-gray-800">
                        {item.student_answer || "No answer provided"}
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-sm font-medium text-gray-900 mb-1">Human Assessment</h3>
                      <div className="p-3 bg-white border border-gray-200 rounded-md text-sm text-gray-800">
                        {item.human_assess_remarks || "No assessment available"}
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <h3 className="text-sm font-medium text-gray-900">First Score Feedback</h3>
                        <span className="font-bold text-lg">{item.first_score || "N/A"}</span>
                      </div>
                      <div className="p-3 bg-white border border-gray-200 rounded-md text-sm text-gray-800">
                        {item.first_score_feedback || "No feedback available"}
                      </div>
                    </div>
                    
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <h3 className="text-sm font-medium text-gray-900">Second Score Feedback</h3>
                        <span className="font-bold text-lg">{item.second_score || "N/A"}</span>
                      </div>
                      <div className="p-3 bg-white border border-gray-200 rounded-md text-sm text-gray-800">
                        {item.second_score_feedback || "No feedback available"}
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="mt-4 pt-4 border-t border-gray-200 flex justify-end space-x-2">
                  <button className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500">
                    Export
                  </button>
                  <button className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500">
                    Print
                  </button>
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