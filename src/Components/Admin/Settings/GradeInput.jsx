import { useEffect, useState } from "react";
import { createGrading, getAllGradings, createRange, getAllRanges, removeGrading } from "../../../services/gradingApis/gradingApi";
import { toast } from "react-toastify";

export default function GradeComponent() {
  const [openForm, setOpenForm] = useState(false);
  const [gradeName, setGradeName] = useState("");
  const [ranges, setRanges] = useState([]);
  const [grageId, setGradeId] = useState('')
  const [rangeStart, setRangeStart] = useState("");
  const [rangeEnd, setRangeEnd] = useState("");
  const [label, setLabel] = useState('');
  const [grades, setGrades] = useState([]);


  useEffect(() => {
    (async () => {
      const response = await getAllGradings();

      setGrades(response);
    })();
  }, [])


  const onCreateGradeHandler = async () => {
    if (!gradeName) {
      toast.warning("Please enter a grade name");
      return;
    }
    const gradeData = await createGrading({ name: gradeName, status: false })
    if (gradeData) {
      setGrades([...grades, { _id: gradeData._id, name: gradeName, status: false }])
    }
    setGradeName('')
  }

  const createRangeHandler = async () => {
    if (!label) {
      toast.warning("Please enter a label");
      return;
    }

    if (+rangeStart > +rangeEnd) {
      toast.warning("Please enter a valid range");
      return;
    }
    if (+rangeStart <= +rangeEnd) {
      const rangeData = await createRange({ grade_id: grageId, label, startRange: rangeStart, endRange: rangeEnd })
      console.log(rangeData)
      if (rangeData) {
        setRanges([...ranges, { _id: rangeData.range._id, label, startRange: rangeStart, endRange: rangeEnd }])
      }
      setRangeStart('')
      setRangeEnd('')
      setLabel('')
    }
  }

  const openRangeFormHander = async (id) => {
    setOpenForm(true);
    setGradeId(id);
    const rangeResponse = await getAllRanges(id);
    console.log(rangeResponse)
    setRanges(rangeResponse || []);
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
          <ul className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg shadow-md">
            {grades?.map((grade) => (
              <li
                key={grade.id}
                className="flex justify-between items-center bg-white dark:bg-gray-800 p-4 mt-3 rounded-lg shadow-md hover:shadow-lg transition duration-300"
              >
                {/* Grade Name & Status */}
                <div className="flex flex-col space-y-1">
                  <span className="font-semibold text-gray-800 dark:text-white text-lg">
                    {grade.name}
                  </span>
                  <span className="text-sm text-gray-600 dark:text-gray-300">
                    {grade.status}
                  </span>
                </div>

                {/* Buttons */}
                <div className="flex space-x-3">
                  <button
                    onClick={() => {
                      removeGrading(grade._id)
                      setGrades(grades.filter((g) => g._id !== grade._id))
                    }}
                    className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg text-sm transition duration-300">
                    Remove
                  </button>
                  <button className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg text-sm transition duration-300">
                    Edit
                  </button>
                  <button
                    onClick={() => openRangeFormHander(grade._id)}
                    className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg text-sm transition duration-300"
                  >
                    Create Range
                  </button>
                </div>
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
              setLabel('')
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
                    value={label}
                    onChange={(e) => setLabel(e.target.value)}
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
                  onClick={createRangeHandler}
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
                  {ranges?.map((grade, index) => (
                    <li
                      key={index}
                      className="flex justify-between items-center bg-white dark:bg-gray-800 text-lg text-gray-800 dark:text-white border border-gray-300 dark:border-gray-600 px-6 py-4 rounded-lg shadow-md hover:shadow-lg transition duration-300"
                    >
                      <div className="font-medium">{grade.label}</div>
                      <div className="flex-1 text-center text-gray-600 dark:text-gray-400">
                        ({grade.startRange} - {grade.endRange}) %
                      </div>
                      <div className="flex space-x-3">
                        <button className="bg-yellow-500 hover:bg-yellow-600 text-black px-4 py-2 text-sm rounded-lg transition duration-300">
                          Edit
                        </button>
                        <button className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 text-sm rounded-lg transition duration-300">
                          Remove
                        </button>
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