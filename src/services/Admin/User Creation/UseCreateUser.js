import { useMutation, useQuery, useQueryClient } from "react-query";

const VITE_API_URL = import.meta.env.VITE_API_URL;

const createUsers = async (users ) => {
    try {
      const response = await fetch(`${VITE_API_URL}/api/users/create-users`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(users),
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Users created:', data);
        // alert('Users created successfully');
      } else {
        console.error('Error creating users:', response.statusText);
        alert('Error creating users');
      }
    } catch (error) {
      console.error('Error creating users:', error);
      alert('Error creating users');
    }
  };

  // Create a custom hook that wraps the mutation
  export const UseCreateUser=()=>{
    const queryClient = useQueryClient();

    return useMutation(createUsers, {

      // on success will be triggered after the mutation is complete
      onSuccess: (data)=>{
        console.log("Users created successfully", data);
        // Invalidate and refetch
        queryClient.invalidateQueries(['allUsers']);
      },
       
      onError: (error) => {
        console.error("Error creating users:", error.message);
      },
      

    })
  }