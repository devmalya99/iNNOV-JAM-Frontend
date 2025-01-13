import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import axios from "axios"; // Assuming you have axios imported



// Validate token function
const validateToken = async (token) => {
  try {
    
    if(!token){
        return false
    } 
    else{
       const response = await axios.get('http://localhost:1000/api/auth/verify-token', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }); 

    return response.data.isValid;
    }
  } catch (error) {
    console.error("Token validation failed:", error);
    return false;
  }
};

const ProtectedRoute = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        setIsAuthenticated(false);
        setLoading(false);
        return;
      }

      // Validate the token with the backend
      const isValid = await validateToken(token);
      setIsAuthenticated(isValid);
      setLoading(false);
    };

    checkAuth();
  }, []);

   // Show loading state while checking authentication
   if (loading) {
    return <div>Loading....</div>;
  }

  // Redirect to login if not authenticated
  if (!isAuthenticated) {
    navigate("/login");
    return null; // prevent rendering the children if not authenticated
  }

  // If authenticated, render the children
  return children;
};

export default ProtectedRoute;
