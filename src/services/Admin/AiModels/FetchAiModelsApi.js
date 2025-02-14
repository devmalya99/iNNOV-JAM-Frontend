import { useQuery } from "react-query";
import axios from "axios";

const VITE_API_URL = import.meta.env.VITE_API_URL;

const fetchAllModels = async () => {
  const response = await axios.get(`${VITE_API_URL}/api/ai-models/getall`);
  console.log("fetched ai models  list",response.data)
  return response.data;
};

export const FetchAiModelsApi = () => {
  return useQuery({
    queryKey: ["allAiModelsCreated"],
    queryFn: () => fetchAllModels(),
    retry: 2,
    refetchOnWindowFocus: true, 
    refetchOnMount: true, // Forces refetch when the component mounts
  });
};


