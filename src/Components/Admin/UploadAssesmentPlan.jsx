import { useState, useEffect } from "react";
import { TbCloudUpload, TbFlagPlus, TbTrash } from "react-icons/tb";
import axios from "axios";
import io from "socket.io-client";
import DeleteModal from "./DeleteModal";
import CreateExamModal from "./CreateExamModal";
import { Download, Upload, Settings } from 'lucide-react';
const socket = io("http://localhost:1000", {
  transports: ["websocket"], // Force WebSocket transport
});

socket.on("connect", () => {
  console.log("Connected to WebSocket server");
});

socket.on("disconnect", () => {
  console.log("Disconnected from WebSocket server");
});

const UploadAssessmentPlan = () => {
  const [title, setTitle] = useState(""); // File name
  const [file, setFile] = useState(""); // File
  const [fetchedFiles, setFetchedFiles] = useState([]); // Array to store fetched files
  const [fileToDelete, setFileToDelete] = useState(null); // Track the file to delete
  const [showDeleteModal, setShowDeleteModal] = useState(false); // State for controlling the delete confirmation modal
  const [showCreateExamModal, setShowCreateExamModal] = useState(false); // State for showing the Create Exam Modal

  // Function to fetch files from the server
  const fetchFiles = async () => {
    try {
      const response = await axios.get(
        "http://localhost:1000/api/db/all-files"
      );
      console.log("Fetched Files:", response.data.files); // Log fetched files
      setFetchedFiles(response.data.files); // Update state with the list of files
    } catch (error) {
      console.error("Error fetching files:", error);
    }
  };

  const getFileType = (fileName) => {
    const extension = fileName.split('.').pop().toLowerCase();
    const typeMap = {
      'docx': 'Word',
      'pdf': 'PDF',
      'xlsx': 'Excel',
      'pptx': 'PowerPoint',
      'txt': 'Text'
    };
    return typeMap[extension] || extension.toUpperCase();
  };


  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  //fetching all the files
  useEffect(() => {
    // Initial fetch files
    fetchFiles();

    // Listen for the fileUploaded event from the server
    socket.on("fileUploaded", () => {
      console.log("New File uploaded");
      fetchFiles(); // Refetch files when a new one is uploaded
    });

    // Cleanup when the component unmounts
    return () => {
      socket.off("fileUploaded");
    };
  }, []); // Empty dependency array to ensure this only runs on mount and unmount

  // Handle file upload
  const handleFileUpload = (event) => {
    const uploadedFile = event.target.files[0];
    setFile(uploadedFile);
  };

  

  //file deletion
  useEffect(() => {
    // Listen for the 'fileDeleted' event from the backend
    socket.on("fileDeleted", (deletedFile) => {
      console.log("File deleted:", deletedFile);
      // Refetch or update the state after deleting the file
      fetchFiles();
    });

    // Cleanup on unmount
    return () => {
      socket.off("fileDeleted");
    };
  }, []);

  // Handle submit files
  const submitFiles = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("file", file);

    try {
      const result = await axios.post(
        "http://localhost:1000/api/upload-assesmentFiles",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      console.log(result);
      setTitle(""); // Clear title after upload
      setFile(""); // Clear file after upload
      fetchFiles(); // Refetch files after upload
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };

  return (
    <div className="h-[calc(100vh-100px)] m-4 flex dark:bg-gray-900 justify-center items-center ">
      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <DeleteModal
          fileToDelete={fileToDelete}
          setShowDeleteModal={setShowDeleteModal}
          fetchFiles={fetchFiles}
        />
      )}

      {/* Create Exam Modal */}
      {showCreateExamModal && (
        <CreateExamModal
          file={file}
          setShowCreateExamModal={setShowCreateExamModal}
        />
      )}

      <div className="flex items-center justify-center gap-6">

      <div className="h-full ">
        {/* File Upload Section for Assessment Plan */}
        <div className="flex justify-center  ">
          <div className="bg-white dark:bg-gray-800 py-4 shadow-lg rounded-xl p-6 border border-gray-200 dark:border-gray-700"> 
            <h2 className="text-3xl font-semibold text-center text-gray-800 dark:text-white mb-6">
              Upload Assessment Plan
            </h2>

            <form onSubmit={submitFiles}>
              {/* File Upload Area */}
              <div className="border-dashed border-4 p-8 border-gray-400 rounded-lg  flex flex-col items-center justify-center cursor-pointer hover:border-blue-500 transition duration-300 ">
                <TbCloudUpload className="text-6xl text-gray-500 mb-4" />
                <p className="text-lg text-gray-600 dark:text-white">
                  Drag and drop a PDF here, or click to browse.
                </p>
                <div className="flex flex-col mt-4">
                  <input
                    type="file"
                    accept="application/pdf"
                    onChange={handleFileUpload}
                    className="cursor-pointer bg-blue-400 px-4 py-2 rounded-xl"
                    id="upload-pdf"
                  />
                </div>
              </div>

              {/* File Name Input */}
              <div className="mt-4">
                <label
                  htmlFor="file-name"
                  className="text-lg text-gray-600 dark:text-white"
                >
                  Enter File Name:
                </label>
                <input
                  type="text"
                  id="file-name"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Enter a name for the file"
                  className="mt-2 w-full p-3 rounded-lg border border-gray-300 dark:border-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <button className="px-4 py-2 bg-blue-400 mt-2 rounded-xl hover:bg-blue-600">
                Upload Files
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Displaying Uploaded Files */}
      <div className="">
        

        {fetchedFiles.length === 0 ? (
          <p className="text-center text-gray-600 dark:text-white mt-4">
            No files uploaded yet.
          </p>
        ) : (
          <div className="max-w-5xl mx-auto p-6 dark:bg-gray-800 bg-white border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div>
            <h2 className="text-3xl font-semibold text-center bg-gradient-to-r from-blue-600 to-pink-600 text-transparent bg-clip-text dark:text-white mt-8">
          Uploaded Assessment Plans
        </h2>
              
            </div>
            <div className="flex gap-2">
              <Settings className="w-6 h-6 text-gray-500" />
              <img src="https://image.lexica.art/full_webp/83478ae7-0c14-4180-af00-a694dd39286d" alt="User avatar" className="w-8 h-8 rounded-full" />
            </div>
          </div>
    
          {/* File Table */}
           
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b">
              <th className="text-left py-3 px-4 text-gray-600 font-medium">Title</th>
              <th className="text-left py-3 px-4 text-gray-600 font-medium">File Name</th>
              <th className="text-left py-3 px-4 text-gray-600 font-medium">File Type</th>
              <th className="text-left py-3 px-4 text-gray-600 font-medium">Uploaded Date</th>
              <th className="text-left py-3 px-4 text-gray-600 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {fetchedFiles.map((file) => (
              <tr key={file._id} className="border-b hover:bg-gray-50">
                <td className="py-3 px-4">{file.title}</td>
                <td className="py-3 px-4 text-sm text-gray-600">{file.fileName}</td>
                <td className="py-3 px-4">{getFileType(file.fileName)}</td>
                <td className="py-3 px-4">{formatDate(file.uploadedAt)}</td>
                <td className="py-3 px-4">
                  <div className="flex gap-2">
                  <button
                        className="bg-blue-400 text-white rounded-lg px-6 py-3 hover:bg-blue-500 transition duration-300 w-full sm:w-auto flex items-center justify-center gap-2"
                        onClick={() => {
                          setFile(file); // Set file for Create Exam
                          setShowCreateExamModal(true);
                        }}
                      >
                        <TbFlagPlus /> {/* Create Exam Icon */}
                        Create Exam
                      </button>
                    

                      <button
                        className="bg-red-400 text-white rounded-lg px-6 py-3 hover:bg-red-500 transition duration-300 w-full sm:w-auto flex items-center justify-center gap-2"
                        onClick={() => {
                          setFileToDelete(file); // Set the file to delete
                          setShowDeleteModal(true); // Show the confirmation modal
                        }}
                      >
                        <TbTrash /> {/* Delete Icon */}
                        Delete
                      </button>

                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    
          {/* Action Buttons */}
          <div className="flex gap-4 mt-6">
            <button className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
              <Download className="w-4 h-4" />
              Download
            </button>
            <button className="flex items-center gap-2 bg-white text-gray-600 border px-4 py-2 rounded hover:bg-gray-50">
              Delete
            </button>
            <button className="flex items-center gap-2 bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600">
              <Upload className="w-4 h-4" />
              Update
            </button>
          </div>
    
          
        </div>
        )}
      </div>

      </div>
    </div>
  );
};

export default UploadAssessmentPlan;


// {/* <div className="mt-8  h-[calc(100vh-660px)] overflow-y-auto">
//             {fetchedFiles.map((file, index) => (
//               <div
//                 key={index}
//                 className="mt-4 bg-gray-100 dark:bg-gray-800 shadow-lg rounded-xl p-2"
//               >
//                 <div className="grid grid-cols-12 gap-2">
//                   {/* Display PDF Preview */}
//                   <div className="col-span-8">
//                     <div className="flex justify-between items-center gap-4  dark:bg-gray-700 rounded-xl py-2 px-1">
//                       <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
//                         File: {file.title || "Untitled"}
//                       </h3>
//                       <div className="border border-gray-300 dark:border-gray-500 px-4 py-2 rounded-lg">
//                         {file.fileName}
//                       </div>
//                     </div>
//                   </div>

//                   {/* Buttons for Actions */}
//                   <div className="col-span-4 ">
//                     <div className="flex gap-2 items-center justify-center h-full">
//                       <button
//                         className="bg-blue-400 text-white rounded-lg px-6 py-3 hover:bg-blue-500 transition duration-300 w-full sm:w-auto flex items-center justify-center gap-2"
//                         onClick={() => {
//                           setFile(file); // Set file for Create Exam
//                           setShowCreateExamModal(true);
//                         }}
//                       >
//                         <TbFlagPlus /> {/* Create Exam Icon */}
//                         Create Exam
//                       </button>

//                       <button
//                         className="bg-red-400 text-white rounded-lg px-6 py-3 hover:bg-red-500 transition duration-300 w-full sm:w-auto flex items-center justify-center gap-2"
//                         onClick={() => {
//                           setFileToDelete(file); // Set the file to delete
//                           setShowDeleteModal(true); // Show the confirmation modal
//                         }}
//                       >
//                         <TbTrash /> {/* Delete Icon */}
//                         Delete
//                       </button>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             ))}
// </div> */}