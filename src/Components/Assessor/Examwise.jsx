import React from 'react';
import { Link } from 'react-router';
import { useFetchAllAssessments } from '../../services/fetchAllAssessments';

const Examwise = () => {
  const studentData = [
    { name: 'Bartika', written_assessment: '5/5', case_study: '5/5' },
    
  ];

  const {data} = useFetchAllAssessments();

  const context = {
    cs: data?.find((item) => item.assessment_type === 'case_study')?._id,
    wa: data?.find((item) => item.assessment_type === 'written_assessment')?._id
  }
  
  console.log(context);

  const handleResubmit = (assessmentType, studentName) => {
    // Handle resubmit logic here, you can log it, show a modal, etc.
    console.log(`Resubmitting ${assessmentType} for ${studentName}`);
  };

  return (
    <div className="w-full max-w-6xl mx-auto p-4  h-[calc(100vh-80px)] overflow-y-auto ">
      {/* <h2 className="text-xl font-semibold mb-4">15 October 2025 – Digital Marketing</h2> */}
      <div className="overflow-x-auto ">
        <table className="w-full  ">
          <thead>
            <tr>
              <th className="bg-blue-600 text-white p-3 text-center border border-blue-700 w-1/3">
                Learners Name
              </th>
              <th className="bg-blue-600 text-white p-3 text-center border border-blue-700 w-1/3">
                Written Assessment<br />(Aligned)
              </th>
              <th className="bg-blue-600 text-white p-3 text-center border border-blue-700 w-1/3">
               Case Study Written<br />Assessment (Aligned)
              </th>
            </tr>
          </thead>
          
          <tbody>
            {studentData.map((student, index) => (
              <tr key={index} className="bg-blue-50">


                <td className="  p-3 border border-gray-300 ">
                    <div>{student.name}</div>
                </td>


                <td className=" p-3 border border-gray-300 text-center ">
                  
                  <div className='flex text-md'>
                  {/* <div className={`${student.written_assessment === '4/5' ? 
                    'text-red-800 underline bg-red-100' : 'bg-green-200' }  m-1 rounded-md px-2 py-1` }>
                    {student.written_assessment}
                  </div>
                  
                  <button 
                    className=" mx-2 px-2 py-1 bg-green-500 text-white rounded hover:bg-blue-600" 
                    onClick={() => handleResubmit('Written Assessment', student.name)}
                  >
                    Ask to Resubmit
                  </button> */}
                  <button className='button-style'>
                  <Link to={`/home/assessment/exam/date/learner/${context.wa}`} className='text-white'>
                    View Result
                    </Link>
                  </button>
                  </div>
                </td>

                <td className="flex  items-center justify-center gap-2  p-3 border border-gray-300 text-center">
                  
                <div className='flex text-md'>
                  {/* <div className={`${student.written_assessment === '4/5' ? 
                    'text-red-800 underline bg-red-100' : 'bg-green-200' }  m-1 rounded-md px-2 py-1` }>
                    {student.case_study}
                  </div> */}
                  
                  {/* <button 
                    className=" mx-2 px-2 py-1 bg-green-500 text-white rounded hover:bg-blue-600" 
                    onClick={() => handleResubmit('Written Assessment', student.name)}
                  >
                    Ask to Resubmit
                  </button> */}
                  <button className='button-style'>
                  <Link to={`/home/assessment/exam/date/learner/${context.cs}`} className='text-white'>
                    View Result
                    </Link>
                  </button>
                  </div>

                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Examwise;
