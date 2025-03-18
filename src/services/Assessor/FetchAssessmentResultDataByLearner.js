
import { useQuery } from 'react-query';
import axios from 'axios';
const VITE_API_URL = import.meta.env.VITE_API_URL;

// Fetch files from the backend
const fetchAssessmentResultData = async (assessmentId,userId) => {
  // console.log("assessmentId is ",assessmentId);

  // http://192.168.1.40:7000/api/assessors/getstudentanswerresponse?assessment_id=67a9e49fdffac4a7187c10c0&user_Id=67a9e45edffac4a7187c10b0

  const { data } = await axios.get(
    `${VITE_API_URL}/api/assessors/getstudentanswerresponse?assessment_id=${assessmentId}&user_Id=${userId}`
  );
  // console.log("FetchAssessmentResultDataByLearner data is ",data);
  return data;
};

// Custom hook to use React Query for fetching files
export const FetchAssessmentResultDataByLearner = (assessmentId,userId) => {
    return useQuery({
        queryKey: ["fetch_assessmentResultData",assessmentId,userId],  // Query key
        queryFn:() => fetchAssessmentResultData(assessmentId,userId),  // Fetch function
        //refetchInterval: 5000,         // Automatically fetch every 5 seconds
        refetchOnWindowFocus: false,    // Refetch when the window gains focus
        staleTime: 1000 * 60 * 5, // Cache for 5 minutes
        retry: 1,                      // Retry failed requests once
        onError: (error) => {
          console.error("Error fetching assessment data:", error.message);
        },
      });
    };
