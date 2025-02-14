import { useMutation, useQueryClient } from "react-query";

const VITE_API_URL = import.meta.env.VITE_API_URL;
import axios from "axios";

const updateUserCourses = async (userData) => {

//     http://192.168.1.16:7000/api/users/assign-course/67ac8c8750e73f97339d7b0b // user id


// {
//     "course_code" : ["AI25"]
// }

// PUT REQUEST

 
  console.log("userDataId is",userData);
   
      const response = await axios.put(`${VITE_API_URL}/api/users/assign-course/${userData?.userId}`, 
        {"course_code":userData?.selectedCourses
        });

      return response.data;
  };

  // Create a custom hook that wraps the mutation
  export const UseUpdateUserCourses=()=>{
    const queryClient = useQueryClient();

    return useMutation(updateUserCourses, {

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