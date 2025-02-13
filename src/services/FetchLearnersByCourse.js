import { useQuery } from "react-query";
import axios from "axios";

const VITE_API_URL = import.meta.env.VITE_API_URL;

const fetchLearnersByCourse = async (courseId) => {
  const response = await axios.get(`${VITE_API_URL}/api/courses/learners/${courseId}`);
  return response.data.learners || [];
};

export const FetchAllLearnersByCourse = (courseId) => {
  return useQuery({
    queryKey: ["all_learners_by_course", courseId], // Unique query key per course
    queryFn: () => fetchLearnersByCourse(courseId),
    enabled: !!courseId, // Only run query if courseId exists
    
    retry: 2,
    refetchOnWindowFocus: true,
  });
};
