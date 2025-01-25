import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { Eye, EyeOff, LockIcon, MailIcon } from 'lucide-react';
import axios from 'axios'; // Import axios for HTTP requests
import { useMutation } from 'react-query'; // Import useMutation from React Query
import {useAuth} from '../../../Context/AuthContext';
import { FaSpinner } from 'react-icons/fa';


export const Login = () => {

  const [showPassword, setShowPassword] = useState(false);

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
      <h2 className="text-center text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-white to-pink-500 ">Welcome Back</h2>
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
      {/* Lock Icon */}
      <LockIcon
        className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
        size={20}
      />

      {/* Password Input */}
      <input
        type={showPassword ? "text" : "password"}
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="w-full px-10 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        required
      />

      {/* Toggle Password Visibility */}
      <button
        type="button"
        onClick={() => setShowPassword(!showPassword)}
        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 focus:outline-none"
      >
        {showPassword ? (
          <EyeOff size={20} className="text-gray-500" />
        ) : (
          <Eye size={20} className="text-gray-500" />
        )}
      </button>
    </div>
        <button 
          type="submit" 
          className="w-full py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors text-center"
          disabled={isLoading}
        >
           {isLoading ? (
        <div className='flex items-center justify-center'>
          <FaSpinner className="animate-spin text-yellow-400" />
          
        </div>
      ) : (
        <span className="text-lg font-semibold">Login</span>
      )}
          
        </button>
        {error && <p className="font-semibold text-red-900 text-center">{error.response?.data?.message || 'An error occurred'}</p>}
      </form>
    </div>
  </div>
  );
};