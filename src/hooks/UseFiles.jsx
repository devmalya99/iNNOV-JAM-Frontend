import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
const VITE_API_URL = import.meta.env.VITE_API_URL;

// Fetch files from the backend
const fetchFiles = async () => {
  const { data } = await axios.get(`${VITE_API_URL}/api/upload-assesmentFiles/files`);
  return data.files;
};

// Custom hook to use React Query for fetching files
export const useFiles = () => {
  return useQuery(['files'], fetchFiles);
};
