import React, { useState } from "react";
import { AlertCircle } from "lucide-react";
import AiModelsList from "./AiModelsList";
import { useNavigate } from "react-router";
import { handleSuccess } from "../../../utils/toast";

const AiModelSelector = () => {
  // Available LLMs and their models
  const llmData = {
    gpt: [
      "gpt-4",
      "gpt-3.5-turbo",
      "gpt-4-turbo",
      "gpt-4-0613",
      "gpt-3.5-turbo-1106",
    ],
    gemini: [
      "gemini-1.5-pro",
      "gemini-1.0-pro",
      "gemini-ultra",
      "gemini-nano",
      "gemini-1.5-flash",
    ],
    groq: ["llama3-8b-8192", "mixtral-8x7b-32768", "llama3-70b-8192"],
  };

  const VITE_API_URL = import.meta.env.VITE_API_URL;

  const [selectedLLMs, setSelectedLLMs] = useState(["", ""]);
  const [selectedModels, setSelectedModels] = useState(["", ""]);
  const [weightage, setWeightage] = useState(50);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleLLMSelect = (value, index) => {
    const newLLMs = [...selectedLLMs];
    newLLMs[index] = value;
    setSelectedLLMs(newLLMs);

    // Reset the model selection for this index
    const newModels = [...selectedModels];
    newModels[index] = "";
    setSelectedModels(newModels);
  };

  const handleModelSelect = (value, index) => {
    const newModels = [...selectedModels];
    newModels[index] = value;
    setSelectedModels(newModels);
  };

  const handleSubmit = async () => {
    if (
      !selectedLLMs[0] ||
      !selectedLLMs[1] ||
      !selectedModels[0] ||
      !selectedModels[1]
    ) {
      setError("Please select both LLMs and their models");
      return;
    }

    const data = {
      llm_name: selectedLLMs,
      model_type: selectedModels,
      weightage: [weightage, 100 - weightage],
    };

    // console.log('Submitting data:', data);

    try {
      const response = await fetch(`${VITE_API_URL}/api/ai-models/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if(response.ok){
        handleSuccess({success:"New Ai Models Selected"})
      }

      if (!response.ok) {
        throw new Error("Failed to save model configuration");
      }

      setError("");
      // console.log('Configuration saved successfully');
      navigate("/settings/models-management");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="w-full dark:bg-gray-900 min-h-screen">
    <div className="w-full max-w-2xl mx-auto my-4 bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6 dark:text-gray-100">
      <h2 className="text-xl font-semibold mb-6 text-gray-900 dark:text-white">
        AI Model Selector
      </h2>

      {[0, 1].map((index) => (
        <div key={index} className="mb-6">
          <h3 className="text-lg font-medium mb-2 text-gray-800 dark:text-gray-200">
            Ai model {index + 1}
          </h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Select Ai Model
              </label>
              <select
                value={selectedLLMs[index]}
                onChange={(e) => handleLLMSelect(e.target.value, index)}
                className="block w-full mt-1 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white p-2"
              >
                <option value="">Select Ai Model</option>
                {Object.keys(llmData).map((llm) => (
                  <option
                    key={llm}
                    value={llm}
                    disabled={
                      selectedLLMs.includes(llm) &&
                      selectedLLMs[index] !== llm
                    }
                    className="dark:bg-gray-700"
                  >
                    {llm}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Select Model
              </label>
              <select
                value={selectedModels[index]}
                onChange={(e) => handleModelSelect(e.target.value, index)}
                disabled={!selectedLLMs[index]}
                className="block w-full mt-1 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white p-2"
              >
                <option value="">Select Model</option>
                {selectedLLMs[index] &&
                  llmData[selectedLLMs[index]].map((model) => (
                    <option key={model} value={model} className="dark:bg-gray-700">
                      {model}
                    </option>
                  ))}
              </select>
            </div>
          </div>
        </div>
      ))}

      <div className="mb-6">
        <h3 className="text-lg font-medium mb-2 text-gray-800 dark:text-gray-200">
          Weightage Distribution
        </h3>
        <div className="space-y-2">
          <input
            type="range"
            value={weightage}
            onChange={(e) => setWeightage(Number(e.target.value))}
            max={100}
            step={1}
            className="w-full h-2 bg-gray-200 dark:bg-gray-600 rounded-lg appearance-none cursor-pointer"
          />
          <div className="flex justify-between text-sm text-gray-600 dark:text-gray-300">
            <p
            className="text-sm border border-gray-700 dark:border-gray-600 rounded-md p-2 text-gray-800 dark:text-gray-300 "
            >{`${selectedLLMs[0] || "Ai model 1"}: ${weightage}%`}</p>
            <p
             className="text-sm border border-gray-700 dark:border-gray-600 rounded-md p-2 text-gray-800 dark:text-gray-300 " >
              {`${selectedLLMs[1] || "Ai model 2"}: ${
              100 - weightage
            }%`}</p>
          </div>
        </div>
      </div>

      {error && (
        <div className="bg-red-50 dark:bg-red-900/20 border-l-4 border-red-400 dark:border-red-600 p-4 mb-6 text-red-800 dark:text-red-200">
          <div className="flex items-center">
            <AlertCircle className="h-5 w-5 mr-2" />
            <span>{error}</span>
          </div>
        </div>
      )}

      <button
        onClick={handleSubmit}
        className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-md disabled:bg-gray-400 dark:disabled:bg-gray-600 transition-colors"
        disabled={
          !selectedLLMs[0] ||
          !selectedLLMs[1] ||
          !selectedModels[0] ||
          !selectedModels[1]
        }
      >
        Save Configuration
      </button>
    </div>
  </div>
  );
};

export default AiModelSelector;
