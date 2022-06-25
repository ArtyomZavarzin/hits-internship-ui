import {Box, Button, Container, Grid, Paper, Typography} from '@mui/material'
import {styled} from '@mui/system'
import {useCallback, useEffect, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {useNavigate, useParams} from 'react-router-dom'
import {approvalStates, userRoles} from '../../common/constants.js'
import CircularLoader from '../../components/common-components/CircularLoader.js'
import {useAuth} from '../../hooks/use-auth.js'
import {getStudentJobApplication} from '../../store/actions/jobApplicationAction.js'
import ApplicationItem from './application-item.js'
import {applicationStatuses} from './models.js'

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

const StudentApplicationPage = () => {
  const [id, setId] = useState(null)
  const dispatch = useDispatch()

  const {userId, userRole} = useAuth()
  const {id: userParamsId} = useParams()
  const {isLoadingStudentJobApplications, studentJobApplications} = useSelector(state => state.jobApplication)

  useEffect(() => {
    if (userRole === userRoles.student) {
      setId(userId)
    } else if (userRole === userRoles.admin) {
      setId(userParamsId)
    }
  }, [userId, userParamsId, userRole])

  const updateJobApplication = useCallback(() => {
    id && dispatch(getStudentJobApplication({studentId: id}))
  }, [id])

  useEffect(() => {
    updateJobApplication()
  }, [updateJobApplication])

  return (
    <>
      {isLoadingStudentJobApplications ? (
        <CircularLoader />
      ) : (
        <>
          <Typography variant="h3" sx={{mb: 4}}>
            Заявки студента
          </Typography>

          <Container maxWidth="md">
            <Grid container spacing={2}>
              {studentJobApplications?.map((item, index) => (
                <Grid item xs={12} key={index}>
                  <ApplicationItem
                    applicationItem={item}
                    applicationFor={userRoles.student}
                    updateJobApplication={updateJobApplication}
                  />
                </Grid>
              ))}
            </Grid>
          </Container>
        </>
      )}
    </>
  )
}

export default StudentApplicationPage
