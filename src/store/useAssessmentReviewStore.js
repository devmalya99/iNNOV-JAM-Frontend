import {create} from "zustand";

const useAssessmentReviewStore = create (
    (set)=>({
        activeNumber: 0,//initial state
        setActiveNumber: (newNumber)=>set({activeNumber: newNumber})
    })
)

export default useAssessmentReviewStore