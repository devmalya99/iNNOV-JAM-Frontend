import React, { createContext, useState, useEffect } from 'react';
import { useMutation, useQuery } from 'react-query';
import axios from 'axios';
import { useNavigate } from 'react-router';


// API call for login
const loginUser = async ({ email, password }) => {
  const response = await axios.post('http://localhost:1000/api/auth/login', {
    email,
    password,
  });
  return response.data; // This already includes the token and user data
};





// Create the AuthContext
const AuthContext = createContext();

// AuthProvider Component
export const AuthProvider = ({ children }) => {

  // State for the user and token
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')) || null);
  const navigate = useNavigate();
  const [token, setToken] = useState(localStorage.getItem('token') || '');

  //Login Mutation using react query
  const {mutate:login, isLoading, error} = useMutation(loginUser, {
    onSuccess: (data)=>{
      const {token,user}=data;
      setToken(token);
      setUser(user);
      localStorage.setItem('token',token);
      localStorage.setItem('user',JSON.stringify(user));//store the user object

      navigate('/home')
    },
    onError: (err)=>{
      console.log('Login failed:',err)
    }
  })

  //Token Validation using query


  // Load user data and token from localStorage (if exists)
  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    const storedUserId = localStorage.getItem('userid');
    const storedName = localStorage.getItem('name');
    const storedEmail = localStorage.getItem('email');
    const storedRole = localStorage.getItem('role');

    if (storedToken && storedUserId && storedName && storedEmail && storedRole) {
      // Construct the user object
      const user = {
        id: storedUserId,
        name: storedName,
        email: storedEmail,
        role: storedRole
      };
      setToken(storedToken);
      setUser(user);
    }
  }, []);

  

  // Logout function to clear user and token from localStorage
  const logout = () => {
    setToken('');
    setUser(null);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    
    navigate('/login')
  };

  // Provide context to child components
  return (
    <AuthContext.Provider value={{ login, logout, user, isLoading, token, error}}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the AuthContext in any component
export const useAuth = () => {
  return React.useContext(AuthContext);
};

export default AuthContext;
