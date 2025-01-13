import React from 'react'
import { IoConstruct } from 'react-icons/io5'
import { LuPlane } from 'react-icons/lu'
import { useNavigate, useParams } from "react-router"; // Import useNavigate

const FooterSec = () => {

  const navigate = useNavigate(); // Initialize useNavigate
  const {id} = useParams(); // Fetch the id from the URL


  return (
    <div className="flex flex-col fixed bottom-0 left-0 right-0 bg-gradient-to-r from-cyan-500 via-inherit to-blue-500 p-4 space-y-4 ">

      {/* Question Paper and Instruction Section */}
      <div className="button-style"
       onClick={() => navigate("/home/learner/instructions")} // Navigate on click
      >
        <IoConstruct className="inline-block" />
        Instruction
        </div>

      {/* Submit Section */}
      <div className="button-style"
       
      onClick={()=>navigate(`/home/learner/assessment-submission/confirm/${id}`)}
       
      >
        <LuPlane className="inline-block" />
        Submit
      </div>

    </div>
  )
}

export default FooterSec
