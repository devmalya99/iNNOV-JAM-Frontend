import axios from 'axios';
const VITE_API_URL = import.meta.env.VITE_API_URL;

const API_URL = `${VITE_API_URL}/api/assessments`

export const updateAssessmentData = async (id, updatedData) => {
    try {
        // console.log("callling database", id, updatedData);
        const response = await axios.put(`${API_URL}/update-assessment`, {
            assessmentId: id,
            newData: updatedData
        });
        return response.data;
    } catch (error) {
        console.error('Error updating assessment:', error);
        throw error;
    }
};
