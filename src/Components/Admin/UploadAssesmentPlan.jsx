import { useState, useEffect } from "react";
import {
  TbCloudUpload,
  TbFidgetSpinner,
  TbFlagPlus,
  TbTrash,
} from "react-icons/tb";
import axios from "axios";
// import io from "socket.io-client";
import DeleteModal from "./DeleteModal";
import CreateExamModal from "../Admin/Assessment Creation/CreateExamModal";
import { Download, Upload, Settings } from "lucide-react";
import { FaSpinner } from "react-icons/fa";
const VITE_API_URL = import.meta.env.VITE_API_URL;

// const socket = io(`${VITE_API_URL}`, {
//   transports: ["websocket"], // Force WebSocket transport
// });

// socket.on("connect", () => {
//   console.log("Connected to WebSocket server");
// });

// socket.on("disconnect", () => {
//   console.log("Disconnected from WebSocket server");
// });

const UploadAssessmentPlan = () => {
  const [title, setTitle] = useState(""); // File name
  const [file, setFile] = useState(""); // File
  const [fetchedFiles, setFetchedFiles] = useState([]); // Array to store fetched files
  const [fileToDelete, setFileToDelete] = useState(null); // Track the file to delete
  const [showDeleteModal, setShowDeleteModal] = useState(false); // State for controlling the delete confirmation modal
  const [showCreateExamModal, setShowCreateExamModal] = useState(false); // State for showing the Create Exam Modal
  const [loading, setLoading] = useState(false);
  // Function to fetch files from the server
  const fetchFiles = async () => {
    try {
      const response = await axios.get(`${VITE_API_URL}/api/db/all-files`);
      console.log("Fetched Files:", response.data.files); // Log fetched files
      setFetchedFiles(response.data.files); // Update state with the list of files
    } catch (error) {
      console.error("Error fetching files:", error);
    }
  };

  const getFileType = (fileName) => {
    const extension = fileName.split(".").pop().toLowerCase();
    const typeMap = {
      docx: "Word",
      pdf: "PDF",
      xlsx: "Excel",
      pptx: "PowerPoint",
      txt: "Text",
    };
    return typeMap[extension] || extension.toUpperCase();
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  //fetching all the files
  useEffect(() => {
    // Initial fetch files
    fetchFiles();

    // Listen for the fileUploaded event from the server
    // socket.on("fileUploaded", () => {
    //   console.log("New File uploaded");
    //   fetchFiles(); // Refetch files when a new one is uploaded
    // });

    // Cleanup when the component unmounts
    // return () => {
    //   socket.off("fileUploaded");
    // };
  }, []); // Empty dependency array to ensure this only runs on mount and unmount

  // Handle file upload
  const handleFileUpload = (event) => {
    const uploadedFile = event.target.files[0];
    setFile(uploadedFile);
  };

  //file deletion
  // useEffect(() => {
  //   // Listen for the 'fileDeleted' event from the backend
  //   socket.on("fileDeleted", (deletedFile) => {
  //     console.log("File deleted:", deletedFile);
  //     // Refetch or update the state after deleting the file
  //     fetchFiles();
  //   });

  //   // Cleanup on unmount
  //   return () => {
  //     socket.off("fileDeleted");
  //   };
  // }, []);

  // Handle submit files
  const submitFiles = async (e) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData();
    formData.append("title", title);
    formData.append("file", file);

    try {
      const result = await axios.post(
        `${VITE_API_URL}/api/upload-assesmentFiles`,
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
    setLoading(false);
  };

  return (
    <div className="h-[calc(100vh-100px)] m-4 flex dark:bg-gray-900 justify-center items-center">
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

  <div className="flex flex-col items-center justify-center gap-6 h-full w-full max-w-7xl mx-auto">
    {/* Upload component */}
    <div className="w-full h-3/4">
      {/* File Upload Section for Assessment Plan */}
      <div className="flex justify-center w-full">
        <div className="py-4 shadow-lg rounded-xl p-6 border w-full max-w-4xl border-gray-200 dark:border-gray-700">
          <h2 className="text-3xl font-semibold text-center text-gray-800 dark:text-white mb-6">
            Upload Assessment Plan
          </h2>

          <form onSubmit={submitFiles}>
            {/* File Upload Area */}
            <div className="border-dashed border-4 p-8 border-gray-400 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:border-blue-500 transition duration-300">
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
              {loading ? <FaSpinner className="animate-spin" /> : "Upload"}
            </button>
          </form>
        </div>
      </div>
    </div>

    {/* Displaying Uploaded Files */}
    <div className="w-full max-w-4xl">
      {fetchedFiles.length === 0 ? (
        <p className="text-center text-gray-600 dark:text-white mt-4">
          No files uploaded yet.
        </p>
      ) : (
        <div className="dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-3xl font-semibold text-center bg-gradient-to-r from-blue-600 to-pink-600 text-transparent bg-clip-text dark:text-white mt-8">
                Uploaded Assessment Files
              </h2>
            </div>
            <div className="flex gap-2">
              <Settings className="w-6 h-6 text-gray-500" />
              <img
                src="https://image.lexica.art/full_webp/83478ae7-0c14-4180-af00-a694dd39286d"
                alt="User avatar"
                className="w-8 h-8 rounded-full"
              />
            </div>
          </div>

          {/* File Table */}
          <div className="bg-white dark:bg-gray-800 h-48 overflow-y-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4 text-gray-600 font-medium">
                    Title
                  </th>
                  <th className="text-left py-3 px-4 text-gray-600 font-medium">
                    File Name
                  </th>
                  <th className="text-left py-3 px-4 text-gray-600 font-medium">
                    File Type
                  </th>
                  <th className="text-left py-3 px-4 text-gray-600 font-medium">
                    Uploaded Date
                  </th>
                  <th className="text-left py-3 px-4 text-gray-600 font-medium">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {fetchedFiles.map((file) => (
                  <tr key={file._id} className="border-b hover:bg-gray-50">
                    <td className="py-3 px-4">{file.title}</td>
                    <td className="py-3 px-4 text-sm text-gray-600">
                      {file.fileName}
                    </td>
                    <td className="py-3 px-4">{getFileType(file.fileName)}</td>
                    <td className="py-3 px-4">{formatDate(file.uploadedAt)}</td>
                    <td className="py-3 px-4">
                      <div className="flex flex-col sm:flex-row gap-2">
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
        </div>
      )}
    </div>
  </div>
</div>

  );
};

export default UploadAssessmentPlan;
