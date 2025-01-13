import { TbCloudUpload } from "react-icons/tb";
import { useState } from "react";
import { useDropzone } from "react-dropzone";
import axios from "axios";
import { useQuery } from "react-query";

const fetchFiles = async()=> {
    const response = await axios.get('http://localhost:1000/files');
    return response.data.files;
  }

function UploadCourseware() {

  const [file, setFile] = useState(null); // File state
  const [loading, setLoading] = useState(false); // Loading state
  const [error, setError] = useState(""); // Error message

  

  


  return (

    <div className="max-h-[calc(100vh-80px)] ">
    <div className="max-w-6xl mx-auto py-4 px-4">
    {/* File Upload Section */}
    <div className="bg-white dark:bg-gray-800 shadow-lg rounded-xl p-8 mb-2">
      <h2 className="text-2xl font-semibold text-center text-gray-800 dark:text-white mb-6">
        Upload Approved courseware
      </h2>

      <div
        
        className="border-dashed border-4 border-gray-400 rounded-lg p-6 flex flex-col items-center justify-center cursor-pointer hover:border-blue-500 transition duration-300"
      >
        <input/>
        <TbCloudUpload className="text-6xl text-gray-500 mb-4" />
        <p className="text-lg text-gray-600 dark:text-white">Drag and drop a PDF here, or click to browse.</p>
      </div>

      {file && (
        <p className="mt-4 text-sm text-gray-600 dark:text-white">
          Uploaded file: <span className="font-semibold">{file.name}</span>
        </p>
      )}

      {loading && <p className="mt-4 text-blue-500">Uploading and processing file...</p>}

      
    </div>

    {/* Submit Button */}
    <div className="flex justify-center mb-2">
      <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition duration-300">
        Submit Uploaded Files
      </button>
    </div>

    {/* Uploaded Files Display Section */}
    <div className="h-[calc(100vh-465px)] overflow-y-auto">
    <div className="mt-6">
      <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-6">
        Uploaded Files
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <p>Files</p>
      </div>
    </div>
    </div>
  </div></div>
  );
}

export default UploadCourseware;
