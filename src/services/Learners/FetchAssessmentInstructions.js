import { useQuery } from 'react-query';
import axios from 'axios';
const VITE_API_URL = import.meta.env.VITE_API_URL;

const fetchAssessmentInstructions = async (assessmentId) => {

  // http://192.168.1.40:7000/api/assessments/getassessment/67a7242ecaceb779454066a5

    
    const { data } = await axios.get(
      `${VITE_API_URL}/api/assessments/getassessment/${assessmentId}`
    );
    // console.log("Assessment instruction",data);
    
    return data;
  };

// Custom hook to use React Query for fetching files
export const FetchAssessmentInstructions = (assessmentId) => {
    return useQuery({
        queryKey: ["fetchAssessmentInstructions"],  // Query key
        queryFn:() => fetchAssessmentInstructions(assessmentId),  // Fetch function
        //refetchInterval: 5000,         // Automatically fetch every 5 seconds
        refetchOnWindowFocus: true,    // Refetch when the window gains focus
        retry: 1,                      // Retry failed requests once
        onError: (error) => {
          console.error("Error fetching assessment data:", error.message);
        },
      });
    };
