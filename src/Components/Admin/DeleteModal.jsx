import React from 'react'
import axios from'axios'
const VITE_API_URL = import.meta.env.VITE_API_URL;
const DeleteModal = ({fileToDelete,setShowDeleteModal,fetchFiles}) => {

    const {title,_id} = fileToDelete

     // Handle delete file
     const handleDelete = async () => {
        try {
          await axios.delete(`${VITE_API_URL}/api/delete-file/${_id}`);
          setShowDeleteModal(false); // Close the delete confirmation dialog
           // Fetch files again after successful deletion
    fetchFiles(); // Make sure to update the list after deletion
        } catch (error) {
          console.error('Error deleting file:', error);
          alert('Error deleting file. Check the console for more details.');
        }
      };
      

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
    <div className="bg-white p-8 rounded-xl w-1/3">
      <h3 className="text-xl mb-4">Are you sure you want to delete this file?</h3>
      <p>Title: {title}</p>
      <div className="mt-4">
        <button
          onClick={handleDelete}
          className="bg-red-500 text-white rounded-lg px-6 py-3 hover:bg-red-600"
        >
          Confirm Deletion
        </button>
        <button
          onClick={() => setShowDeleteModal(false)}
          className="bg-gray-300 text-black rounded-lg px-6 py-3 ml-4"
        >
          Cancel
        </button>
      </div>
    </div>
  </div>
  )
}

export default DeleteModal