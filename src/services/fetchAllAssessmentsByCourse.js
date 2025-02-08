import { useQuery } from "react-query";
import axios from "axios";

const VITE_API_URL = import.meta.env.VITE_API_URL;

const fetchAllAssessmentsByCourse = async (courseId) => {
  const response = await axios.get(`${VITE_API_URL}/api/assessments/getallassessments/${courseId}`);
  return response.data || [];
};

export const FetchAllAssessmentsByCourse = (courseId) => {
  return useQuery({
    queryKey: ["all_assessments_of_course", courseId], // Unique query key per course
    queryFn: () => fetchAllAssessmentsByCourse(courseId),
    enabled: !!courseId, // Only run query if courseId exists
    staleTime: 1000 * 60 * 2, // Cache for 5 minutes
    retry: 2,
    refetchOnWindowFocus: true,
  });
};
