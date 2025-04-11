

import { useEffect, useState } from "react";
import {
  createGrading,
  getAllGradings,
  getAllRanges,
  removeGrading,
} from "../../../services/gradingApis/gradingApi";
import { toast } from "react-toastify";
import useGradeStore from "../../../store/gradeStore";
import RangeCreationForm from "./Grade System/RangeCreationForm";
import { handleError, handleSuccess } from "../../../utils/toast";
import { FaPen, FaTrash } from "react-icons/fa";
import EditGradeNameModal from "./Grade System/EditGradeNameModal";
import { EyeIcon } from "lucide-react";

export default function GradeComponent() {

  const [editGrade, setEditGrade] = useState(null);

  const VITE_API_URL = import.meta.env.VITE_API_URL;

  const { 
    grades, 
    setGrades, setRanges , openForm,setOpenForm,gradeName, setGradeName, setGradeId, 
    openGradeNameEditModal ,
    setOpenGradeNameEditModal
  } = useGradeStore();
  

  useEffect(() => {
    (async () => {
      const response = await getAllGradings();
      setGrades(response);
    })();
  }, []);

  console.log("all grades are", grades);

  const onCreateGradeHandler = async () => {
    if (!gradeName) {
      handleError({ errors: "Please enter a grade name" });
      return;
    }
    const gradeData = await createGrading({ name: gradeName, status: false });
    if (gradeData) {
      setGrades([
        ...grades,
        { _id: gradeData._id, name: gradeName, status: false },
      ]);
    }
     handleSuccess({success:"New grade created"})
    setGradeName("");
  };

  const handleUpdateGradename = async () => {
    try {
      if (!editGrade?._id || !gradeName) {
        handleError({ errors: "Please enter a grade name" });
        return;
      }
  
      const response = await fetch(`${VITE_API_URL}/api/grades/update/${editGrade._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          name: gradeName ,
          status:false,

        }),
      });
  
      if (!response.ok) {
        throw new Error('Failed to update grade name');
      }
  
      const updatedGrade = await response.json();
      
      // Update the grades list in the state
      setGrades(grades.map(grade => 
        grade._id === editGrade._id ? { ...grade, name: gradeName } : grade
      ));
  
      handleSuccess({ success: "Grade name updated successfully" });
      setOpenGradeNameEditModal(false);
      setGradeName("");
      setEditGrade(null);
    } catch (error) {
      console.error("Error updating grade name:", error);
      handleError({ errors: error.message });
    }
  }
  
 
  //handle edit
  const handleEdit=(grade)=>{
    setOpenGradeNameEditModal(true);
    setEditGrade(grade)
    setGradeName(grade.name)
    console.log("grade to be edited",editGrade)
  }

 

  const openRangeFormHander = async (id) => {
    setOpenForm(true);
    setGradeId(id);
    const rangeResponse = await getAllRanges(id);
    console.log(rangeResponse);
    setRanges(rangeResponse || []);
  };


  return (
    <div className="flex justify-center h-[calc(100vh-70px)] w-full py-2 bg-white dark:bg-gray-900">
      
      <div className="">
        <div className="py-4 px-4 rounded-xl">

          <EditGradeNameModal
          isOpen={openGradeNameEditModal}
          onClose={() => setOpenGradeNameEditModal(false)}
          editGrade={editGrade}
          gradeName={gradeName}
          setGradeName={setGradeName}
          onUpdate={handleUpdateGradename}
          />

      
      
      {!openForm ? (
        <div className="max-w-3xl py-4   w-full px-4 sm:px-6 lg:px-8 rounded-xl my-2 bg-gray-200 dark:bg-gray-700">
          <div className="flex items-center space-x-4 mb-4 px-4 py-2 m-2">
            <input
              type="text"
              value={gradeName}
              onChange={(e) => setGradeName(e.target.value)}
              placeholder="Enter grade name"
              className="w-full px-6 py-2 border rounded-lg focus:outline-none 
              focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 
              dark:text-white dark:border-gray-600"
            />
            <button
              onClick={onCreateGradeHandler}
              className="button-style"
            >
              Create
            </button>
          </div>
          <ul className=" dark:bg-gray-700  rounded-lg ">
            {grades?.map((grade) => (
              <li
                key={grade.id}
                className="flex justify-between items-center bg-white dark:bg-gray-800 p-4 mt-3 rounded-lg shadow-md hover:shadow-lg transition duration-300"
              >
                {/* Grade Name & Status */}
                <div className="flex flex-col space-y-1">
                  <span className="font-semibold text-gray-800 dark:text-white text-lg">
                    {grade.name}
                  </span>
                  <span className="text-sm text-gray-600 dark:text-gray-300">
                    {grade.status}
                  </span>
                </div>

                {/* Buttons */}
                <div className="flex space-x-3">

                  <button
                    onClick={() => handleEdit(grade)}
                    className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg text-sm transition duration-300"
                  >
                    <FaPen />
                  </button>

                  {/* Delete grade button */}
                  <button
                    onClick={async () => {
                      try {
                        const response = await removeGrading(grade._id); // await the result of removeGrading
                        if (response) {
                          handleSuccess({success:"Grade removed successfully"});
                          // Only remove the grade from the UI if the API call was successful
                          setGrades(grades.filter((g) => g._id !== grade._id));
                        }
                        else{
                          handleError({errors:"Cannot remove grade with assigned assessments"});
                        }
                      } catch (error) {
                        handleError({errors:"Error removing grade"});
                        console.error("Error during grade removal:", error);
                      }
                    }}
                    className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg text-sm transition duration-300"
                  >
                    <FaTrash/>
                  </button>

                  

                  <button
                    onClick={() => openRangeFormHander(grade._id)}
                    className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg text-sm transition duration-300"
                  >
                    <EyeIcon/>
                  </button>
                </div>
                
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <RangeCreationForm/>
      )}
      </div>
      </div>
    </div>
  );
}
