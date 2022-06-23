import {Box, Button, Container, Grid, Paper, Typography} from '@mui/material'
import {styled} from '@mui/system'
import {useEffect, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {Link, useNavigate, useParams} from 'react-router-dom'
import {approvalStates, userRoles} from '../../common/constants.js'
import CircularLoader from '../../components/common-components/CircularLoader.js'
import {useAuth} from '../../hooks/use-auth.js'
import {getUserInfo} from '../../store/actions/userAction.js'
import EditProfileDialog from './editProfileDialog.js'
import InternshipPlaces from './internship-places.js'
import StudentInfo from './student-info.js'

const StyledPaper = styled(Paper)(({theme}) => ({
  display: 'flex',
  flexDirection: 'column',
  transition: 'all 0.15s',
  padding: theme.spacing(2),
  '&:hover': {
    backgroundColor: '#fcfcfc',
    transform: 'scale(1.025)',
  },
}))

const StudentPage = ({profileId}) => {
  const [isOwner, setIsOwner] = useState(false)
  const [id, setId] = useState(null)
  const [dialogIsOpen, setDialogIsOpen] = useState(false)

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const {id: paramsId} = useParams()

  const {userId, userRole, companyId: userCompanyId} = useAuth()
  const {isLoadingUserInfo, userInfo} = useSelector(state => state.user)

  useEffect(() => {
    let currentId = profileId ? profileId : paramsId
    setId(currentId)
    dispatch(getUserInfo(currentId))
  }, [profileId, paramsId])

  useEffect(() => {
    if (userRole === userRoles.admin || +userId === +userInfo.id) {
      setIsOwner(true)
    }
  }, [userInfo, userRole, userId])

  useEffect(() => {
    if (![null, undefined].includes(id) && +userInfo.id === +id && userInfo.role === userRoles.company) {
      navigate(`/companies/${userInfo.companyId}`)
    }
  }, [userInfo, id])

  return (
    <>
      {isLoadingUserInfo ? (
        <CircularLoader />
      ) : (
        <>
          <Typography variant="h3" sx={{textTransform: 'capitalize'}}>
            {userInfo.name} {userInfo.surname}
          </Typography>
          <Box sx={{mb: 4}}>
            <Typography variant="overline" component="span">
              Статус аккаунта -{' '}
            </Typography>
            {userInfo.approvalState === approvalStates.submited && (
              <Typography variant="overline" component="span" color="success.main">
                подтвержден
              </Typography>
            )}
            {userInfo.approvalState === approvalStates.rejected && (
              <Typography variant="overline" component="span" color="error.main">
                отклонен
              </Typography>
            )}
            {userInfo.approvalState === approvalStates.pending && (
              <Typography variant="overline" component="span" color="primary.light">
                ожидает одобрения
              </Typography>
            )}
          </Box>

          <Container maxWidth="md">
            <Grid container spacing={2} wrap="wrap" justifyContent="center">
              <Grid item xs={12}>
                <StyledPaper variant="outlined">
                  <StudentInfo isOwner={isOwner} userInfo={userInfo} />
                </StyledPaper>
              </Grid>
              {isOwner ? (
                <Grid item xs={12}>
                  <StyledPaper variant="outlined">
                    <InternshipPlaces isAdmin={userRole === userRoles.admin} userInfo={userInfo} />
                  </StyledPaper>
                </Grid>
              ) : null}
            </Grid>
            {userRole === userRoles.admin && (
              <Button sx={{mt: 2}} variant="outlined" component={Link} to={`/student-application/${id}`}>
                Открыть заявки студента
              </Button>
            )}
            {userRole === userRoles.student && isOwner && (
              <Button sx={{mt: 2}} variant="outlined" component={Link} to={`/application`}>
                Открыть мои заявки
              </Button>
            )}
          </Container>
        </>
      )}
    </>
  )
}

export default StudentPage
