
import axios from "axios";

const VITE_LOCAL_URL = import.meta.env.VITE_LOCAL_URL;

const fetchUsersByRole = async (role) => {
    try {
      const response = await axios.get(`${VITE_LOCAL_URL}/api/users/${role}`);
      return response.data;
    } catch (error) {
      console.error(`Failed to fetch ${role}s:`, error);
      return [];
    }
  };

  export default fetchUsersByRole