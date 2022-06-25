import {Button, Grid, IconButton, Paper, Typography} from '@mui/material'
import {styled} from '@mui/system'
import {userRoles} from '../../common/constants.js'
import {useAuth} from '../../hooks/use-auth.js'
import {applicationStatusColors, applicationStatuses} from './models.js'
import EditIcon from '@mui/icons-material/Edit'
import {useState} from 'react'
import EditApplicationDialog from './edit-application-modal.js'
import ApplicationMessageDialog from './application-message-dialog.js'
import EmailIcon from '@mui/icons-material/Email'
import SettingsApplicationsIcon from '@mui/icons-material/SettingsApplications'
import ApplicationStatusDialog from './application-status-dialog.js'

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

const ApplicationItem = ({applicationItem, applicationFor, updateJobApplication}) => {
  const [isOpenEditDialog, setOpenEditDialog] = useState(false)
  const [isOpenMessageDialog, setOpenMessageDialog] = useState(false)
  const [isOpenStatusDialog, setOpenStatusDialog] = useState(false)
  const {userRole} = useAuth()
  return (
    <>
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
              Статус заявки -{' '}
            </Typography>
            <Typography variant="overline" component="span" color={applicationStatusColors[applicationItem.status]}>
              {applicationStatuses[applicationItem.status]}
            </Typography>
          </Grid>
        </Grid>

        {[userRoles.admin, userRoles.company].includes(userRole) ? (
          <>
            <Grid container spacing={1} mt={-3} mb={1} justifyContent="end">
              <Grid item>
                <Button variant="outlined" onClick={() => setOpenMessageDialog(true)} endIcon={<EmailIcon />}>
                  Добавить сообщение
                </Button>
              </Grid>

              <Grid item>
                <Button
                  variant="outlined"
                  onClick={() => {
                    setOpenStatusDialog(true)
                  }}
                  endIcon={<SettingsApplicationsIcon />}
                >
                  Задать статус
                </Button>
              </Grid>
            </Grid>
            <ApplicationMessageDialog
              isOpen={isOpenMessageDialog}
              onClose={() => {
                setOpenMessageDialog(false)
              }}
              application={applicationItem}
            />
            <ApplicationStatusDialog
              isOpen={isOpenStatusDialog}
              onClose={() => {
                setOpenStatusDialog(false)
              }}
              update={updateJobApplication}
              application={applicationItem}
            />
          </>
        ) : null}

        <Grid container alignItems="center" justifyContent="space-between">
          <Grid item>
            <Typography variant="h6">Текст обращения к заявке:</Typography>
          </Grid>
          {userRole === userRoles.admin || userRole === userRoles.student ? (
            <>
              <Grid item>
                <IconButton color="primary" aria-label="edit-application" onClick={() => setOpenEditDialog(true)}>
                  <EditIcon />
                </IconButton>
              </Grid>
              <EditApplicationDialog
                isOpen={isOpenEditDialog}
                onClose={() => {
                  setOpenEditDialog(false)
                }}
                update={updateJobApplication}
                application={applicationItem}
              />
            </>
          ) : null}
        </Grid>

        <Typography sx={{flexGrow: 1, whiteSpace: 'pre-line'}} variant="body1">
          {applicationItem.text}
        </Typography>
      </StyledPaper>
    </>
  )
}

export default ApplicationItem
