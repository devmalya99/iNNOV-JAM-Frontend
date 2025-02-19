import { useMutation, useQuery, useQueryClient } from "react-query";
import axios from "axios";



const VITE_API_URL = import.meta.env.VITE_API_URL;

export const deleteUser = async (userId) => {
  const response = await axios.delete(`${VITE_API_URL}/api/users/remove/${userId}`);
  // console.log(response.data);
  return response.data;
};


