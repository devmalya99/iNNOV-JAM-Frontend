import { useState } from "react";

const AIModelSelector = () => {
  // State to hold selected models and their confidence values
  const [active1,setActive1] = useState('')
  const [active2,setActive2] = useState('')
  const [selectedModel1, setSelectedModel1] = useState('');
  const [selectedModel2, setSelectedModel2] = useState('');
  const [confidence1, setConfidence1] = useState(50); // Initial confidence at 50%
  const [confidence2, setConfidence2] = useState(50); // Initial confidence at 50%

  // Models and their versions in a dynamic structure
  const ModelsList = [
    {
      model: "ChatGPT",
      varients: ["GPT-3", "GPT-3.5", "GPT-4"],
    },
    {
      model: "Gemini",
      varients: ["Gemini 1", "Gemini 1.5", "Gemini 2"],
    },
    {
      model: "Bard",
      varients: ["Math Bard", "D Bard"],
    },
  ];

  // Update confidence for Model 1 and automatically adjust Model 2
  const handleConfidenceChange = (value) => {
    setConfidence1(value);
    setConfidence2(100 - value); // Set confidence2 to 100 - confidence1
  };

  const handleReset = ()=>{
    setSelectedModel1('')
    setSelectedModel2('')
  }

  return (
    <div className="bg-white dark:bg-gray-800 mt-8 dark:text-white p-6 mx-auto max-w-4xl rounded-lg shadow-lg">
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 ">
      <div className="bg-gray-100 dark:bg-gray-700 p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">Select Models</h2>
        {ModelsList.map((item, index) => (
          <div key={index} className="mb-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">{item.model} Model</h3>
            <div className="relative">
              <label htmlFor={item.model} className="text-sm font-medium text-gray-700 dark:text-gray-200">
                Select {item.model} Version
              </label>
              <select
                id={item.model}
                onChange={(e) => {
                  if (!selectedModel1) {
                    setSelectedModel1(e.target.value);
                  } else {
                    setSelectedModel2(e.target.value);
                  }
                }}
                className="mt-2 w-full py-2 px-4 border rounded-lg bg-gray-50 dark:bg-gray-800 dark:text-white focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select a model</option>
                {item.varients.map((variant, idx) => (
                  <option key={idx} value={variant}>
                    {variant}
                  </option>
                ))}
              </select>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-gray-100 dark:bg-gray-700 p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">Selected Models & Confidence</h2>
        <div className="mb-6">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white">Model 1: {selectedModel1 || "None"}</h3>
          <p className="text-sm text-gray-600 dark:text-gray-300">Confidence: {confidence1}%</p>
        </div>
        <div className="mb-6">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white">Model 2: {selectedModel2 || "None"}</h3>
          <p className="text-sm text-gray-600 dark:text-gray-300">Confidence: {confidence2}%</p>
        </div>

        <div className="mb-6">
          <label htmlFor="confidence-slider" className="text-sm font-medium text-gray-700 dark:text-gray-200">
            Confidence Meter
          </label>
          <input
            id="confidence-slider"
            type="range"
            min="0"
            max="100"
            value={confidence1}
            onChange={(e) => handleConfidenceChange(e.target.value)}
            className="w-full mt-2 appearance-none h-2 rounded-lg bg-gray-300 dark:bg-gray-600 focus:outline-none"
          />
        </div>
      </div>
    </div>

    <div className="flex gap-4 mt-6 justify-center">
      <button className="bg-blue-500 text-white py-2 px-6 rounded-lg hover:bg-blue-600 transition duration-200 ease-in-out">
        Save Preferences
      </button>
      <button
        onClick={handleReset}
        className="bg-red-500 text-white py-2 px-6 rounded-lg hover:bg-red-600 transition duration-200 ease-in-out"
      >
        Reset Preferences
      </button>
    </div>
  </div>
  );
};

export default AIModelSelector;
