import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import axios from "axios"; // Assuming you have axios imported
import AuthenticationLoader from "./AuthenticationLoader";
import { handleError } from "../utils/toast";

const VITE_API_URL = import.meta.env.VITE_API_URL;

const handleAuthFailure = (message) => {
  // Clear all auth-related data from localStorage
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  
  // You could also clear any other auth-related data here
  // For example: localStorage.removeItem('permissions');
  
  console.error("Authentication failed:", message);
};


// Validate token function
const validateToken = async (token) => {
  try {
    
    if(!token){
      handleAuthFailure("No token provided");
      return { isValid: false, message: "No token provided" };
    } 
    else{
       const response = await axios.get(
        `${VITE_API_URL}/api/auth/verify-token`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }); 

    return { isValid: response.data.isValid, message: null };
    }
  } catch (error) {
    let errorMessage = "Token validation failed";

    if (error.response) {
       // Server responded with error status
       errorMessage = error.response.data.message || errorMessage;

       if (error.response.status === 401) {
        handleAuthFailure(errorMessage);
      }
    }

    else if (error.request) {
      // The request was made but no response was received
      errorMessage = "Network error: No response received";
    }
    else{
      errorMessage=error.message
    }

    return { isValid: false, message: errorMessage };
  }
};

const ProtectedRoute = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const [loading, setLoading] = useState(true);
  const [stage, setStage] = useState('checking');

  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        // Checking stage
        setStage('checking');
        await new Promise(resolve => setTimeout(resolve, 700));

        const token = localStorage.getItem('token');
        if (!token) {
          handleAuthFailure("No token found");
          setStage('failed');
          setIsAuthenticated(false);
          setTimeout(() => {
            setLoading(false);
          }, 1500);
          return;
        }

        // Validating stage
        setStage('validating');
        await new Promise(resolve => setTimeout(resolve, 900));

        // Validate token
        const { isValid, message } = await validateToken(token);

        if (isValid) {
          setStage('success');
        } else {
          handleAuthFailure(message);
          setStage('failed');
        }

        setIsAuthenticated(isValid);

        // Show final stage
        setTimeout(() => {
          setLoading(false);
        }, 1500);

      } catch (error) {
        console.error("Authentication check failed:", error);
        handleAuthFailure(error.message);
        setStage('failed');
        setIsAuthenticated(false);
        setTimeout(() => {
          setLoading(false);
        }, 1500);
      }
    };

    checkAuth();
  }, []);

   // Show loading state while checking authentication
   if (loading) {
    return  <AuthenticationLoader stage={stage} />;
  }

  // Redirect to login if not authenticated
  if (!isAuthenticated) {
    // Add a small delay to ensure animations complete
    setTimeout(() => {
      navigate("/login", { 
        replace: true,
        state: { 
          from: window.location.pathname, // The route user was trying to access
          authError: true  // Indicates this was from an auth failure
        } 
      });
    }, 100);
    
    handleError({error:"You must be logged in to access this page"});
    
    return null;
  }

  // If authenticated, render the children
  return children;
};

export default ProtectedRoute;
