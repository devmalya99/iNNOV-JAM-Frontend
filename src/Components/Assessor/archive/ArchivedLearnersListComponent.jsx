
    import React, { useState } from "react";
    import { Calendar, User, Mail, FileText, Award, RefreshCw, Archive } from "lucide-react";
import { FetchArchivedDataOfUser } from "../../../services/Assessor/Archive-Quaries/FetchArchivedDataOfUserOfAssessment";
import { FetchArchivedLearners } from "../../../services/Assessor/Archive-Quaries/FetchArchivedLearners";
import { useNavigate, useParams } from "react-router";
    
    const ArchivedLearnersListComponent = () => {
      const [searchTerm, setSearchTerm] = useState("");

      const {assessmentId}=useParams();

      const { data, isLoading, error } = FetchArchivedLearners(assessmentId);

      const { assessment, result } = data || { assessment: {}, result: [] };

      const navigate=useNavigate();
      
      
      // Filter results based on search term
      const filteredResults = result?.filter(student => 
        student.student_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.student_email.toLowerCase().includes(searchTerm.toLowerCase())
      );
    
      const handleViewDetails = (userId) => {
           navigate(`/home/assessment/view-detailed-learner-result/archive/${assessment._id}/${userId}`  );
      }
    
      // Function to format date (placeholder as the data doesn't include dates)
      const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
      };
    
      // Calculate statistics
      const totalLearners = result?.length || 0;
      const notCompetentCount = result?.filter(student => student.status === "not-competent").length || 0;
      const competentCount = result?.filter(student => student.status === "competent").length || 0;
    
      return (
        <div className="bg-white m-4 dark:bg-gray-800 dark:text-white rounded-lg shadow-lg overflow-hidden">
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex flex-col md:flex-row md:justify-between md:items-center space-y-4 md:space-y-0">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center">
                <Archive className="mr-2 h-6 w-6 text-gray-500 dark:text-gray-400" />
                Archived Learners - Resubmission Requests
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mt-1">
                {assessment?.assessment_name || "Assessment"} ({assessment?.assessment_type?.replace('_', ' ')?.toUpperCase() || "Assessment"})
              </p>
            </div>

            <button 
        onClick={() => window.history.back()}
        className='button-style'>
            Back
        </button>
            
            <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
              <div className="relative w-full sm:w-64">
                <input
                  type="text"
                  placeholder="Search learners..."
                  className="pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white w-full"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <div className="absolute left-3 top-2.5 text-gray-400">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Statistics Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-6">
          <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 flex items-center">
            <div className="bg-blue-100 dark:bg-blue-800 p-3 rounded-full">
              <User className="h-6 w-6 text-blue-600 dark:text-blue-400" />
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-500 dark:text-gray-400">Total Learners</p>
              <p className="text-xl font-semibold text-gray-800 dark:text-white">{totalLearners}</p>
            </div>
          </div>
          
          <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4 flex items-center">
            <div className="bg-green-100 dark:bg-green-800 p-3 rounded-full">
              <Award className="h-6 w-6 text-green-600 dark:text-green-400" />
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-500 dark:text-gray-400">Competent</p>
              <p className="text-xl font-semibold text-gray-800 dark:text-white">{competentCount}</p>
            </div>
          </div>
          
          <div className="bg-red-50 dark:bg-red-900/20 rounded-lg p-4 flex items-center">
            <div className="bg-red-100 dark:bg-red-800 p-3 rounded-full">
              <RefreshCw className="h-6 w-6 text-red-600 dark:text-red-400" />
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-500 dark:text-gray-400">Not Competent</p>
              <p className="text-xl font-semibold text-gray-800 dark:text-white">{notCompetentCount}</p>
            </div>
          </div>
        </div>
        
        {/* Table */}
        <div className="overflow-x-auto px-6 pb-6">
          {filteredResults?.length > 0 ? (
            <table className="table-auto w-full min-w-max divide-y divide-gray-200 dark:divide-gray-700">
              <thead>
                <tr className="bg-gray-50 dark:bg-gray-700">
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">Learner</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">Date Archived</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">Status</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">Score</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">Questions</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                {filteredResults.map((student) => (
                  <tr key={student.user_id} className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                    <td className="px-4 py-4 whitespace-nowrap">{student.student_name}</td>
                    <td className="px-4 py-4 whitespace-nowrap">{formatDate(assessment.createdAt)}</td>
                    <td className="px-4 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${student.status === 'competent' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'}`}>{student.status === 'competent' ? 'Competent' : 'Not Competent'}</span>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap">{student.final_score} / {student.total_questions*10}</td>
                    <td className="px-4 py-4 whitespace-nowrap">{student.total_questions} questions</td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm font-medium">
                      <button className="bg-blue-600 hover:bg-blue-700 text-white py-1 px-3 rounded-md text-sm transition-colors"
                      onClick={() => handleViewDetails(student.user_id)}
                      >View Details</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            
          ) : (
            <p className="text-center text-gray-500 dark:text-gray-400">No archived learners found.</p>
          )}
        </div>
      </div>
      
      );
    };
    
    export default ArchivedLearnersListComponent;
