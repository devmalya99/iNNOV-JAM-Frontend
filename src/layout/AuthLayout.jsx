import React from 'react'
import HeroHeader from '../Components/Landing/HeroHeader'
import { Outlet } from 'react-router'
import  background from ".././assets/background.jpg"
const AuthLayout = () => {
  return (
    
        <div className="w-screen text-gray-100 h-screen backdrop-blur-lg"
            style={{
              backgroundImage: `url(${background})`,
              backgroundRepeat: "repeat",
              backgroundSize: "auto",
              backgroundPosition: "center",
            }}
            >
              <div className='backdrop-blur-xl h-screen'>
          <HeroHeader />
          <div className="container mx-auto py-8">
            <Outlet />
          </div>
          </div>
        </div>
      
  )
}

export default AuthLayout