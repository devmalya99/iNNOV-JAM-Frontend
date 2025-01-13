import React from 'react'

const NoResult = ({ toggleModal }) => {
 

    const handleBack =()=>{
        
    }

    

    return (
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
        <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
          <h2 className="text-xl font-bold text-center mb-4">Access Denied</h2>
          <p className="text-gray-700 text-center">You are not authorized to view results.</p>
          <div className="flex justify-center mt-4">
            <button
              onClick={handleBack}
              className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
            >
              Close
            </button>
          </div>
        </div>
      </div>
      
  )
}

export default NoResult