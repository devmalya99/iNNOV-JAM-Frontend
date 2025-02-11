import { useEffect, useState } from "react";
import { createGrading, getAllGradings } from "../../../services/gradingApis/gradingApi";
import { toast } from "react-toastify";

export default function GradeComponent() {
  const [openForm, setOpenForm] = useState(false);
  const [gradeName, setGradeName] = useState("");
  const [ranges, setRanges] = useState([]);
  const [grageId, setGradeId] = useState('')
  const [rangeStart, setRangeStart] = useState("");
  const [rangeEnd, setRangeEnd] = useState("");
  const [grades, setGrades] = useState([]);


  useEffect(() => {
    (async () => {
      const response = await getAllGradings();
      console.log(response)
      setGrades(response);
    })();
  }, [])

  const onCreateGradeHandler = () => {
    if (!gradeName) {
      toast.warning("Please enter a grade name");
      return;
    }
    createGrading({ name: gradeName, status: false })
    setGrades([...grades, { name: gradeName, status: false }])
    setGradeName('')
  }

  

  const createRangeHandler = () => {
   
  }


  return (
    <div className="flex justify-center h-[calc(100vh-80px)] py-8 bg-gray-100 dark:bg-gray-900">
      {!openForm ? (
        <div className="max-w-4xl w-full px-6 sm:px-8 lg:px-12">
          <div className="flex items-center space-x-4 mb-4">
            <input
              type="text"
              value={gradeName}
              onChange={(e) => setGradeName(e.target.value)}
              placeholder="Enter grade"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white dark:border-gray-600"
            />
            <button
              onClick={onCreateGradeHandler}
              className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition">
              Create Grade
            </button>
          </div>
          <ul className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg">
            {grades?.map((grade) => (
              <li key={grade.id} className="flex justify-between items-center bg-white dark:bg-gray-800 p-3 mt-2 rounded-lg shadow-sm">
                <div className="flex space-x-4">
                  <span className="font-semibold text-gray-700 dark:text-white">
                    {grade.name}
                  </span>
                  <span className="text-sm mt-1 text-gray-500 dark:text-gray-300">
                    {grade.status}
                  </span>
                </div>
                <button
                  className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-green-600 transition"
                >
                  remove
                </button>
                <button

                  className="bg-yellow-500 text-white px-3 py-1 rounded-lg hover:bg-green-600 transition"
                >
                  edit
                </button>
                <button
                  onClick={() => {
                    setOpenForm(true)
                    setGradeId(grade._id)
                  }}
                  className="bg-green-500 text-white px-3 py-1 rounded-lg hover:bg-green-600 transition"
                >
                  Create Range
                </button>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 w-full max-w-4xl">
          <button
            onClick={() => {
              setOpenForm(false)
              setGradeName('')
              setRangeStart('')
              setRangeEnd('')
            }}
            className="text-xl float-right text-gray-600 dark:text-gray-300"
          >
            ❌
          </button>
          <div className="">
            {/* Left Section: Form to create grades */}
            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md mt-2">
              <div className="flex items-center space-x-4">
                {/* Grade Label Input */}
                <div className="flex-1">
                  <label className="block text-gray-700 dark:text-gray-200 text-sm font-medium">
                    Label
                  </label>
                  <input
                    type="text"
                    value={gradeName}
                    onChange={(e) => setGradeName(e.target.value)}
                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:focus:ring-blue-300 dark:focus:border-blue-400"
                    placeholder="Enter grade label"
                    required
                  />
                </div>

                {/* Start Range Input */}
                <div className="flex-1">
                  <label className="block text-gray-700 dark:text-gray-200 text-sm font-medium">
                    Start Range
                  </label>
                  <input
                    type="number"
                    value={rangeStart}
                    onChange={(e) => setRangeStart(e.target.value)}
                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:focus:ring-blue-300 dark:focus:border-blue-400"
                    placeholder="Enter start range"
                  />
                </div>

                {/* End Range Input */}
                <div className="flex-1">
                  <label className="block text-gray-700 dark:text-gray-200 text-sm font-medium">
                    End Range
                  </label>
                  <input
                    type="number"
                    value={rangeEnd}
                    onChange={(e) => setRangeEnd(e.target.value)}
                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:focus:ring-blue-300 dark:focus:border-blue-400"
                    placeholder="Enter end range"
                  />
                </div>

                {/* Create Range Button */}
                <button
                  className="bg-green-600 text-white text-sm px-4 py-2 rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-300"
                >
                  Create Range
                </button>
              </div>
            </div>

            {/* Right Section: Display Created Grades */}
            <div>
              <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-6">
                Ranges
              </h2>
              {grades.length > 0 ? (
                <ul className="space-y-4">
                  {ranges.map((grade, index) => (
                    <li
                      key={index}
                      className="flex justify-between items-center text-lg text-gray-800 dark:text-white border-2 px-8 py-3 rounded-md gap-6 dark:border-gray-600"
                    >
                      <div>{grade.label}</div>
                      <div className="flex justify-end text-gray-500 dark:text-gray-400 w-full">
                        ({grade.startRange} - {grade.endRange}) %
                      </div>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-500 dark:text-gray-400">
                  No grades created yet.
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}