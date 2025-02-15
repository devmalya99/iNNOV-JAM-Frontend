import { useQuery } from "react-query";
import axios from "axios";

const VITE_API_URL = import.meta.env.VITE_API_URL;

const fetchUsersByRole = async (role) => {
  const response = await axios.get(`${VITE_API_URL}/api/users/getuser/${role}`);
  console.log(`all ${role}`,response.data)
  return response.data;
};

export const FetchUsersByRole = (role) => {
  return useQuery({
    queryKey: ["fetch_users_role"],
    queryFn: () => fetchUsersByRole(role),
    retry: 2,
    refetchOnWindowFocus: true, 
    refetchOnMount: true,
  });
};
