import { useQuery } from "react-query";
import axios from "axios";

const VITE_API_URL = import.meta.env.VITE_API_URL;

const fetchArchivedDataOfUser = async (assessmentId,userId) => {
  const response = await axios.get(`${VITE_API_URL}/api/archive-student-responses/getarchive`,
    {
      params: { assessment_id: assessmentId, user_id: userId },
    }
  );
  console.log("fetchedArchievedDataOfUser", response);
  return response.data || [];
};

export const FetchArchivedDataOfUser = (assessmentId,userId) => {
  return useQuery({
    queryKey: ["fetchArchivedDataOfUser", userId,assessmentId], // Unique query key per course
    queryFn: () => fetchArchivedDataOfUser(assessmentId,userId),
    enabled: !!userId,assessmentId, // Only run query if courseId exists
    staleTime: 0,
    retry: 2,
    refetchOnWindowFocus: true,
  });
};
