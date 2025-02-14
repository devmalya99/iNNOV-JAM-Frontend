import React, { useState } from 'react';
import { AlertCircle } from 'lucide-react';
import AiModelsList from './AiModelsList';
import { useNavigate } from 'react-router';

const AiModelSelector = () => {
  // Available LLMs and their models
  const llmData = {
    GPT: ['gpt-4', 'gpt-3.5-turbo', 'gpt-4-turbo'],
    gemini: ['gemini-pro', 'gemini-ultra', 'gemini-alpha-1'],
    claude: ['claude-3-opus', 'claude-3-sonnet', 'claude-2.1'],
    llama: ['llama-2-70b', 'llama-2-13b', 'llama-2-7b']
  };

  const VITE_API_URL = import.meta.env.VITE_API_URL; 

  const [selectedLLMs, setSelectedLLMs] = useState(['', '']);
  const [selectedModels, setSelectedModels] = useState(['', '']);
  const [weightage, setWeightage] = useState(50);
  const [error, setError] = useState('');

  const navigate = useNavigate()

  const handleLLMSelect = (value, index) => {
    const newLLMs = [...selectedLLMs];
    newLLMs[index] = value;
    setSelectedLLMs(newLLMs);
    
    // Reset the model selection for this index
    const newModels = [...selectedModels];
    newModels[index] = '';
    setSelectedModels(newModels);
  };

  const handleModelSelect = (value, index) => {
    const newModels = [...selectedModels];
    newModels[index] = value;
    setSelectedModels(newModels);
  };

  const handleSubmit = async () => {
    if (!selectedLLMs[0] || !selectedLLMs[1] || !selectedModels[0] || !selectedModels[1]) {
      setError('Please select both LLMs and their models');
      return;
    }

    const data = {
      llm_name: selectedLLMs,
      model_type: selectedModels,
      weightage: [weightage, 100 - weightage]
    };

    console.log('Submitting data:', data);

    try {
      const response = await fetch(`${VITE_API_URL}/api/ai-models/create`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
      });

      if (!response.ok) {
        throw new Error('Failed to save model configuration');
      }

      setError('');
      console.log('Configuration saved successfully');
      navigate('/settings/models-management')
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div>
    <div className="w-full max-w-2xl mx-auto bg-white shadow-lg rounded-lg p-6">
      <h2 className="text-xl font-semibold mb-6">LLM Model Configuration</h2>
      
      {[0, 1].map((index) => (
        <div key={index} className="mb-6">
          <h3 className="text-lg font-medium mb-2">LLM {index + 1}</h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Select LLM</label>
              <select
                value={selectedLLMs[index]}
                onChange={(e) => handleLLMSelect(e.target.value, index)}
                className="block w-full mt-1 border-gray-300 rounded-md shadow-sm"
              >
                <option value="">Select LLM</option>
                {Object.keys(llmData).map((llm) => (
                  <option 
                    key={llm} 
                    value={llm}
                    disabled={selectedLLMs.includes(llm) && selectedLLMs[index] !== llm}
                  >
                    {llm.toUpperCase()}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Select Model</label>
              <select
                value={selectedModels[index]}
                onChange={(e) => handleModelSelect(e.target.value, index)}
                disabled={!selectedLLMs[index]}
                className="block w-full mt-1 border-gray-300 rounded-md shadow-sm"
              >
                <option value="">Select Model</option>
                {selectedLLMs[index] && llmData[selectedLLMs[index]].map((model) => (
                  <option key={model} value={model}>
                    {model}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      ))}

      <div className="mb-6">
        <h3 className="text-lg font-medium mb-2">Weightage Distribution</h3>
        <div className="space-y-2">
          <input
            type="range"
            value={weightage}
            onChange={(e) => setWeightage(Number(e.target.value))}
            max={100}
            step={1}
            className="w-full"
          />
          <div className="flex justify-between text-sm text-gray-600">
            <span>{`${selectedLLMs[0] || 'LLM 1'}: ${weightage}%`}</span>
            <span>{`${selectedLLMs[1] || 'LLM 2'}: ${100 - weightage}%`}</span>
          </div>
        </div>
      </div>

      {error && (
        <div className="bg-red-50 border-l-4 border-red-400 p-4 mb-6 text-red-800">
          <div className="flex items-center">
            <AlertCircle className="h-5 w-5 mr-2" />
            <span>{error}</span>
          </div>
        </div>
      )}

      <button
        onClick={handleSubmit}
        className="w-full bg-blue-500 text-white py-2 rounded-md disabled:bg-gray-400"
        disabled={!selectedLLMs[0] || !selectedLLMs[1] || !selectedModels[0] || !selectedModels[1]}
      >
        Save Configuration
      </button>
    </div>

    
    </div>
  );
};

export default AiModelSelector;
