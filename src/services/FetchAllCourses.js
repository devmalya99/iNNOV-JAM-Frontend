import { useQuery } from 'react-query';
import axios from 'axios';
const VITE_API_URL = import.meta.env.VITE_API_URL;

const fetchAllCourses = async () => {
    
    const { data } = await axios.get(
      `${VITE_API_URL}/api/courses`
    );
    console.log("All courses",data);
    
    return data;
  };

// Custom hook to use React Query for fetching files
export const useFetchAllCourses = () => {
    return useQuery({
        queryKey: ["AllCourses"],  // Query key
        queryFn:() => fetchAllCourses(),  // Fetch function
        //refetchInterval: 5000,         // Automatically fetch every 5 seconds
        refetchOnWindowFocus: true,    // Refetch when the window gains focus
        retry: 1,                      // Retry failed requests once
        onError: (error) => {
          console.error("Error fetching assessment data:", error.message);
        },
      });
    };
