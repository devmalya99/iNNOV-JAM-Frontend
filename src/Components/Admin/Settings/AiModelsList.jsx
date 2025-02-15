import React, { useState, useEffect } from "react";
import { AlertCircle, CheckCircle, Loader2, Database, RefreshCcw } from "lucide-react";
import { motion } from "framer-motion";
import { FaEdit, FaTrash } from "react-icons/fa";
import { useMutation, useQuery, useQueryClient } from "react-query";
import axios from "axios";
import { FetchAiModelsApi } from "../../../services/Admin/AiModels/FetchAiModelsApi";

import AiModelsUpdateModal from "./AiModels/AiModelsUpdateModal"
// React Query Delete Mutation
const deleteAiModel = async (id) => {
  const VITE_API_URL = import.meta.env.VITE_API_URL;
  const response = await axios.delete(`${VITE_API_URL}/api/ai-models/remove/${id}`);
  return response.data;
};

const AiModelsList = () => {
  const [error, setError] = useState("");
  const queryClient = useQueryClient();

  const[openEdit,setOpenEdit] = useState(false)
  const [selectedModelData,setSelectedModels] = useState()



  // Fetching AI Models
  const { data: aiModels, isLoading, refetch } = FetchAiModelsApi();

  useEffect(() => {
    refetch();
  }, [refetch]);

  // React Query Delete Mutation Hook
  const { mutate: deleteModel, isLoading: isDeleting } = useMutation(deleteAiModel, {
    onSuccess: () => {
      // Invalidate and refetch the AI models list after delete
      
      queryClient.invalidateQueries(["allAiModelsCreated"]);
    },
    onError: (err) => {
      setError(err.message);
    },
  });

  // console.log("AI models:", aiModels);

  // Loading State
  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen text-gray-700">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
        >
          <Loader2 size={50} className="text-blue-500" />
        </motion.div>
        <p className="mt-4 text-lg font-semibold">Loading AI Models...</p>
      </div>
    );
  }

  // Error State
  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen text-red-600">
        <AlertCircle size={50} className="mb-4" />
        <p className="text-lg font-semibold">Error: {error}</p>
      </div>
    );
  }

  // Delete Model Handler
  const handleModelDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this model?")) {
      deleteModel(id);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 h-[calc(100vh-80px)] overflow-y-auto">

        {/* Edit optionb */}

        {openEdit && (
  <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
    <div className="bg-white rounded-lg shadow-lg w-full max-w-2xl p-6 z-50">
      <AiModelsUpdateModal existingModelData={selectedModelData} setOpenEdit={setOpenEdit} />
    </div>
  </div>
)}



      <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">
        AI Models List
      </h2>

      <div 
      onClick={()=>refetch()}
      className="flex justify-center button-style my-2 cursor-pointer">
        
        <p>Refresh</p>
        <RefreshCcw/>
      </div>

      

      {/* Fallback UI if no models found */}
      {aiModels?.length === 0 ? (
        <div className="flex flex-col items-center justify-center p-10 border rounded-lg shadow-md bg-gray-100">
          <Database size={40} className="text-gray-500" />
          <p className="mt-4 text-lg text-gray-600">No AI Models Found</p>
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-4"
        >
          {aiModels?.data?.map((model, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.03 }}
              transition={{ duration: 0.3 }}
              className="p-6 border border-gray-300 rounded-lg shadow-lg bg-white"
            >
              <h3 className="text-xl font-semibold text-blue-600">
                {model.llm_name.join(" / ")}
              </h3>
              <p className="text-gray-600 mt-1">
                <span className="font-medium">Model Type:</span>{" "}
                {model.model_type.join(" / ")}
              </p>
              <div className="mt-2">
                <p className="font-medium">Weightage:</p>
                <ul className="mt-1 space-y-1">
                  {model.weightage.map((weight, idx) => (
                    <li key={idx} className="flex items-center gap-2">
                      <CheckCircle size={16} className="text-green-500" />
                      <span className="font-medium text-gray-700">
                        {model.llm_name[idx]}:
                      </span>{" "}
                      <span className="text-gray-800 font-semibold">
                        {weight}%
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Footer action buttons */}
              <div className="action-button-footer flex items-center justify-between gap-3 p-2 bg-gray-50 dark:bg-gray-700/50 rounded-lg cursor-pointer mt-4">
                <button
                  className="bg-red-700 px-4 py-2 rounded-lg"
                  onClick={() => handleModelDelete(model._id)}
                  disabled={isDeleting}
                >
                  <FaTrash className="text-md text-gray-100 dark:text-gray-400" />
                </button>
                <button 
                 onClick={()=>{
                    setOpenEdit(true)
                    setSelectedModels(model)
                
                 }}
                className="flex items-center justify-center bg-green-700 px-4 py-2 rounded-lg">
                  <FaEdit className="text-md text-gray-100 dark:text-gray-400" />
                </button>
              </div>
            </motion.div>
          ))}
        </motion.div>
      )}
    </div>
  );
};

export default AiModelsList;
