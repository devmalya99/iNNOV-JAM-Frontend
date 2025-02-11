import { useQuery } from 'react-query';
import axios from 'axios';
const VITE_API_URL = import.meta.env.VITE_API_URL;

const fetchAllGrades = async () => {
    
    const { data } = await axios.get(
      `${VITE_API_URL}/api/grades/getgradesstatus`
    );
    console.log("All grades",data);
    
    return data;
  };

// Custom hook to use React Query for fetching files
export const FetchAllGrade = () => {
    return useQuery({
        queryKey: ["AllGrades"],  // Query key
        queryFn:() => fetchAllGrades(),  // Fetch function
        //refetchInterval: 5000,         // Automatically fetch every 5 seconds
        refetchOnWindowFocus: true,    // Refetch when the window gains focus
        retry: 1,                      // Retry failed requests once
        onError: (error) => {
          console.error("Error fetching assessment data:", error.message);
        },
      });
    };
