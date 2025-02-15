import { useMutation, useQueryClient } from "react-query";
import axios from "axios";

const VITE_API_URL = import.meta.env.VITE_API_URL;

export const useDeleteAssessment = () => {
  const queryClient = useQueryClient();

  return useMutation(
    async (assessmentId) => {
      const response = await axios.delete(
        `${VITE_API_URL}/api/assigned-assessments/remove-assessment/${assessmentId}`
      );
      return response.data;
    },
    {
      onSuccess: () => {
        // Invalidate and refetch the assessments list to reflect changes
        queryClient.invalidateQueries("AllAssessments");
      },
      onError: (error) => {
        console.error("Error deleting assessment:", error);
      },
    }
  );
};
