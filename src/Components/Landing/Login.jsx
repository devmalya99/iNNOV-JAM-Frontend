import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { LockIcon, MailIcon } from 'lucide-react';
import axios from 'axios'; // Import axios for HTTP requests
import { useMutation } from 'react-query'; // Import useMutation from React Query
import {useAuth} from '../../../Context/AuthContext';


export const Login = () => {

  const navigate = useNavigate();

  // Check if user is already logged in
  useEffect(() => {
    // Check for token in local storage (you can also check using context or state)
    const token = localStorage.getItem('token');
    
    if (token) {
      // If token exists, redirect to /home
      navigate('/home');
    }
  }, [navigate]);



  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const {login,isLoading,error} = useAuth();
 


  const handleSubmit = (e) => {
    e.preventDefault();
    // Implement login logic here
    login({email,password})//call login from auth context
  };

  return (
    <div className="flex justify-center mt-24">
    <div className="w-full max-w-md p-8 m-1 space-y-6 bg-white/65 dark:bg-white/35 rounded-xl shadow-lg">
      <h2 className="text-center text-2xl font-bold text-gray-800">Welcome Back</h2>
      <form onSubmit={handleSubmit} className="space-y-4 text-black">
        <div className="relative">
          <MailIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-10 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div className="relative">
          <LockIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-10 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <button 
          type="submit" 
          className="w-full py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          disabled={isLoading}
        >
          Login
        </button>
        {error && <p className="text-red-500 text-center">{error.response?.data?.message || 'An error occurred'}</p>}
      </form>
    </div>
  </div>
  );
};