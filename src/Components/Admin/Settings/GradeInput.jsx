import { useEffect, useState } from "react";
import { createGrading, getAllGradings, createRange, getAllRanges, removeGrading } from "../../../services/gradingApis/gradingApi";
import { toast } from "react-toastify";
import { Loader2, Plus, X, Edit2, Trash2, ChevronLeft } from "lucide-react";

export default function GradeComponent() {
  const [openForm, setOpenForm] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [gradeName, setGradeName] = useState("");
  const [ranges, setRanges] = useState([]);
  const [gradeId, setGradeId] = useState("");
  const [rangeStart, setRangeStart] = useState("");
  const [rangeEnd, setRangeEnd] = useState("");
  const [label, setLabel] = useState("Competent");
  const [grades, setGrades] = useState([]);

  const allowedLabels = ["Competent", "Not Competent"];

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
      setGradeName("");
    } catch (error) {
      toast.error("Failed to create grade");
    }
  };

  const handleDelete = async (id) => {
    try {
      await removeGrading(id);
      setGrades(grades.filter((grade) => grade._id !== id));
    } catch (error) {
      toast.error("Failed to delete grade");
    }
  };

  const openRangeFormHandler = async (id) => {
    try {
      setOpenForm(true);
      setGradeId(id);
      const rangeResponse = await getAllRanges(id);
      setRanges(rangeResponse || []);
    } catch (error) {
      toast.error("Failed to load ranges");
    }
  };

  return (
    <div className="p-6 max-w-lg mx-auto bg-white shadow-lg rounded-lg">
      {!openForm ? (
        <div>
          <div className="flex gap-2 mb-4">
            <input
              type="text"
              value={gradeName}
              onChange={(e) => setGradeName(e.target.value)}
              placeholder="Enter grade name"
              className="border p-2 rounded w-full"
            />
            <button onClick={onCreateGradeHandler} className="bg-blue-500 text-white p-2 rounded flex items-center gap-1">
              <Plus size={16} /> Add
            </button>
          </div>
          {isLoading ? (
            <Loader2 className="animate-spin mx-auto" size={32} />
          ) : (
            grades.map((grade) => (
              <div key={grade._id} className="p-3 bg-gray-100 rounded-lg flex justify-between items-center mb-2">
                <h3 className="font-semibold">{grade.name}</h3>
                <div className="flex gap-2">
                  <button onClick={() => openRangeFormHandler(grade._id)} className="text-blue-500 hover:text-blue-700">
                    <Edit2 size={18} />
                  </button>
                  <button onClick={() => handleDelete(grade._id)} className="text-red-500 hover:text-red-700">
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      ) : (
        <div>
          <button onClick={() => setOpenForm(false)} className="mb-4 flex items-center gap-1 text-gray-600 hover:text-gray-900">
            <ChevronLeft size={20} /> Back
          </button>
          <select value={label} onChange={(e) => setLabel(e.target.value)} className="border p-2 rounded w-full mb-2">
            {allowedLabels.map((lbl) => (
              <option key={lbl} value={lbl}>{lbl}</option>
            ))}
          </select>
          <input
            type="number"
            value={rangeStart}
            onChange={(e) => setRangeStart(e.target.value)}
            placeholder="Start range out of 10"
            className="border p-2 rounded w-full mb-2"
          />
          <input
            type="number"
            value={rangeEnd}
            onChange={(e) => setRangeEnd(e.target.value)}
            placeholder="End range out of 10"
            className="border p-2 rounded w-full mb-2"
          />
          <button onClick={openRangeFormHandler} className="bg-green-500 text-white p-2 rounded w-full">
            Add Range
          </button>
        </div>
      )}
    </div>
  );
}
