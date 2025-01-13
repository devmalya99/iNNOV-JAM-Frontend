
function calculatePredeterminedGrade (avgScore){
    if (avgScore >= 9) {
      return 'Fully Align';
    } else if (avgScore >= 7) {
      return 'Closely Aligned';
    } else if (avgScore >= 5) {
      return 'Partially Align';
    } else {
      return 'Not Aligned';
    }
  }

  export default calculatePredeterminedGrade;


  export const calculateAverageScore=(data)=> {
    // Extract the score values from the data object, excluding 'null' values
    const scores = [
      data?.sbert_score,
      data?.roberta_score,
      data?.distilroberta_score,
      data?.t5_score,
      data?.gpt_score,
      data?.minilm_score,
      data?.labse_score,
      data?.gemini_score
    ];
  
    // Filter out any null values from the scores
    const validScores = scores.filter(score => score !== null);
  
    // Calculate the sum of the valid scores
    const sum = validScores.reduce((acc, score) => acc + score, 0);
  
    // Calculate the average
    const average = sum / validScores.length;
  
    return average;
  }

  export const getBackgroundGradient = (avgScore) => {
    if (avgScore >= 9) {
      return "bg-gradient-to-r from-green-500 via-green-400 to-white"; // Light gradient for high scores
    } else if (avgScore >= 7) {
      return "bg-gradient-to-r from-green-200 via-green-100 to-white"; // Yellow gradient for mid-high scores
    } else if (avgScore >= 5) {
      return "bg-gradient-to-r from-red-200 via-red-100 to-white"; // Red gradient for mid-low scores
    } else {
      return "bg-gradient-to-r from-gray-200 via-gray-100 to-white"; // Neutral gradient for low scores
    }
  };
