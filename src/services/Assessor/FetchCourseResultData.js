import { useQuery } from "react-query";
import axios from "axios";

const VITE_API_URL = import.meta.env.VITE_API_URL;

const fetchCourseResultData = async (courseId) => {
  const response = await axios.get(`${VITE_API_URL}/api/assessors/getstudentandassessmentdetails?course_id=${courseId}`);
  return response.data || [];
}

export const FetchCourseResultData = (courseId) => {
  return useQuery({
    queryKey: ["CourseResultData", courseId], // Unique query key per course
    queryFn: () => fetchCourseResultData(courseId),
    enabled: !!courseId, // Only run query if courseId exists
    
    retry: 2,
    refetchOnWindowFocus: true,
  });
};
