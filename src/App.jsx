import { useEffect, useState } from 'react'

import './App.css'

import HomeLayout from './layout/HomeLayout'
import { Routes,Route } from 'react-router'
import Welcome from './Components/Welcome'
import AuthLayout from './layout/AuthLayout'
import HeroLandingPage from './Components/Landing/HeroLandingPage'
import { ForgotPassword } from './Components/Landing/ForgotPassword'
import { Signup } from './Components/Landing/Signup'
import { Login } from './Components/Landing/Login'
import UploadCourseware from './Components/Admin/UploadCourseware'
import UploadAssesmentPlan from './Components/Admin/UploadAssesmentPlan'
import AssignTrainers from './Components/Admin/AssignTrainers'
import AssignLearner from './Components/Admin/AssignLearner'
import AssignTSC from './Components/Admin/AssignTSC'
import AssessorLayout from './Components/Assessor/AssessorLayout'
import AssessmentOverview from './Components/Assessor/AssessmentOverview'
import Examwise from './Components/Assessor/Examwise'
import LearnerWise from './Components/Assessor/LearnerWiseResult/LearnerWise'
import BookConsultationPage from './Components/BookConsultationPage'
import ProtectedRoute from './TokenValidation/ProtectedRoute'
import StudentAnswer from './Components/Learner/StudentAnswer'
import LearnerLayout from './Components/Learner/LearnerLayout'
import SettingsLayout from './Components/Admin/Settings/SettingsLayout'
import AiModelSelector from './Components/Admin/Settings/AiModelSelector'
import GradeInput from './Components/Admin/Settings/GradeInput'
import AnswerWritingPage from './Components/Learner/AnswerWritingPage.jsx/AnswerWritingPage'

import Help from './Components/Help'
import InstructionsPage from './Components/Learner/InstructionsPage'
import ConfirmModal from './Components/Learner/ConfirmModal'
import { ToastContainer, toast } from 'react-toastify';
import AssessmentDashboard from './Components/Admin/AssessmentDashboard'
function App() {

 

  return (
    
    <div className=' dark:bg-gray-900 bg-gray-300 w-full h-screen'>

      <Routes>

        <Route path='/' element={<AuthLayout/>}>
           <Route index element={<HeroLandingPage/>}/>
           <Route path='login' element={<Login/>}/>
           <Route path='signup' element={<Signup/>}/>
           <Route path='book-consultation' element={<BookConsultationPage/>}/>
           <Route path='help' element={<Help/>}/>

           <Route path='forgot-password' element={<ForgotPassword/>}/>
        </Route>

        {/* after login */}
        <Route path='/home' element={<ProtectedRoute> <HomeLayout/></ProtectedRoute>  }>
        <Route index element={<Welcome/>}/>
        <Route path='upload-courseware' element={<UploadCourseware/>}/>
        <Route path='upload-assesment-plan' element={<UploadAssesmentPlan/>}/>
        <Route path='all-assessments' element={<AssessmentDashboard/>}/>
        <Route path='assign-trainers' element={<AssignTrainers/>}/>
        <Route path='assign-learner' element={<AssignLearner/>}/>
        <Route path='assign-tsc' element={<AssignTSC/>}/>
        </Route>

        {/* Routes for settings */}
        <Route path='/settings' element={<ProtectedRoute> <SettingsLayout/></ProtectedRoute>}>
        <Route index element={<GradeInput/>}/>
        <Route path='models' element={<AiModelSelector/>}/>
        </Route>



         {/* Protected Assessor Routes */}
        <Route path='home/assessment' element={<ProtectedRoute><AssessorLayout /></ProtectedRoute>}>
        <Route index element={<AssessmentOverview/>}/>
        

        <Route path='exam/date' element={<Examwise/>}/>
        <Route path='exam/date/learner/:id' element={<LearnerWise/>}/>
        </Route>


        {/* Protected Route for learners */}
        <Route path='home/learner' element={<ProtectedRoute><LearnerLayout /></ProtectedRoute>}>
        <Route index element={<Welcome/>}/>
        <Route path='instructions' element={<InstructionsPage/>}/>
        <Route path='answer-writing/:id' element={<AnswerWritingPage/>}/>
        <Route path='assessment-submission/confirm/:id' element={<ConfirmModal/>}/>
        <Route path='exam/date/learner' element={<LearnerWise/>}/>
        </Route>
        

      </Routes>
      <ToastContainer/>
    </div>
    
  )
}

export default App
