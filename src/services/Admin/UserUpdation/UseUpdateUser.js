import { useMutation, useQueryClient } from "react-query";

const VITE_API_URL = import.meta.env.VITE_API_URL;
import axios from "axios";

const updateUserDetails = async (userData) => {

 
  console.log("useruserDataId is",userData);
   
      const response = await axios.put(`${VITE_API_URL}/api/users/update/${userData?.userId}`, userData?.updatedData );

      return response.data;
  };

  // Create a custom hook that wraps the mutation
  export const UseUpdateUser=()=>{
    const queryClient = useQueryClient();

    return useMutation(updateUserDetails, {

      // on success will be triggered after the mutation is complete
      onSuccess: (data)=>{
        console.log("Users updated successfully", data);
        // Invalidate and refetch
        queryClient.invalidateQueries(['allUsers']);
      },
       
      onError: (error) => {
        console.error("Error creating users:", error.message);
      },
      

    })
  }