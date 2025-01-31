import { TbCloudUpload } from "react-icons/tb";
import { useRef, useState } from "react";
import axios from "axios";
import { BsFilePdf } from "react-icons/bs";
import { FiUploadCloud, FiTrash2 } from "react-icons/fi";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { MdCheckCircle, MdErrorOutline } from "react-icons/md";

const VITE_API_URL = import.meta.env.VITE_API_URL;

function UploadCourseware() {
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState("");
  const [courses, setCourses] = useState([]);
  const [assessments, setAssessments] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState("");
  const [selectedAssessment, setSelectedAssessment] = useState("");
  const [dragActive, setDragActive] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isFetchingCourses, setIsFetchingCourses] = useState(true);
  const [isFetchingAssessments, setIsFetchingAssessments] = useState(false);
  const [selectedCourseIndex , setSelectedCourseIndex] = useState(null);
  const fileInputRef = useRef(null);

  useState(() => {
    const fetchCourses = async () => {
      try {
        setIsFetchingCourses(true);
        const response = await axios.get(`${VITE_API_URL}/api/courses`);
        console.log("response", response);
        setCourses(response?.data || []); 
      } catch (error) {
        console.error("Error fetching courses:", error);
      } finally {
        setIsFetchingCourses(false);
      }
    };
    fetchCourses();
  }, []);


  const handleFileChange = (e) => {
    const uploadedFile = e.target.files?.[0];
    if (uploadedFile && uploadedFile.type === "application/pdf") {
      setFile(uploadedFile);
      setError(null);
    } else {
      setError("Only PDF files are allowed.");
    }
  };

  const handleCourseChange = (e) => {
    setSelectedCourseIndex(e.target.value);
    console.log("Selected course:", e.target.value);
    setSelectedCourse(e.target.value);
    setSelectedAssessment("");
  };

  const handleSubmit = async () => {
    if (!fileName || !file || !selectedCourse || !selectedAssessment) {
      setError("Please fill out all fields and upload a valid file.");
      return;
    }

    setLoading(true);

    const formData = new FormData();
    formData.append("file", file);
    formData.append("fileName", fileName);
    formData.append("courseId", selectedCourse);
    formData.append("assessmentId", selectedAssessment);

    try {
      const response = await axios.post(`${VITE_API_URL}/upload`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      console.log("File uploaded successfully:", response.data);
      setFile(null);
      setFileName("");
      setSelectedCourse("");
      setSelectedAssessment("");
      setError(null);
    } catch (error) {
      console.error("File upload failed:", error);
      setError("File upload failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto py-6 px-4 sm:px-6 lg:px-8 dark:bg-gray-900">
      <div className="bg-white dark:bg-gray-800 shadow-xl rounded-2xl p-6 sm:p-8">
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800 dark:text-gray-100">
          Upload Approved Courseware
        </h2>

        {/* File Name Input */}
        <div className="mb-4">
          <label className="block text-gray-700 dark:text-gray-300 font-medium mb-2 flex items-center gap-2">
            <BsFilePdf className="text-blue-600" />
            File Name
          </label>
          <input
            type="text"
            value={fileName}
            onChange={(e) => setFileName(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg dark:border-gray-700 dark:bg-gray-700 dark:text-gray-100"
            placeholder="Enter file name"
          />
        </div>

        {/* Choose Course Dropdown */}
        <div className="mb-4">
          <label className="block text-gray-700 dark:text-gray-300 font-medium mb-2 flex items-center gap-2">
            <MdCheckCircle className="text-green-600" />
            Choose Course
          </label>
          {isFetchingCourses ? (
            <div className="h-10 bg-gray-200 dark:bg-gray-700 animate-pulse rounded-lg"></div>
          ) : (
            <select
              value={selectedCourse}
              onChange={handleCourseChange}
              className="w-full px-4 py-2 border rounded-lg dark:border-gray-700 dark:bg-gray-700 dark:text-gray-100"
            >
              <option value="">Select a course</option>
              {courses?.map((course) => (
                <option key={course?._id} value={course?._id}>
                  {course?.courseName || "Unnamed Course"}
                </option>
              ))}
            </select>
          )}
        </div>

        {/* Choose Assessment Dropdown */}
        <div className="mb-4">
          <label className="block text-gray-700 dark:text-gray-300 font-medium mb-2 flex items-center gap-2">
            <MdErrorOutline className="text-yellow-600" />
            Choose Assessment
          </label>
          {isFetchingAssessments ? (
            <div className="h-10 bg-gray-200 dark:bg-gray-700 animate-pulse rounded-lg"></div>
          ) : (
            <select
              value={selectedAssessment}
              onChange={(e) => setSelectedAssessment(e.target.value)}
              disabled={!selectedCourse}
              className="w-full px-4 py-2 border rounded-lg dark:border-gray-700 dark:bg-gray-700 dark:text-gray-100"
            >
              <option value="">Select an assessment</option>
              {courses?.find((item)=>item._id===selectedCourse)?.assessments?. map((assessment) => (
                <option key={assessment?.id} value={assessment?._id}>
                  {assessment?.name || "Unnamed Assessment"}
                </option>
              ))}
            </select>
          )}
        </div>

        {/* File Upload Section */}
        <div
          onClick={() => fileInputRef.current?.click()}
          className={`border-dashed border-4 rounded-2xl p-8 text-center cursor-pointer mb-4 ${
            dragActive
              ? "border-blue-600 bg-blue-100 dark:bg-blue-900"
              : "border-gray-400 dark:border-gray-600"
          }`}
        >
          <input
            type="file"
            accept=".pdf"
            className="hidden"
            ref={fileInputRef}
            onChange={handleFileChange}
          />
          <TbCloudUpload className="text-4xl text-gray-500 dark:text-gray-300 mb-2" />
          <p className="text-gray-700 dark:text-gray-300">
            Click here to upload a courseware file
          </p>
        </div>

        {/* Error Message */}
        {error && <p className="text-red-500 dark:text-red-400 mb-4">{error}</p>}

        {/* Submit Button */}
        <button
          onClick={handleSubmit}
          disabled={loading}
          className={`px-4 py-2 rounded-lg w-full font-medium ${
            loading
              ? "bg-blue-400 text-white"
              : "bg-blue-600 hover:bg-blue-700 text-white dark:bg-blue-500 dark:hover:bg-blue-600"
          }`}
        >
          {loading ? "Uploading..." : "Submit"}
        </button>
      </div>
    </div>
  );
}

export default UploadCourseware;
