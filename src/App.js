/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-key */
import * as React from 'react'

import { Admin, Resource } from 'react-admin'

//MUI
import CompanyIcon from '@material-ui/icons/Business'
import GroupIcon from '@material-ui/icons/Group'
import ExamIcon from '@material-ui/icons/BookOutlined'

import Dashboard from './pages/dashboard'
import Layout from './utils/layout'
import MyLoginPage from './pages/myLoginPage'
import authProvider from './providers/authProvider'
import OrganizationList from './resources/organizations/listOrganizations'
import CustomRoutes from './utils/customRoutes'
import dataProvider from './providers/dataProvider'
import listExaminers from './resources/examiners/listExaminers'
import theme from './utils/myTheme'
import ListExams from './resources/exams/listExams'
import MyLayout from './components/myLayout'
import { ThemeProvider } from '@material-ui/core'
import examReducer from './context/examReducer'
import QuestionReducer from './context/QuestionReducer'
import examInfoReducer from './context/examInfoReducer'


const App = () => (
  <Admin
    loginPage={MyLoginPage}
    theme={theme}
    customRoutes={CustomRoutes}
    layout={Layout}
    authProvider={authProvider}
    dashboard={Dashboard}
    dataProvider={dataProvider}
    customReducers={{ examQuestions: examReducer, Questions: QuestionReducer, examInfo: examInfoReducer }}
  >
    {
      permissions => [
        permissions === 'super-admin' ?
          <Resource
            name='Organizations'
            list={OrganizationList}
            icon={CompanyIcon}
          /> : null,
        permissions === 'organization-admin' ?
          <Resource
            name='Examiners'
            list={listExaminers}
            icon={GroupIcon}
          /> : null,
        permissions === 'examiner' ?
          <Resource
            name='Exams'
            list={ListExams}
            icon={ExamIcon}
          /> : null,
      ]}
  </Admin>

)

export default App