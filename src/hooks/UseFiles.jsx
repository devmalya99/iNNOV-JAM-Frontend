import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

// Fetch files from the backend
const fetchFiles = async () => {
  const { data } = await axios.get('http://localhost:1000/api/upload-assesmentFiles/files');
  return data.files;
};

// Custom hook to use React Query for fetching files
export const useFiles = () => {
  return useQuery(['files'], fetchFiles);
};
