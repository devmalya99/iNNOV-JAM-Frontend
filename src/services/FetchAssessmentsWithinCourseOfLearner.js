import { useQuery } from "react-query";
import axios from "axios";

const VITE_API_URL = import.meta.env.VITE_API_URL;

const fetchAssessmentsWithinCourse = async (userId,courseId) => {
  const response = await axios.get(`${VITE_API_URL}/api/assigned-assessments/get-assessmentbycourse?userId=${userId}&courseId=${courseId}`
);
  return response.data || [];
};



export const FetchAssessmentsWithinCourseOfLearner = (userId,courseId) => {
  return useQuery({
    queryKey: ["fetchAssessmentsWithinCourse", userId, courseId], // Unique query key per course
    queryFn: () => fetchAssessmentsWithinCourse(userId,courseId),
    enabled: !!userId && !!courseId, // Only run query if courseId exists
    
    retry: 2,
    refetchOnWindowFocus: true,
  });
};
