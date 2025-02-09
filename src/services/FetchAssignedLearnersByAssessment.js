import { useQuery } from "react-query";
import axios from "axios";

const VITE_API_URL = import.meta.env.VITE_API_URL;

const fetchLearnersByAssessment = async (assessmentId) => {

  // http://192.168.1.40:7000/api/assigned-assessments/get-assessment-by-assessmentId/67a7242ecaceb779454066a5 

  const response = await axios.get(`${VITE_API_URL}/api/assigned-assessments/get-assessment-by-assessmentId/${assessmentId}`);
  console.log("view learners data]", response);
  return response.data.assigned_learners || [];
};

export const FetchAssignedLearnersByAssessments = (assessmentId) => {
  return useQuery({
    queryKey: ["all_learners_by_assessment", assessmentId], // Unique query key per course
    queryFn: () => fetchLearnersByAssessment(assessmentId),
    enabled: !!assessmentId, // Only run query if courseId exists
    staleTime: 1000 * 60 * 2, // Cache for 5 minutes
    retry: 2,
    refetchOnWindowFocus: true,
  });
};
