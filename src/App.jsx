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
import { ToastContainer } from 'react-toastify';

import CoursesDashboard from './Components/Admin/CoursesDashboard'
import CreateCourse from './Components/Admin/CreateCourse'

import AssignTrainersModal from './Components/Admin/AssignUser/AssignTrainersModal'
import AssignAssessorsModal from './Components/Admin/AssignUser/AssignAssessorsModal'
import AssignLearnersModal from './Components/Admin/AssignUser/AssignLearnersModal'
import UserManagement from './Components/Admin/User Management'
import AssessmentCreation from './Components/Admin/Assessment Creation/AssessmentCreation'
import ViewCourseAssessments from './Components/Admin/AssessmentManagement/ViewCourseAssessments'
import CreateUsers from './Components/Admin/Create User/CreateUsers'
import UserCourses from './Components/Common/UserCourses'
import ViewAssessmentFiles from './Components/Admin/Assessment Creation/ViewAssessmentFiles'
import DisplayAssessmentsByCourse from './Components/Learner/DisplayAssessmentsByCourse'
import AssessorCourses from './Components/Assessor/Assessor Courses/AssessorCourses'
import CourseResult from './Components/Assessor/CourseResult'
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


        <Route path='create-course' element={<CreateCourse/>}>
        <Route path='assign-trainers' element={<AssignTrainersModal/>}/>
        <Route path='assign-assessors' element={<AssignAssessorsModal/>}/>
        <Route path='assign-learners' element={<AssignLearnersModal/>}/>
        <Route path="courses/:courseid" element={<AssessmentCreation/>}/>
        </Route>
        
        <Route path="view-assessment-files/:courseid" element={<ViewAssessmentFiles/>}/>

       
        <Route path='upload-courseware' element={<UploadCourseware/>}/>
        <Route path='upload-assessment-plan' element={<UploadAssesmentPlan/>}/>
        <Route path='all-assessments' element={<CoursesDashboard/>}/>

        {/* View all assessments created under a course */}
        <Route path='view/all-assessments/:courseid' element={<ViewCourseAssessments/>}/>
       
        <Route path='create-users' element={<CreateUsers/>}/>
        
        <Route path='user-management' element={<UserManagement/>}/>
        
        </Route>

        {/* Routes for settings */}
        <Route path='/settings' element={<ProtectedRoute> <SettingsLayout/></ProtectedRoute>}>
        <Route index element={<GradeInput/>}/>
        <Route path='models' element={<AiModelSelector/>}/>
        </Route>



         {/* Protected Assessor Routes */}
        <Route path='home/assessment' element={<ProtectedRoute><AssessorLayout /></ProtectedRoute>}>
        <Route index element={<AssessmentOverview/>}/>
        <Route path='view-all-assigned-courses' element={<AssessorCourses/>}/>
        <Route path='view-course-result/:courseId' element={<CourseResult/>}/>
        

        <Route path='exam/date' element={<Examwise/>}/>
        <Route path='exam/date/learner/:id' element={<LearnerWise/>}/>
        </Route>


        {/* Protected Route for learners */}
        <Route path='home/learner' element={<ProtectedRoute><LearnerLayout /></ProtectedRoute>}>
        <Route index element={<Welcome/>}/>
        <Route path="view-all-courses" element={<UserCourses/>}/>
        <Route path='instructions/:assessmentId' element={<InstructionsPage/>}/>
        <Route path='answer-writing/:assessmentId' element={<AnswerWritingPage/>}/>
        <Route path='assessment-submission/confirm/:id' element={<ConfirmModal/>}/>
        <Route path='exam/date/learner' element={<LearnerWise/>}/>
        <Route path='assessments/:userId/:courseId' element={<DisplayAssessmentsByCourse/>}/> 
        
        </Route>
        

      </Routes>
      <ToastContainer/>
    </div>
    
  )
}

export default App
