import React, { useState } from 'react';
import { Link } from 'react-router';
import { LockIcon, MailIcon, UserIcon } from 'lucide-react';
import { RiAdminFill } from "react-icons/ri";
export const Signup = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState('Admin'); // Added state for role
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords don't match");
      return;
    }

    // Construct the signup data
    const signupData = { username, email, password, role };

    try {
      // Send data to backend (you can replace the URL with your actual API endpoint)
      const response = await fetch('/api/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(signupData),
      });

      const data = await response.json();
      if (data.success) {
        alert('Signup successful');
        // Redirect to login page or dashboard
      } else {
        alert('Signup failed: ' + data.message);
      }
    } catch (err) {
      console.error(err);
      alert('An error occurred during signup');
    }
  };

  return (
    <div className="flex justify-center mt-24">
      <div className="w-full max-w-md p-8 space-y-6 bg-white/35 rounded-xl shadow-lg">
        <h2 className="text-center text-2xl font-bold text-gray-800">
          Create Account
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <UserIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-10 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
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
          <div className="relative">
            <LockIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full px-10 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div className="relative">
          <RiAdminFill  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full px-10 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            >
              
              <option value="Admin">Admin</option>
              <option value="Trainer">Trainer</option>
              <option value="Learner">Learner</option>
              <option value="Assessor">Assessor</option>
            </select>
          </div>
          <button 
            type="submit" 
            className="w-full py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            Create Account
          </button>
          <div className="text-center text-sm text-gray-600">
            <Link to="/login" className="hover:underline">
              Already have an account? Login
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};
