import { useQuery } from "react-query";
import axios from "axios";

const VITE_API_URL = import.meta.env.VITE_API_URL;

const fetchAllCoursesOfUser = async (userId) => {
  const response = await axios.get(`${VITE_API_URL}/api/courses/courses/user/${userId}`);
  console.log("fetched all courses of one user", response);
  return response.data || [];
};

export const FetchAllCoursesOfUser = (userId) => {
  return useQuery({
    queryKey: ["FetchAllCoursesOfUser", userId], // Unique query key per course
    queryFn: () => fetchAllCoursesOfUser(userId),
    enabled: !!userId, // Only run query if courseId exists
    staleTime: 1000 * 60 * 2, // Cache for 5 minutes
    retry: 2,
    refetchOnWindowFocus: true,
  });
};
