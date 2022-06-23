import {CommonTemplate} from '../components/template/template'
import {BrowserRouter as Router, Routes, Route, Link, Navigate} from 'react-router-dom'
import CompanyPage from '../pages/company-page'
import ProfilePage from '../pages/profile-page'
import AllCompaniesPage from '../pages/companies-page'
import StudentPage from '../pages/student-page'
import EmployeesPage from '../pages/employees-page'
import CompanyApplicationPage from '../pages/application-page/company-application'

const CompanyRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/companies" replace={true} />} />
      <Route path="*" element={<CommonTemplate />}>
        <Route path="companies" element={<AllCompaniesPage />} />
        <Route path="companies/:id" element={<CompanyPage />} />
        <Route path="student/:id" element={<StudentPage />} />
        <Route path="profile" element={<ProfilePage />} />
        <Route path="application" element={<CompanyApplicationPage />} />
        <Route path="employees" element={<EmployeesPage />} />
        <Route path="*" element={<div>no such page!</div>} />
      </Route>
    </Routes>
  )
}

export default CompanyRoutes
