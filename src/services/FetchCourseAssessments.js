import { useQuery } from "react-query";
import axios from "axios";

const VITE_LOCAL_URL = import.meta.env.VITE_LOCAL_URL;

const fetchAssessments = async (courseid) => {
  const response = await axios.get(`${VITE_LOCAL_URL}/api/courses/${courseid}`);
  return response.data || [];
};

export const FetchCourseAssessments = (courseid) => {
  return useQuery({
    queryKey: ["course_assessments"],
    queryFn: () => fetchAssessments(courseid),
    enabled: !!courseid, // Only run query if courseid exists
    staleTime: 1000 * 60 * 5, // Cache for 5 minutes
    retry: 2,
    refetchOnWindowFocus: true,
  });
};
