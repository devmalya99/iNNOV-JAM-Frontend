

import {create} from "zustand"


//create a store to manage grades
const usreGradeStore = create ((set)=>(
    {
        grades:[],

        setGrades: (fetchedGrades)=>set({grades:fetchedGrades})
    }
));


export  default usreGradeStore;