import React, { useState } from 'react';
import axios from "axios"; // Ensure axios is imported
// import { Pencil, Trash2, Upload, FileText, Loader2 } from 'lucide-react';
import { useParams } from 'react-router';
import { useFetchAllAssessmentFiles } from '../../../services/FetchAllAssessmentFilesByCourse';


import { Pencil, Trash2, Upload, FileText, Loader2, File } from 'lucide-react';

import { motion } from 'framer-motion';
import CreateExamModal from './CreateExamModal';

const ViewAssessmentFiles = () => {
  const { courseid } = useParams();
  const { data, isLoading } = useFetchAllAssessmentFiles(courseid);
  const [showCreateAssessmentModal, setShowCreateAssessmentModal] = useState(false);
const [selectedAssessment, setSelectedAssessment] = useState(null);


  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  if (isLoading) {
    return (
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="w-full min-h-[calc(100vh-6rem)] flex items-center justify-center dark:bg-gray-900"
      >
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="h-10 w-10 animate-spin text-indigo-600 dark:text-indigo-400" />
          <p className="text-base text-gray-600 dark:text-gray-300">Loading assessments...</p>
        </div>
      </motion.div>
    );
  }

  if (!data?.length) {
    return (
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="w-full min-h-[calc(100vh-6rem)] flex items-center justify-center"
      >
        <div className="p-8 border-2 border-dashed rounded-xl dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50">
          <div className="flex flex-col items-center gap-4">
            <FileText className="h-16 w-16 text-gray-400 dark:text-gray-500" />
            <p className="text-base text-gray-600 dark:text-gray-300">No assessment files available</p>
          </div>
        </div>
      </motion.div>
    );
  }

  const formatDate = (dateString) => {
    return new Date(dateString)?.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

 

const handleCreateAssessment = (assessment) => {
  setSelectedAssessment(assessment); // Store the selected assessment
  setShowCreateAssessmentModal(true);
};


  const handleEdit = (assessment) => {
    console.log('Edit:', assessment);
  };

  const handleDelete = (id) => {
    console.log('Delete:', id);
  };

  const handleReupload = (assessment) => {
    console.log('Reupload:', assessment);
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-h-[calc(100vh-80px)] overflow-y-auto bg-gray-250 dark:bg-gray-900">

      {/* Show create assessment modal */}
      {
        showCreateAssessmentModal && (
          <CreateExamModal 
          assessment={selectedAssessment}
          setShowCreateAssessmentModal={setShowCreateAssessmentModal}
          />
        )
      }
      <motion.div 
        variants={container}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4 sm:gap-6"
      >
        {data?.map((assessment) => (
          <motion.div 
            key={assessment?._id}
            variants={item}
            className="group relative bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 
                     rounded-xl p-4 hover:shadow-lg transition-all duration-300 
                     hover:border-indigo-200 dark:hover:border-indigo-800"
          >
            <div className="flex flex-col gap-3">
              <div className="flex items-start gap-3">
                <div className="p-2 bg-indigo-50 dark:bg-indigo-900/30 rounded-lg">
                  <File className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-lg font-semibold truncate text-gray-900 dark:text-gray-100">
                    {assessment?.title || 'Untitled Assessment'}
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 truncate">
                    {assessment?.fileName?.split('_').pop() || 'No filename'}
                  </p>
                </div>
              </div>
              
              <div className="text-xs text-gray-500 dark:text-gray-400">
                Uploaded: {formatDate(assessment?.uploadedAt)}
              </div>

              <div className="flex items-center gap-1 mt-2 opacity-80 group-hover:opacity-100 transition-opacity">

                {/* Create assessments */}
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleCreateAssessment(assessment)}
                  className="p-2 text-gray-600 hover:text-indigo-600 dark:text-gray-400 
                           dark:hover:text-indigo-400 rounded-lg hover:bg-indigo-50 
                           dark:hover:bg-indigo-900/30 transition-colors"
                  title="Create Assessment"
                >
                  <button className='px-2 py-1 text-md bg-blue-500 rounded-lg text-white'
                 
                  
                  >Create Assessment</button>
                </motion.button>


                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleEdit(assessment)}
                  className="p-2 text-gray-600 hover:text-indigo-600 dark:text-gray-400 
                           dark:hover:text-indigo-400 rounded-lg hover:bg-indigo-50 
                           dark:hover:bg-indigo-900/30 transition-colors"
                  title="Edit"
                >
                  <Pencil className="h-4 w-4" />
                </motion.button>


                {/* Handle Delete */}
                
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleDelete(assessment._id)}
                  className="p-2 text-gray-600 hover:text-red-600 dark:text-gray-400 
                           dark:hover:text-red-400 rounded-lg hover:bg-red-50 
                           dark:hover:bg-red-900/30 transition-colors"
                  title="Delete"
                >
                  <Trash2 className="h-4 w-4" />
                </motion.button>
                
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleReupload(assessment)}
                  className="p-2 text-gray-600 hover:text-emerald-600 dark:text-gray-400 
                           dark:hover:text-emerald-400 rounded-lg hover:bg-emerald-50 
                           dark:hover:bg-emerald-900/30 transition-colors"
                  title="Reupload"
                >
                  <Upload className="h-4 w-4" />
                </motion.button>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default ViewAssessmentFiles;