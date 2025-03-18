import { useQuery } from "react-query";
import axios from "axios";

const VITE_API_URL = import.meta.env.VITE_API_URL;

const fetchArchivedLearners = async (assessmentId) => {
  const response = await axios.get(`${VITE_API_URL}/api/archive-student-responses/getstudentscore?assessment_id=${assessmentId}`);
  console.log(`all archived learners`,response.data)
  return response.data;
};

export const FetchArchivedLearners = (assessmentId) => {
  return useQuery({
    queryKey: ["fetchArchivedLearners", assessmentId],
    queryFn: () => fetchArchivedLearners(assessmentId),
    retry: 2,
    staleTime: 0,
    refetchOnWindowFocus: true, 
    refetchOnMount: true,
  });
};
