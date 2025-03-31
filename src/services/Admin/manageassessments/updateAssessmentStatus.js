

import axios from "axios";

const VITE_API_URL = import.meta.env.VITE_API_URL;

export const updateAssessmentStatus = async (assessmentId)=>{
    
    try{
        const response = await axios.put(`${VITE_API_URL}/api/assessments/updateassessmentstatus/${assessmentId}`)
        return response.data;
    }catch(error){
        console.log(error);
    }

}