import {Grid, IconButton, Paper, Typography} from '@mui/material'
import {styled} from '@mui/system'
import {userRoles} from '../../common/constants.js'
import {useAuth} from '../../hooks/use-auth.js'
import {applicationStatuses} from './models.js'
import EditIcon from '@mui/icons-material/Edit'

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

const ApplicationItem = ({applicationItem, applicationFor}) => {
  const {userRole} = useAuth()
  return (
    <StyledPaper variant="outlined">
      <Grid container justifyContent="space-between" alignItems="center" mb={3}>
        <Grid item xs={8}>
          <Typography variant="h4">
            {applicationFor === userRoles.student
              ? applicationItem.vacancy.company.name
              : applicationItem.user.fullName}
          </Typography>
        </Grid>
        <Grid item xs={4}>
          <Typography variant="h5" color="primary" textAlign="end">
            {applicationItem.vacancy.positionName}
          </Typography>
        </Grid>
        <Grid item>
          <Typography variant="overline" component="span">
            Статус заявки - {applicationStatuses[applicationItem.status]}
          </Typography>
        </Grid>
      </Grid>

      <Grid container alignItems="center" justifyContent="space-between">
        <Grid item>
          <Typography variant="h6">Текст обращения к заявке:</Typography>
        </Grid>
        {/* {userRole === userRoles.admin || userRole === userRoles.student ? (
          <Grid item>
            <IconButton color="primary" aria-label="edit-application">
              <EditIcon />
            </IconButton>
          </Grid>
        ) : null} */}
      </Grid>

      <Typography sx={{flexGrow: 1, whiteSpace: 'pre-line'}} variant="body1">
        {applicationItem.text}
      </Typography>
    </StyledPaper>
  )
}

export default ApplicationItem
