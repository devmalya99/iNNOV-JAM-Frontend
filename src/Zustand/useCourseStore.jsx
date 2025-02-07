import { create } from "zustand";

const useCourseStore = create((set) => ({
  courseName: "",
  courseCode: "",
  courseDescription: "",
  category: "General",
  customCategory: "",
  totalMarks: 100,
  startDate: "",
  endDate: "",
  totalEnrollmentCount: 0,
  visibility: "Public", // Can be 'Public' or 'Private'

  assessments: [{ name: "" }],
  isOpenAssignModal: false,
  selectedLearners: [],
  selectedTrainers: [],
  selectedAssessors: [],
  scheduleExamDate: "",

  // Actions to update state
  setCourseName: (courseName) => set({ courseName }),
  setCourseCode: (courseCode) => set({ courseCode }),
  setCourseDescription: (courseDescription) => set({ courseDescription }),
  setCategory: (category) => set({ category, customCategory: category === "Custom" ? "" : "" }),
  setCustomCategory: (customCategory) => set({ customCategory }),
  setTotalMarks: (totalMarks) => set({ totalMarks }),
  setStartDate: (startDate) => set({ startDate }),
  setEndDate: (endDate) => set({ endDate }),
  setTotalEnrollmentCount: (count) => set({ totalEnrollmentCount: count }),
  setVisibility: (visibility) => set({ visibility }),

  setAssessments: (assessments) => set({ assessments }),
  addAssessment: () => set((state) => ({
    assessments: [...state.assessments, { name: "" }]
  })),
  removeAssessment: (index) => set((state) => ({
    assessments: state.assessments.filter((_, i) => i !== index)
  })),

  setOpenAssignModal: (isOpen) => set({ isOpenAssignModal: isOpen }),
  setSelectedLearners: (learners) => set({ selectedLearners: learners }),
  setSelectedTrainers: (trainers) => set({ selectedTrainers: trainers }),
  setSelectedAssessors: (assessors) => set({ selectedAssessors: assessors }),
  setScheduleExamDate: (date) => set({ scheduleExamDate: date }),
}));

export default useCourseStore;
