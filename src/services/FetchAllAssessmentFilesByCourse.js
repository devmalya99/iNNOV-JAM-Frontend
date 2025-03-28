import { useQuery } from 'react-query';
import axios from 'axios';
const VITE_API_URL = import.meta.env.VITE_API_URL;

const fetchAllAssessmentFilesByCourse = async (courseid) => {

  try {
    const  data = await axios.get(
      `${VITE_API_URL}/api/files/getfiles/${courseid}`
    );
    // console.log("All assessment files",data);
    
    return data?.data;

  } catch (error) {
    console.error(error.message);
    return error.message
  }
  };

// Custom hook to use React Query for fetching files
export const useFetchAllAssessmentFiles = (courseid) => {
    return useQuery({
        queryKey: ["AllAssessmentFiles"],  // Query key
        queryFn:() => fetchAllAssessmentFilesByCourse(courseid),  // Fetch function
        //refetchInterval: 5000,         // Automatically fetch every 5 seconds
        refetchOnWindowFocus: true,    // Refetch when the window gains focus
        retry: 1,                      // Retry failed requests once
        onError: (error) => {
          console.error("Error fetching assessment data:", error.message);
        },
      });
    };
