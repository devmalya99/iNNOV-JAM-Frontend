
import { useQuery } from 'react-query';
import axios from 'axios';
const VITE_API_URL = import.meta.env.VITE_API_URL;

// Fetch files from the backend
const fetchAssessmentData = async (id) => {
  console.log("id is ",id);
  const { data } = await axios.get(
    `${VITE_API_URL}/api/assessments/${id}`
  );
  console.log("data is ",data);
  return data;
};

// Custom hook to use React Query for fetching files
export const useFetchAssessmentData = (id) => {
    return useQuery({
        queryKey: ["assessmentData"],  // Query key
        queryFn:() => fetchAssessmentData(id),  // Fetch function
        //refetchInterval: 5000,         // Automatically fetch every 5 seconds
        refetchOnWindowFocus: true,    // Refetch when the window gains focus
        retry: 1,                      // Retry failed requests once
        onError: (error) => {
          console.error("Error fetching assessment data:", error.message);
        },
      });
    };
