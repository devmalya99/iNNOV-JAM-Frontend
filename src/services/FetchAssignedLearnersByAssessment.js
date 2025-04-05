import { useQuery } from "react-query";
import axios from "axios";

const VITE_API_URL = import.meta.env.VITE_API_URL;

const fetchLearnersByAssessment = async (assessmentId) => {
  try {
    const response = await axios.get(
      `${VITE_API_URL}/api/assigned-assessments/get-assessment-by-assessmentId/${assessmentId}`
    );
    
    console.log("view learners data]", response);
    return response.data.assigned_learners || [];
  } catch (error) {
    // Handle different types of errors appropriately
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.error('Server responded with error status:', error.response.status);
      console.error('Error data:', error.response.data);
      throw new Error(`Server error: ${error.response.status} - ${error.response.data.message || 'Unknown error'}`);
    } else if (error.request) {
      // The request was made but no response was received
      console.error('No response received:', error.request);
      throw new Error('Network error - No response received from server');
    } else {
      // Something happened in setting up the request that triggered an Error
      console.error('Request setup error:', error.message);
      throw new Error(`Request error: ${error.message}`);
    }
  }
};

export const FetchAssignedLearnersByAssessments = (assessmentId) => {
  return useQuery({
    queryKey: ["all_learners_by_assessment", assessmentId], // Unique query key per course
    queryFn: () => fetchLearnersByAssessment(assessmentId),
    enabled: !!assessmentId, // Only run query if courseId exists
    retry: 2,
    refetchOnWindowFocus: true,
  });
};
