import { useQuery } from 'react-query';
import axios from 'axios';
const VITE_API_URL = import.meta.env.VITE_API_URL;

const fetchUserProfileDetails = async (userId) => {

  //http://192.168.1.16:7000/api/users/getuserdetails/67ac8c8750e73f97339d7b0b

    
    const { data } = await axios.get(
      `${VITE_API_URL}/api/users/getuserdetails/${userId}`
    );
    console.log("Assessment instruction",data);
    
    return data;
  };

// Custom hook to use React Query for fetching files
export const FetchUserProfileDetails = (userId) => {
    return useQuery({
        queryKey: ["fetchUserProfileDetails"],  // Query key
        queryFn:() => fetchUserProfileDetails(userId),  // Fetch function
        //refetchInterval: 5000,         // Automatically fetch every 5 seconds
        refetchOnWindowFocus: true,    // Refetch when the window gains focus
        retry: 1,                      // Retry failed requests once
        onError: (error) => {
          console.error("Error fetching assessment data:", error.message);
        },
      });
    };
