import axios from 'axios';

const API_URL = 'http://localhost:1000/api/assessments';

export const updateAssessmentData = async (id, updatedData) => {
    try {
        console.log("callling database", id, updatedData);
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
