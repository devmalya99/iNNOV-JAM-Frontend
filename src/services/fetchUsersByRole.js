import { useQuery } from "react-query";
import axios from "axios";

const VITE_API_URL = import.meta.env.VITE_API_URL;

const fetchUsersByRole = async (role) => {
  const response = await axios.get(`${VITE_API_URL}/api/users/${role}`);
  console.log(response.data)
  return response.data;
};

export const useUsersByRole = (role) => {
  return useQuery({
    queryKey: ["users"],
    queryFn: () => fetchUsersByRole(role),
    staleTime: 1000 * 60 * 5, // 5 minutes
    retry: 2,
    refetchOnWindowFocus: true, 
  });
};
