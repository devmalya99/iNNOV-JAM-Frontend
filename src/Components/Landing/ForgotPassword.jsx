import React, { useState } from 'react';
import { Link } from 'react-router';
import { MailIcon } from 'lucide-react';

export const ForgotPassword = () => {
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Implement password reset logic here
    console.log('Password reset request', { email });
  };

  return (
    <div className="flex justify-center mt-24 ">
      <div className="w-full max-w-md p-8 space-y-6 bg-white/35 rounded-xl shadow-lg">
        <h2 className="text-center text-2xl font-bold text-gray-800">
          Reset Password
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <MailIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="email"
              placeholder="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-10 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <button 
            type="submit" 
            className="w-full py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            Reset Password
          </button>
          <div className="text-center text-sm text-gray-600">
            <Link to="/login" className="hover:underline">
              Back to Login
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};