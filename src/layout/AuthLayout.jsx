import React from 'react'
import HeroHeader from '../Components/Landing/HeroHeader'
import { Outlet } from 'react-router'
import  background from ".././assets/background.jpg"
const AuthLayout = () => {
  return (
    
        <div className="w-screen  text-gray-100 min-h-screen backdrop-blur-lg"
            style={{
              backgroundImage: `url(${background})`,
              backgroundRepeat: "repeat",
              backgroundSize: "auto",
              backgroundPosition: "fixed",
            }}
            >
              <div className='backdrop-blur-xl min-h-screen'>
          <HeroHeader />
          <div className="container mx-auto py-8">
            <Outlet />
          </div>
          </div>
        </div>
      
  )
}

export default AuthLayout