import {Box, Button, Container, Grid, Paper, Typography} from '@mui/material'
import {styled} from '@mui/system'
import {useEffect, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {useNavigate, useParams} from 'react-router-dom'
import {approvalStates, userRoles} from '../../common/constants.js'
import CircularLoader from '../../components/common-components/CircularLoader.js'
import {useAuth} from '../../hooks/use-auth.js'
import {getCompanyJobApplication, getStudentJobApplication} from '../../store/actions/jobApplicationAction.js'
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

const CompanyApplicationPage = () => {
  const [id, setId] = useState(null)
  const dispatch = useDispatch()

  const {companyId, userRole} = useAuth()
  const {id: useParamsId} = useParams()
  const {isLoadingStudentJobApplications, companyJobApplications} = useSelector(state => state.jobApplication)

  useEffect(() => {
    if (userRole === userRoles.company) {
      setId(companyId)
    } else if (userRole === userRoles.admin) {
      setId(useParamsId)
    }
  }, [companyId, useParamsId, userRole])

  useEffect(() => {
    id && dispatch(getCompanyJobApplication({companyId: id}))
  }, [id])

  return (
    <>
      {isLoadingStudentJobApplications ? (
        <CircularLoader />
      ) : (
        <>
          <Typography variant="h3" sx={{mb: 4}}>
            Заявки на вакансии
          </Typography>

          <Container maxWidth="md">
            <Grid container spacing={2}>
              {companyJobApplications?.map((item, index) => (
                <Grid item xs={12} key={index}>
                  <ApplicationItem applicationItem={item} applicationFor={userRoles.company} />
                </Grid>
              ))}
            </Grid>
          </Container>
        </>
      )}
    </>
  )
}

export default CompanyApplicationPage
