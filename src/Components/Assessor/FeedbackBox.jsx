

const FeedbackBox = () => {
  const feedback = {
    name: "John Tan",
    subject: "Mathematics",
    date: "December 26, 2024",
    feedbackText: `John has demonstrated solid understanding of core concepts in mathematics. However, there's room for improvement in problem-solving speed. It would be helpful for him to focus on practicing under timed conditions to enhance his performance in future assessments. Overall, a good effort, and he is encouraged to keep up the hard work.`,
  };

  return (
    <div className="my-4 mx-auto bg-gray-200 dark:bg-gray-700 dark:text-white  p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold ">Feedback for {feedback.name}</h2>
      <div className="mt-4">
        <p className="text-sm text-gray-500">Subject: {feedback.subject}</p>
        <p className="text-sm text-gray-500">Date: {feedback.date}</p>
      </div>
      <div className="mt-6">
        <p className="text-base ">{feedback.feedbackText}</p>
      </div>
      <div className="mt-6">
        <button className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400">
          Edit Feedback
        </button>
      </div>
    </div>
  );
};

export default FeedbackBox;
