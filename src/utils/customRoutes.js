import React from 'react'
import { Route } from 'react-router-dom'

// import CreateExams from '../resources/exams/createExams'
import ChangePassword from '../pages/changePassword'
import ForgotPassword from '../pages/forgotPassword'
import ResetPassword from '../pages/resetPassword'
// import ExamInfoPage from '../pages/examInfoPage'
import ExamineeHomePage from '../components/examineeHomePage'
import TakeExam from '../resources/exams/takeExam'
import AddExam from '../pages/addExam'
import ListExaminees from '../resources/examinees/listExaminees'
// import { useSelector } from 'react-redux'
// import ResultDetailPage from '../pages/resultDetailPage'
import ShowResult from '../components/Results/showResult'
import ExamDetail from '../resources/exams/create/examDetail'
import QuestionForms from '../resources/exams/create/questionForm'
import AddQuestions from '../resources/exams/create/addQuestions'
import EditQuestions from '../resources/exams/edit/editQuestions'
import EditQuestionForm from '../resources/exams/edit/editQuestionForm'
// import Editor from '../components/Questions/editor'


export default [
  <Route key='5' exact path='/proceed-to-exam' component={ExamineeHomePage} noLayout />,
  <Route key='0' exact path='/create-exam' component={ExamDetail} />,
  <Route key='1' exact path='/forgot-password' component={ForgotPassword} noLayout />,
  <Route key='2' exact path='/reset-password' component={ResetPassword} noLayout />,
  <Route key='3' exact path='/change-password' component={ChangePassword} noLayout />,
  <Route key='4' exact path='/take-exams' component={TakeExam} noLayout />,
  <Route key='6' exact path='/add-exam' component={AddExam} noLayout />,
  <Route key='7' exact path='/invitations/:id' component={ListExaminees} />,
  <Route key='8' exact path='/results/:id' component={ShowResult} noLayout />,
  <Route key='9' exact path='/editor' component={ExamDetail} noLayout />,
  <Route key='10' exact path='/create' component={QuestionForms} />,
  <Route key='11' exact path='/add-questions' component={AddQuestions} />,
  <Route key='12' exact path='/:id/edit-questions' component={EditQuestions} />,
  <Route key='13' exact path='/edit-question/:id' component={EditQuestionForm} />
]

