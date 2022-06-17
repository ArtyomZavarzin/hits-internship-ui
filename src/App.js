import './App.css'
import CssBaseline from '@mui/material/CssBaseline'
import {CommonTemplate} from './components/template/template'
import {BrowserRouter as Router, Routes, Route, Link, Navigate} from 'react-router-dom'
import CompanyPage from './pages/company-page'
import {useDispatch} from 'react-redux'
import SignInPage from './pages/login-page/index.js'
import SignUpPage from './pages/register-page/index.js'
import {useEffect, useState} from 'react'
import {refresh} from './store/actions/authAction'
import ProfilePage from './pages/profile-page'
import AllCompaniesPage from './pages/companies-page'
import {GlobalStyles, ThemeProvider} from '@mui/material'
import theme from './theme'
import AdminPanelPage from './pages/admin-panel-page/admin-panel-page'
import StudentPage from './pages/student-page'

function App() {
  const [loadingApp, setLoadingApp] = useState(true)
  const dispatch = useDispatch()

  useEffect(() => {
    const fething = async () => {
      setLoadingApp(true)
      const refreshToken = localStorage.getItem('refreshToken')
      if (refreshToken) {
        await dispatch(refresh(refreshToken))
      }
      setLoadingApp(false)
    }
    fething()
  }, [dispatch])

  if (loadingApp) {
    return <div></div>
  }

  return (
    <>
      <CssBaseline />
      <GlobalStyles
        styles={{
          body: {backgroundColor: '#fbfbfd'},
        }}
      />
      <Router>
        <ThemeProvider theme={theme}>
          <div className="App">
            <Routes>
              <Route path="login" element={<SignInPage />} />
              <Route path="registration" element={<SignUpPage />} />
              <Route path="/" element={<Navigate to="/companies" replace={true} />} />
              <Route path="*" element={<CommonTemplate />}>
                <Route path="companies" element={<AllCompaniesPage />} />
                <Route path="companies/:id" element={<CompanyPage />} />
                <Route path="student/:id" element={<StudentPage />} />
                <Route path="profile" element={<ProfilePage />} />
                <Route path="admin-panel" element={<AdminPanelPage />} />
                <Route path="*" element={<div>no such page!</div>} />
              </Route>
            </Routes>
          </div>
        </ThemeProvider>
      </Router>
    </>
  )
}

export default App
