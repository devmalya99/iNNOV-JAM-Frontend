import React, { useEffect, useState } from 'react';
import axios from "axios"; // Ensure axios is imported
// import { Pencil, Trash2, Upload, FileText, Loader2 } from 'lucide-react';
import { useNavigate, useParams } from 'react-router';
import { useFetchAllAssessmentFiles } from '../../../services/FetchAllAssessmentFilesByCourse';


import { Pencil, Trash2, Upload, FileText, Loader2, File, ArrowLeft } from 'lucide-react';

import { motion } from 'framer-motion';
import CreateExamModal from './CreateExamModal';

const ViewAssessmentFiles = () => {

  const [showCreateAssessmentModal, setShowCreateAssessmentModal] = useState(false);
  const [selectedAssessment, setSelectedAssessment] = useState(null);
  const [selectedFileId, setSelectedFileId] = useState(null);
  const [showConfirm, setShowConfirm] = useState(false);
  const { courseid } = useParams();
  const { data, isLoading, refetch } = useFetchAllAssessmentFiles(courseid);

   const navigate=useNavigate()

   const VITE_API_URL = import.meta.env.VITE_API_URL

  //  console.log("assessment file data is",data)

   
  useEffect(() => {
      refetch();
      console.log(data)
    }, [refetch]);
  



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

  if ( data.length === 0) {
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
          <button 
          onClick={()=>navigate(-1)}
          className='button-style my-2'> <ArrowLeft/>  Go back</button>
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


const handleDeleteClick = (id) => {
  setSelectedFileId(id);
  setShowConfirm(true);
};

const confirmDelete = async () => {
  if (!selectedFileId) return;
  try {

    await axios.delete(`${VITE_API_URL}/api/files/remove/${selectedFileId}`);
    
    refetch(); // Refresh list after deletion

  } catch (error) {

    console.error("Error deleting file:", error);

  } finally {

    setShowConfirm(false);
    setSelectedFileId(null);

  }
};

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-h-[calc(100vh-80px)] overflow-y-auto bg-gray-250 dark:bg-gray-900">

        <button 
        className='button-style my-2' 
        onClick={()=>navigate(-1)}> <ArrowLeft/>  Go back</button>


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
                  onClick={() => handleDeleteClick(assessment._id)}
                  className="p-2 text-gray-600 hover:text-red-600 dark:text-gray-400 
                           dark:hover:text-red-400 rounded-lg hover:bg-red-50 
                           dark:hover:bg-red-900/30 transition-colors"
                  title="Delete"
                >
                  <Trash2 className="h-4 w-4 text-red-400" />
                </motion.button>

              </div>
            </div>
            
          </motion.div>
        ))}


      </motion.div>



      {showConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <p className="text-lg">Are you sure you want to delete this file?</p>
            <div className="flex justify-end gap-4 mt-4">
              <button className="px-4 py-2 bg-gray-300 rounded" onClick={() => setShowConfirm(false)}>Cancel</button>
              <button className="px-4 py-2 bg-red-600 text-white rounded" onClick={confirmDelete}>Delete</button>
            </div>
          </div>
        </div>
      )}

     
    </div>
  );
};

export default ViewAssessmentFiles;