import axios from "axios";
import { toast } from "react-toastify";
const VITE_API_URL = import.meta.env.VITE_API_URL;

export const createGrading = async (data) => {
    try {
        const response = await axios.post(
            `${VITE_API_URL}/api/grades/create`,
            data
        );
        toast.success("Grading created successfully");
        return response.data;
    } catch (error) {
        console.error("Error creating grading:", error);
        toast.error("Error creating grading");
    }
};

export const getAllGradings = async () => {
    try {
        const response = await axios.get(`${VITE_API_URL}/api/grades/getgrades`);
        return response.data;
    } catch (error) {
        console.error("Error creating grading:", error);
        toast.error("Error creating grading");
    }
};


const removeGrading = async () => { };


export const createRange = async (data) => {
    try {
        const response = await axios.post(
            `${VITE_API_URL}/api/grade-ranges/create`,
            data
        );
        toast.success("Range created successfully");
        return response.data;
    } catch (error) {
        console.error("Error creating grading:", error);
        toast.error("Error creating grading");
    }
};

export const getAllRanges = async (id) => {
    try {
        const response = await axios.get(`${VITE_API_URL}/api/grade-ranges/getgrade/${id}`);
        return response.data;
    } catch (error) {
        console.error("Error creating grading:", error);
        toast.error("Error creating grading");
    }
};

