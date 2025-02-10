
import { useQuery } from 'react-query';
import axios from 'axios';
const VITE_API_URL = import.meta.env.VITE_API_URL;

// Fetch files from the backend
const fetchAssessmentData = async (assessmentId,user_id) => {
  console.log("assessmentId is ",assessmentId);

  // http://192.168.1.40:7000/api/assessments/getquestionsforassessment/67a861fc722aad0535f1fdb9


  const { data } = await axios.get(
    `${VITE_API_URL}/api/assessments/getquestionsforassessment/${assessmentId}?userId=${user_id}`
  );
  console.log("data is ",data);
  return data;
};

// Custom hook to use React Query for fetching files
export const useFetchAssessmentData = (assessmentId,user_id) => {
    return useQuery({
        queryKey: ["assessmentData"],  // Query key
        queryFn:() => fetchAssessmentData(assessmentId,user_id),  // Fetch function
        //refetchInterval: 5000,         // Automatically fetch every 5 seconds
        refetchOnWindowFocus: true,    // Refetch when the window gains focus
        retry: 1,                      // Retry failed requests once
        onError: (error) => {
          console.error("Error fetching assessment data:", error.message);
        },
      });
    };
