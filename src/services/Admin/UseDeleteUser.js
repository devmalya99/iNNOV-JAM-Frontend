import axios from "axios";

const VITE_API_URL = import.meta.env.VITE_API_URL;

export const deleteUser = async (userId) => {
  try {
    const response = await axios.delete(`${VITE_API_URL}/api/users/remove/${userId}`);

    // If the response is successful, return the response data
    if (response) {
      return response.data;
    }
  } catch (error) {
    // Handle specific errors (e.g., if the user can't be deleted due to being assigned)
    if (error.response && error.response.data && error.response.data.message) {
      // For specific error messages, handle them accordingly
      throw new Error(error.response.data.message); // Throw custom error message
    }

    // Default error handling
    console.error("Error deleting user:", error);
    throw new Error("An error occurred while deleting the user.");
  }
};
