import React from 'react';
import { Calendar, Clock, ChevronRight } from 'lucide-react';

// Comprehensive assessment data structure
const assessments = [
  {
    id: 1,
    title: "Midterm Exam",
    subject: "History",
    dueDate: "2023-11-10",
    dueTime: "23:59",
    status: "pending",
    type: "exam",
    totalPoints: 100,
    passingScore: 60,
    duration: 180, // in minutes
    instructions: "Answer all questions. Use blue or black ink only.",
    allowedMaterials: ["Calculator", "Reference Sheet"],
    submissionFormat: "pdf",
    coverImage: "/api/placeholder/400/300",
    progressData: {
      completed: 75,
      inProgress: 15,
      notStarted: 10
    }
  },
  {
    id: 2,
    title: "Algebra Test",
    subject: "Mathematics",
    dueDate: "2023-12-01",
    dueTime: "14:30",
    status: "active",
    type: "quiz",
    totalPoints: 50,
    passingScore: 30,
    duration: 90,
    instructions: "Show all work",
    allowedMaterials: ["Scientific Calculator"],
    submissionFormat: "online",
    coverImage: "/api/placeholder/400/300",
    progressData: {
      completed: 45,
      inProgress: 35,
      notStarted: 20
    }
  },
  {
    id: 3,
    title: "Lab Report",
    subject: "Science",
    dueDate: "2023-11-14",
    dueTime: "17:00",
    status: "upcoming",
    type: "assignment",
    totalPoints: 75,
    passingScore: 45,
    duration: null,
    instructions: "Follow lab report format",
    allowedMaterials: ["Lab Data", "Research Papers"],
    submissionFormat: "doc",
    coverImage: "/api/placeholder/400/300",
    progressData: {
      completed: 30,
      inProgress: 40,
      notStarted: 30
    }
  },
  {
    id: 4,
    title: "Essay",
    subject: "English",
    dueDate: "2023-11-20",
    dueTime: "23:59",
    status: "draft",
    type: "assignment",
    totalPoints: 100,
    passingScore: 60,
    duration: null,
    instructions: "1500-2000 words",
    allowedMaterials: ["None"],
    submissionFormat: "doc",
    coverImage: "/api/placeholder/400/300",
    progressData: {
      completed: 20,
      inProgress: 50,
      notStarted: 30
    }
  },
  {
    id: 5,
    title: "Map Project",
    subject: "Geography",
    dueDate: "2023-12-05",
    dueTime: "15:00",
    status: "upcoming",
    type: "project",
    totalPoints: 150,
    passingScore: 90,
    duration: null,
    instructions: "Include legend and scale",
    allowedMaterials: ["Atlas", "Drawing Tools"],
    submissionFormat: "pdf",
    coverImage: "/api/placeholder/400/300",
    progressData: {
      completed: 10,
      inProgress: 60,
      notStarted: 30
    }
  }
];

const AssessmentCard = ({ assessment }) => {
  const getDueDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow duration-200">
      <div className="flex justify-between items-start mb-4 dark:text-white">
        <div>
          <h3 className="text-lg font-semibold text-gray-500">{assessment.title}</h3>
          <p className="text-sm text-gray-600">Subject: {assessment.subject}</p>
        </div>
        <div className="w-20 h-20">
          <img 
            src={assessment.coverImage} 
            alt={assessment.title}
            className="w-full h-full object-cover rounded-md"
          />
        </div>
      </div>

      <div className="flex items-center gap-2 text-sm text-gray-600 mb-3">
        <Calendar className="w-4 h-4" />
        <span>Due: {getDueDate(assessment.dueDate)}</span>
        <Clock className="w-4 h-4 ml-2" />
        <span>{assessment.dueTime}</span>
      </div>

      {assessment.progressData && (
        <div className="mb-4">
          <div className="flex h-2 rounded-full bg-gray-200 overflow-hidden">
            <div 
              style={{ width: `${assessment.progressData.completed}%` }}
              className="bg-green-500"
            />
            <div 
              style={{ width: `${assessment.progressData.inProgress}%` }}
              className="bg-yellow-500"
            />
            <div 
              style={{ width: `${assessment.progressData.notStarted}%` }}
              className="bg-gray-300"
            />
          </div>
        </div>
      )}

      <button className="w-full mt-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-200 flex items-center justify-center gap-2">
        View Details
        <ChevronRight className="w-4 h-4" />
      </button>
    </div>
  );
};

const AssessmentDashboard = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">All Assessments</h1>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-200">
            Create new Assessment
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {assessments.map((assessment) => (
            <AssessmentCard key={assessment.id} assessment={assessment} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default AssessmentDashboard;