import {Button, Divider, Grid, Paper, Typography} from '@mui/material'
import {useState} from 'react'
import {useDispatch} from 'react-redux'
import {getAcceptedJobApplications} from '../../../store/actions/jobApplicationAction'
import {createMatching, setCurrentMatching} from '../../../store/actions/userCompanyAction'

const AcceptedJobApplicationItem = ({application}) => {
  const [isLoading, setIsLoading] = useState(false)
  const dispatch = useDispatch()

  const onSubmit = async () => {
    setIsLoading(true)
    if (application.hasUserCompany) {
      const form = {userId: application.user.id, companyId: application.vacancy.company.id}
      const {ok} = await dispatch(setCurrentMatching(form))
      if (ok) {
        dispatch(getAcceptedJobApplications())
      }
    } else {
      const form = {
        companyId: application.vacancy.company.id,
        userId: application.user.id,
        isCurrent: true,
      }
      const {ok} = await dispatch(createMatching(form))
      if (ok) {
        dispatch(getAcceptedJobApplications())
      }
    }
    // await dispatch(acceptReviews(commentItem.id))
    setIsLoading(false)
  }

  return (
    <>
      <Paper sx={{padding: 2, mb: 3}} variant="outlined">
        <Grid container spacing={3} alignItems="center">
          <Grid item xs={9}>
            {/* <Typography variant="h5">
              Позиция {application?.vacancy.positionName} от компании {application?.vacancy.company.name}
            </Typography>
            <Divider sx={{my: 2}} />
            <Typography variant="h5">{application?.user.fullName}</Typography> */}
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Typography variant="h6">Компания</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography>{application?.vacancy.company.name}</Typography>
              </Grid>
            </Grid>
            <Divider sx={{my: 2}} />
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Typography variant="h6">Студент</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography>{application?.user.fullName}</Typography>
              </Grid>
            </Grid>
            <Divider sx={{my: 2}} />
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Typography variant="h6">Позиция</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography>{application?.vacancy.positionName}</Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={3}>
            <Button
              variant="contained"
              sx={{display: 'block', width: '100%', mb: 2}}
              onClick={onSubmit}
              disabled={isLoading}
            >
              Одобрить
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </>
  )
}

export default AcceptedJobApplicationItem
