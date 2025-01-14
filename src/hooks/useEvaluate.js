import { useState } from "react";
import axios from "axios";
import { handleError, handleSuccess } from "../utils/toast";
import processData from "./processData";
const VITE_AI_API_URL = import.meta.env.VITE_AI_API_URL;

const evaluate = async (data) => {
  console.log("api url",VITE_AI_API_URL);

    try {
      console.log("Processing data before sending to AI...");
      const processedData = processData(data); // Process data before sending to AI
      console.log("Sending data to AI to evaluate...",processedData);
      
      const response = await axios.post(
        //Priya Port
        `${VITE_AI_API_URL}/evaluate`,

        processedData   // Send the data as part of the body

      );
      console.log("Response from AI API received:", response.data);
      handleSuccess({ message: "Assessment Submitted successfully" });
      //navigate("/home/learner/assessment-submission/confirm")
      return response.data; // Directly return parsed data

    } catch (error) {

      console.error("Error sending data to AI:", error);
      handleError({ error: "Error saving data" });

    }
  }

  export default evaluate;