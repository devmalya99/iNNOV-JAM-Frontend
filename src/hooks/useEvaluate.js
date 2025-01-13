import { useState } from "react";
import axios from "axios";
import { handleError, handleSuccess } from "../utils/toast";
import processData from "./processData";


const evaluate = async (data) => {

    try {
      console.log("Processing data before sending to AI...");
      const processedData = processData(data); // Process data before sending to AI
      console.log("Sending data to AI to evaluate...",processedData);
      
      const response = await axios.post(
        //Priya Port
        "http://192.168.1.24:7100/evaluate",

       //Bartika Port
         //"http://192.168.1.57:8000/evaluate",
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