import * as React from 'react'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import {Link, NavLink, useNavigate} from 'react-router-dom'
import {Grid, Container, Button, Typography, Badge} from '@mui/material'
import {makeStyles} from '@mui/material'
import {useDispatch, useSelector} from 'react-redux'
import {logout} from '../../../store/actions/authAction'
import {useAuth} from '../../../hooks/use-auth'
import HitsLogo from '../../../assets/img/Hits-logo.png'
import {approvalStates, userRoles} from '../../../common/constants'
import {styled} from '@mui/material/styles'
import PersonIcon from '@mui/icons-material/Person'
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined'

const StyledLogo = styled(Box)(({theme}) => ({
  cursor: 'default',
  display: 'flex',
  alignItems: 'center',
  '& span': {
    marginLeft: '8px',
    fontSize: '15px',
    fontWeight: 'bold',
    color: 'black',
    transition: 'all .3s',
  },
  '&:hover span': {
    textShadow: '0 0 18px rgba(0, 0, 0, 0.35)',
  },
}))

const StyledButton = styled(Button)(({theme}) => ({
  color: 'black',
  padding: '6px 12px',
  borderRadius: '20px',
  position: 'relative',
  overflow: 'hidden',
  transition: 'all 0.3s',
  '&::after': {
    content: '""',
    position: 'absolute',
    right: '14px',
    width: '0px',
    bottom: '0px',
    height: '2px',
    backgroundColor: 'black',
    transition: 'all 0.3s',
  },
  '&:hover': {
    // transform: 'translateY(-3px)',
    // transform: 'scale(1.025)',
  },
  '&:hover:not(.active)': {
    backgroundColor: 'inherit',
    '&::after': {
      width: 'calc(100% - 28px)',
    },
  },
  '&.active': {
    color: 'white',
    backgroundColor: 'black',
  },
}))

const StyledBadge = styled(Badge)(({theme}) => ({
  '& .MuiBadge-badge': {
    right: 4,
    top: 6,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: '0 4px',
    backgroundColor: 'black',
  },
}))

const Header = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const {givenName, userRole, approvalState} = useAuth()

  const handleLogout = () => {
    dispatch(logout())
  }

  const pages = {
    [userRoles.student]: (
      <>
        <StyledButton sx={{ml: 1}} component={NavLink} to={'/application'}>
          Мои заявки
        </StyledButton>
        <StyledBadge badgeContent={4}>
          <StyledButton sx={{ml: 1}} component={NavLink} to={'/notifications'}>
            Уведомления
          </StyledButton>
        </StyledBadge>
      </>
    ),
    [userRoles.company]: (
      <>
        <StyledButton sx={{ml: 1}} component={NavLink} to={'/application'}>
          Заявки на вакансии
        </StyledButton>
        <StyledButton sx={{ml: 1}} component={NavLink} to={'/employees'}>
          Стажеры
        </StyledButton>
        <StyledBadge badgeContent={4}>
          <StyledButton sx={{ml: 1}} component={NavLink} to={'/notifications'}>
            Уведомления
          </StyledButton>
        </StyledBadge>
      </>
    ),
    [userRoles.admin]: (
      <>
        <StyledButton sx={{ml: 1}} component={NavLink} to={'/admin-panel'}>
          Управление
        </StyledButton>
      </>
    ),
  }

  return (
    // <AppBar position="fixed" sx={{backgroundColor: '#f5f5f7', boxShadow: 'none'}}>
    <AppBar position="fixed" sx={{backgroundColor: '#e0e0e037', backdropFilter: 'blur(10px)', boxShadow: 'none'}}>
      <Container maxWidth="lg">
        <Toolbar disableGutters>
          <StyledLogo mr={2}>
            <img src={HitsLogo} alt="logo" style={{width: '40px'}} />
            <Typography variant="overline">Internship</Typography>
          </StyledLogo>

          {!(userRole === userRoles.student && approvalState !== approvalStates.submited) ? (
            <>
              <Box sx={{flexGrow: 1}}>
                <StyledButton component={NavLink} to={'/companies'}>
                  Компании
                </StyledButton>
                {pages[userRole]}
              </Box>

              {userRole !== userRoles.admin ? (
                <StyledButton component={NavLink} to={'/profile'} endIcon={<PersonIcon />} sx={{mr: 1}}>
                  {userRole === userRoles.student ? givenName : 'Моя компания'}
                </StyledButton>
              ) : null}
            </>
          ) : (
            <Box sx={{flexGrow: 1}} />
          )}

          <StyledButton onClick={handleLogout} endIcon={<LogoutOutlinedIcon />}>
            Выход
          </StyledButton>
        </Toolbar>
      </Container>
    </AppBar>
  )
}
export default Header
