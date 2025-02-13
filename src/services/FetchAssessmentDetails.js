import { useQuery } from "react-query";
import axios from "axios";

const VITE_API_URL = import.meta.env.VITE_API_URL;

const fetchAssessmentDetails = async (assessmentId) => {
  const response = await axios.get(`${VITE_API_URL}/api/assessments/getquestions/${assessmentId}`);
  return response.data || [];
};

export const FetchAssessmentsDetails = (assessmentId) => {
  return useQuery({
    queryKey: ["all_assessments_of_course", assessmentId], // Unique query key per course
    queryFn: () => fetchAssessmentDetails(assessmentId),
    enabled: !!assessmentId, // Only run query if courseId exists
    retry: 2,
    refetchOnWindowFocus: true,
  });
};
