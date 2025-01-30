import {create} from "zustand";

const useCourseStore = create((set) => ({
  courseName: "",
  category: "General",
  customCategory: "",
  assessments: [{ name: "" }],
  isOpenAssignModal: false,
  selectedLearners: [],
  selectedTrainers: [],
  selectedAssessors: [],

  scheduleExamDate: "", // New field

  // Actions to update state
  setCourseName: (courseName) => set({ courseName }),
  setCategory: (category) => set({ category, customCategory: category === "Custom" ? "" : "" }),
  setCustomCategory: (customCategory) => set({ customCategory }),
  setAssessments: (assessments) => set({ assessments }),
  addAssessment: () => set((state) => ({
    assessments: [...state.assessments, { name: "" }]
  })),
  removeAssessment: (index) => set((state) => ({
    assessments: state.assessments.filter((_, i) => i !== index)
  })),
  setOpenAssignModal: (isOpen) => set({ isOpenAssignModal: isOpen }),

  setSelectedLearners: (learners) => set(() => ({ selectedLearners: learners })),
  setSelectedTrainers: (trainers) => set(() => ({ selectedTrainers: trainers })),
  setSelectedAssessors: (assessors) => set(() => ({ selectedAssessors: assessors })),
  setScheduleExamDate: (date) => set({ scheduleExamDate: date }), // Setter for exam date

}));

export default useCourseStore;
