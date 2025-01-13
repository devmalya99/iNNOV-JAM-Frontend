import React, { useEffect, useState } from 'react'
import { useAuth } from '../../Context/AuthContext';
import { Hash, Mail, Shield, User } from 'lucide-react';

const Welcome = () => {
   const { user,logout } = useAuth();

   const [loading,setLoading] = useState(true)
   
     useEffect(()=>{
       if(user) setLoading(false)
     },[user])
   
     if(loading){
       return <div>Loading....</div>
     }
   
     console.log(user)
  return (
    <div className="w-full h-[calc(100vh-100px)] flex items-center justify-center p-4 bg-gray-100 dark:bg-gray-900">
  <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl p-8 max-w-2xl w-full mx-4">
    <div className="text-center mb-8">
      <h1 className="text-4xl font-bold text-gray-800 dark:text-gray-200 mb-2">
        Welcome, {user.name}!
      </h1>
      <p className="text-gray-600 dark:text-gray-300 text-lg">
        LearnerWise Assessment Portal
      </p>
    </div>

    <div className="grid gap-6 mb-8">
      <div className="flex items-center gap-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors">
        <div className="bg-green-100 p-3 rounded-full">
          <User className="w-6 h-6 text-green-600" />
        </div>
        <div>
          <p className="text-sm text-gray-500 dark:text-gray-400">Name</p>
          <p className="text-lg font-semibold text-gray-800 dark:text-gray-100">{user.name}</p>
        </div>
      </div>

      <div className="flex items-center gap-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors">
        <div className="bg-green-100 p-3 rounded-full">
          <Mail className="w-6 h-6 text-green-600" />
        </div>
        <div>
          <p className="text-sm text-gray-500 dark:text-gray-400">Email</p>
          <p className="text-lg font-semibold text-gray-800 dark:text-gray-100">{user.email}</p>
        </div>
      </div>

      <div className="flex items-center gap-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors">
        <div className="bg-green-100 p-3 rounded-full">
          <Shield className="w-6 h-6 text-green-600" />
        </div>
        <div>
          <p className="text-sm text-gray-500 dark:text-gray-400">Role</p>
          <p className="text-lg font-semibold text-gray-800 dark:text-gray-100 capitalize">{user.role}</p>
        </div>
      </div>
    </div>

    <div className="text-center text-gray-600 dark:text-gray-400">
      <p>You have full access to the assessment portal.</p>
      <p>Start managing learner assessments and providing feedback.</p>
    </div>
  </div>
</div>

  )
}

export default Welcome