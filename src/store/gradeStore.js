import { create } from "zustand";

// Create a store to manage grades and other properties
const userGradeStore = create((set) => ({
  gradeName: "",
  gradeId: "",
  rangeStart: "",
  rangeEnd: "",
  label: "",

  // Setters to update the state
  setGradeName: (newGradeName) => set({ gradeName: newGradeName }),
  setGradeId: (newGradeId) => set({ gradeId: newGradeId }),
  setRangeStart: (newRangeStart) => set({ rangeStart: newRangeStart }),
  setRangeEnd: (newRangeEnd) => set({ rangeEnd: newRangeEnd }),
  setLabel: (newLabel) => set({ label: newLabel }),

  // Other state related to grades
  grades: [],
  ranges: [],
  openForm: false,
  openGradeNameEditModal: false,
  setOpenGradeNameEditModal: (newState) => set({ openGradeNameEditModal: newState }),

  setGrades: (fetchedGrades) => set({ grades: fetchedGrades }),
  setRanges: (fetchedRanges) => set({ ranges: fetchedRanges }),
  setOpenForm: (newState) => set({ openForm: newState }),
}));

export default userGradeStore;
