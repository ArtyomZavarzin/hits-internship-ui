import {CommonTemplate} from '../components/template/template'
import {BrowserRouter as Router, Routes, Route, Link, Navigate} from 'react-router-dom'
import CompanyPage from '../pages/company-page'
import AllCompaniesPage from '../pages/companies-page'
import AdminPanelPage from '../pages/admin-panel-page/admin-panel-page'
import StudentPage from '../pages/student-page'
import EmployeesPage from '../pages/employees-page'
import StudentApplicationPage from '../pages/application-page/student-application'
import CompanyApplicationPage from '../pages/application-page/company-application'

const AdminRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/companies" replace={true} />} />
      <Route path="*" element={<CommonTemplate />}>
        <Route path="companies" element={<AllCompaniesPage />} />
        <Route path="companies/:id" element={<CompanyPage />} />
        <Route path="student/:id" element={<StudentPage />} />
        <Route path="student-application/:id" element={<StudentApplicationPage />} />
        <Route path="company-application/:id" element={<CompanyApplicationPage />} />
        <Route path="admin-panel" element={<AdminPanelPage />} />
        <Route path="employees/:id" element={<EmployeesPage />} />
        <Route path="*" element={<div>no such page!</div>} />
      </Route>
    </Routes>
  )
}

export default AdminRoutes
