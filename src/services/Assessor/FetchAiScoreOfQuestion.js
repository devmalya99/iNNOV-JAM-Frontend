import { useQuery } from "react-query";
import axios from "axios";

const VITE_API_URL = import.meta.env.VITE_API_URL;

const fetchAiScoresOfQuestion = async (questionId,userId) => {
  const response = await axios.get(`${VITE_API_URL}/api/assessors/getaiscorereport?question_id=${questionId}&user_id=${userId}`);

  console.log("FetchAiScoreOfQuestion data is ",response.data);

  
  return response.data || [];

  

  // http://192.168.1.40:7000/api/assessors/getaiscorereport?question_id=67a9a41e94e13a5c232fbe57&user_id=67a9a3c394e13a5c232fbe3e
}

export const FetchAiScoreOfQuestion = (questionId,userId) => {
  return useQuery({
    queryKey: ["fetchAiScoreOfQuestion", questionId,userId], // Unique query key per course
    queryFn: () => fetchAiScoresOfQuestion(questionId,userId),
    enabled: !!questionId, // Only run query if courseId exists
    retry: 2,
    refetchOnWindowFocus: true,
  });
};
