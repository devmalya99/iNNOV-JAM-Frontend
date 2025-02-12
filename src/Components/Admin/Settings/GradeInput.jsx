import { useEffect, useState } from "react";
import { createGrading, getAllGradings, createRange, getAllRanges, removeGrading } from "../../../services/gradingApis/gradingApi";
import { toast } from "react-toastify";
import { Loader2, Plus, X, Edit2, Trash2, ChevronLeft, Check } from "lucide-react";

export default function GradeComponent() {
  const [openForm, setOpenForm] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [gradeName, setGradeName] = useState("");
  const [ranges, setRanges] = useState([]);
  const [grageId, setGradeId] = useState('');
  const [rangeStart, setRangeStart] = useState("");
  const [rangeEnd, setRangeEnd] = useState("");
  const [label, setLabel] = useState('');
  const [grades, setGrades] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const response = await getAllGradings();
        setGrades(response);
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);

  const onCreateGradeHandler = async () => {
    if (!gradeName.trim()) {
      toast.warning("Please enter a grade name");
      return;
    }
    try {
      const gradeData = await createGrading({ name: gradeName, status: false });
      if (gradeData) {
        setGrades([...grades, { _id: gradeData._id, name: gradeName, status: false }]);
        toast.success("Grade created successfully");
      }
      setGradeName('');
    } catch (error) {
      toast.error("Failed to create grade");
    }
  };

  const createRangeHandler = async () => {
    if (!label.trim()) {
      toast.warning("Please enter a label");
      return;
    }

    if (+rangeStart > +rangeEnd) {
      toast.warning("Start range cannot be greater than end range");
      return;
    }

    try {
      const rangeData = await createRange({ 
        grade_id: grageId, 
        label, 
        startRange: rangeStart, 
        endRange: rangeEnd 
      });
      
      if (rangeData) {
        setRanges([...ranges, { 
          _id: rangeData.range._id, 
          label, 
          startRange: rangeStart, 
          endRange: rangeEnd 
        }]);
        toast.success("Range created successfully");
        setRangeStart('');
        setRangeEnd('');
        setLabel('');
      }
    } catch (error) {
      toast.error("Failed to create range");
    }
  };

  const openRangeFormHander = async (id) => {
    try {
      setOpenForm(true);
      setGradeId(id);
      const rangeResponse = await getAllRanges(id);
      setRanges(rangeResponse || []);
    } catch (error) {
      toast.error("Failed to load ranges");
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-[calc(100vh-40px)] bg-gray-50 dark:bg-gray-900">
        <div className="flex flex-col items-center space-y-4">
          <Loader2 className="h-8 w-8 animate-spin text-blue-600 dark:text-blue-400" />
          <p className="text-gray-600 dark:text-gray-400">Loading grades...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-[calc(100vh-80px)] 
    bg-gray-100 dark:bg-gray-900 p-4 md:p-8">
      {!openForm ? (
        <div className="max-w-4xl mx-auto space-y-6">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Grade Management</h1>
            
            <div className="flex flex-col md:flex-row gap-4 mb-8">
              <input
                type="text"
                value={gradeName}
                onChange={(e) => setGradeName(e.target.value)}
                placeholder="Enter grade name"
                className="flex-1 px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 
                         focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white 
                         transition-all duration-200"
              />
              <button
                onClick={onCreateGradeHandler}
                className="flex items-center justify-center space-x-2 px-6 py-2 bg-blue-600 
                         hover:bg-blue-700 text-white rounded-lg transition-colors duration-200"
              >
                <Plus className="h-5 w-5" />
                <span>Create Grade</span>
              </button>
            </div>

            <div className="space-y-4">
              {grades?.map((grade) => (
                <div
                  key={grade._id}
                  className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg shadow-sm hover:shadow-md 
                           transition-all duration-200 animate-in slide-in-from-left"
                >
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="space-y-1">
                      <h3 className="font-semibold text-gray-900 dark:text-white text-lg">
                        {grade.name}
                      </h3>
                      <span className="text-sm text-gray-600 dark:text-gray-300">
                        Status: {grade.status ? 'Active' : 'Inactive'}
                      </span>
                    </div>
                    
                    <div className="flex flex-wrap gap-2">
                      <button
                        onClick={() => {
                          removeGrading(grade._id);
                          setGrades(grades.filter((g) => g._id !== grade._id));
                        }}
                        className="flex items-center space-x-1 px-3 py-1.5 bg-red-500 hover:bg-red-600 
                                 text-white rounded-lg text-sm transition-colors duration-200"
                      >
                        <Trash2 className="h-4 w-4" />
                        <span>Remove</span>
                      </button>
                      <button className="flex items-center space-x-1 px-3 py-1.5 bg-yellow-500 
                                     hover:bg-yellow-600 text-white rounded-lg text-sm transition-colors duration-200">
                        <Edit2 className="h-4 w-4" />
                        <span>Edit</span>
                      </button>
                      <button
                        onClick={() => openRangeFormHander(grade._id)}
                        className="flex items-center space-x-1 px-3 py-1.5 bg-green-500 hover:bg-green-600 
                                 text-white rounded-lg text-sm transition-colors duration-200"
                      >
                        <Plus className="h-4 w-4" />
                        <span>Add Range</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}

              {grades.length === 0 && (
                <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                  No grades created yet. Create your first grade above.
                </div>
              )}
            </div>
          </div>
        </div>
      ) : (
        <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
          <div className="flex justify-between items-center mb-6">
            <button
              onClick={() => {
                setOpenForm(false);
                setGradeName('');
                setRangeStart('');
                setRangeEnd('');
                setLabel('');
              }}
              className="flex items-center text-gray-600 dark:text-gray-300 hover:text-gray-900 
                       dark:hover:text-white transition-colors duration-200"
            >
              <ChevronLeft className="h-5 w-5 mr-1" />
              <span>Back to Grades</span>
            </button>
          </div>

          <div className="space-y-6">
            <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Create New Range</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                    Label
                  </label>
                  <input
                    type="text"
                    value={label}
                    onChange={(e) => setLabel(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 
                             focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                    placeholder="Enter label"
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                    Start Range
                  </label>
                  <input
                    type="number"
                    value={rangeStart}
                    onChange={(e) => setRangeStart(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 
                             focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                    placeholder="Start %"
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                    End Range
                  </label>
                  <input
                    type="number"
                    value={rangeEnd}
                    onChange={(e) => setRangeEnd(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 
                             focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                    placeholder="End %"
                  />
                </div>

                <div className="flex items-end">
                  <button
                    onClick={createRangeHandler}
                    className="w-full flex items-center justify-center space-x-2 px-4 py-2 bg-green-600 
                             hover:bg-green-700 text-white rounded-lg transition-colors duration-200"
                  >
                    <Plus className="h-5 w-5" />
                    <span>Add Range</span>
                  </button>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Existing Ranges</h2>
              
              {ranges.map((range, index) => (
                <div
                  key={range._id || index}
                  className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg shadow-sm hover:shadow-md 
                           transition-all duration-200 animate-in slide-in-from-right"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                    <div className="flex-1 min-w-0">
                      <h3 className="text-lg font-medium text-gray-900 dark:text-white truncate">
                        {range.label}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-300">
                        Range: {range.startRange}% - {range.endRange}%
                      </p>
                    </div>
                    
                    <div className="flex gap-2">
                      <button className="flex items-center space-x-1 px-3 py-1.5 bg-yellow-500 
                                     hover:bg-yellow-600 text-white rounded-lg text-sm transition-colors duration-200">
                        <Edit2 className="h-4 w-4" />
                        <span>Edit</span>
                      </button>
                      <button className="flex items-center space-x-1 px-3 py-1.5 bg-red-500 
                                     hover:bg-red-600 text-white rounded-lg text-sm transition-colors duration-200">
                        <Trash2 className="h-4 w-4" />
                        <span>Remove</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}

              {ranges.length === 0 && (
                <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                  No ranges created yet. Add your first range above.
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}