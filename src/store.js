import {create} from 'zustand';

const useGradeStore = create((set) => ({
  grades: [],
  addGrade: (grade) =>
    set((state) => ({
      grades: [...state.grades, grade],
    })),
}));

export default useGradeStore;
