import {BrowserRouter as Router, Routes, Route, Link, Navigate} from 'react-router-dom'
import SignInPage from '../pages/login-page/index.js'
import SignUpPage from '../pages/register-page/index.js'

const GuestRoutes = () => {
  return (
    <Routes>
      <Route path="login" element={<SignInPage />} />
      <Route path="registration" element={<SignUpPage />} />
      <Route path="*" element={<Navigate to="/login" replace={true} />} />
    </Routes>
  )
}

export default GuestRoutes
