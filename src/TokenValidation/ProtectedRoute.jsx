import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import axios from "axios"; // Assuming you have axios imported
import AuthenticationLoader from "./AuthenticationLoader";

const VITE_API_URL = import.meta.env.VITE_API_URL;


// Validate token function
const validateToken = async (token) => {
  try {
    
    if(!token){
        return false
    } 
    else{
       const response = await axios.get(
        `${VITE_API_URL}/api/auth/verify-token`, {
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
  const [stage, setStage] = useState('checking');

  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {

      setStage('checking');
      await new Promise(resolve => setTimeout(resolve, 700)); // Show checking stage for 2 seconds

      const token = localStorage.getItem('token');

      if (!token) {
        setIsAuthenticated(false);
         setTimeout(() => {
          setLoading(false);
        }, 1500);
        return;
      }

      setStage('validating');
      await new Promise(resolve => setTimeout(resolve, 900)); // Increased to 3.5 seconds

      // Validate the token with the backend
      const isValid = await validateToken(token);

      if (isValid) {
        setStage('success');
      } else {
        setStage('failed');
      }

      setIsAuthenticated(isValid);

       setTimeout(() => {
        setLoading(false);
      }, 1500);

    };

    checkAuth();
  }, []);

   // Show loading state while checking authentication
   if (loading) {
    return  <AuthenticationLoader stage={stage} />;
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
