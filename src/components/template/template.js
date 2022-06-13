import React, {useEffect} from 'react'
import {Box} from '@mui/system'
import Header from './header/header'
import Container from '@mui/material/Container'
import {Outlet, useNavigate} from 'react-router-dom'
import {useAuth} from '../../hooks/use-auth'
import Footer from './footer'
import {approvalStates, userRoles} from '../../common/constants'
import {Typography} from '@mui/material'

export const CommonTemplate = ({children}) => {
  const {isAuth, userRole, approvalState} = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (!isAuth) {
      navigate('/login')
    }
  }, [isAuth])

  return (
    <>
      <Box sx={{minHeight: '100vh', display: 'flex', flexDirection: 'column'}}>
        <Header />
        <Container maxWidth="lg" sx={{mt: 12, flexGrow: 1, mb: 12}}>
          {userRole === userRoles.student && approvalState !== approvalStates.submited ? (
            <Typography variant="h5">
              {approvalState === approvalStates.pending
                ? 'Ваш аккаунт еще находится в стадии подтверждения модерацией'
                : 'Ваш аккаунт был отклонен модерацией, свяжитесь с деканатом'}
            </Typography>
          ) : (
            <Outlet />
          )}
        </Container>
        <Footer />
      </Box>
    </>
  )
}
