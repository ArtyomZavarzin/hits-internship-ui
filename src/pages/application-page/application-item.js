import {Accordion, AccordionDetails, AccordionSummary, Button, Grid, IconButton, Paper, Typography} from '@mui/material'
import {styled} from '@mui/system'
import {applicationStates, userRoles} from '../../common/constants.js'
import {useAuth} from '../../hooks/use-auth.js'
import {applicationStatusColors, applicationStatuses, applicationStudentStatuses} from './models.js'
import EditIcon from '@mui/icons-material/Edit'
import {useState} from 'react'
import EditApplicationDialog from './edit-application-modal.js'
import ApplicationMessageDialog from './application-message-dialog.js'
import EmailIcon from '@mui/icons-material/Email'
import SettingsApplicationsIcon from '@mui/icons-material/SettingsApplications'
import ApplicationStatusDialog from './application-status-dialog.js'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import OfferResponseDialog from './offer-responce-dialog.js'
import ApplicationStudentStatusDialog from './application-student-status-dialog.js'
import PersonIcon from '@mui/icons-material/Person'

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
  const [isOpenStudentStatusDialog, setOpenStudentStatusDialog] = useState(false)
  const [isOfferResponseDialog, setOfferResponseDialog] = useState(false)
  const [offerResponse, setOfferResponse] = useState('')
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
            {applicationItem.companyStatus === applicationStates.submited &&
            applicationItem.studentStatus !== applicationStates.pending ? (
              <Typography
                variant="overline"
                component="span"
                color={applicationStatusColors[applicationItem.studentStatus]}
              >
                {applicationStudentStatuses[applicationItem.studentStatus]}
              </Typography>
            ) : (
              <Typography
                variant="overline"
                component="span"
                color={applicationStatusColors[applicationItem.companyStatus]}
              >
                {applicationStatuses[applicationItem.companyStatus]}
              </Typography>
            )}
          </Grid>
        </Grid>

        {[userRoles.admin, userRoles.company].includes(userRole) ? (
          <>
            <Grid container spacing={1} mt={-3} mb={1} justifyContent="end">
              <Grid item>
                <Button variant="outlined" onClick={() => setOpenMessageDialog(true)} endIcon={<EmailIcon />}>
                  Сообщение к заявке
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

              {userRole === userRoles.admin ? (
                <>
                  <Grid item>
                    <Button
                      variant="outlined"
                      onClick={() => {
                        setOpenStudentStatusDialog(true)
                      }}
                      endIcon={<PersonIcon />}
                    >
                      Задать ответ студента
                    </Button>
                  </Grid>
                  <ApplicationStudentStatusDialog
                    isOpen={isOpenStudentStatusDialog}
                    onClose={() => {
                      setOpenStudentStatusDialog(false)
                    }}
                    update={updateJobApplication}
                    application={applicationItem}
                  />
                </>
              ) : null}
            </Grid>
            <ApplicationMessageDialog
              isOpen={isOpenMessageDialog}
              onClose={() => {
                setOpenMessageDialog(false)
              }}
              application={applicationItem}
              update={updateJobApplication}
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
        <div>
          {applicationItem.companyMessage && (
            <Accordion
              defaultExpanded={userRole === userRoles.student}
              // variant="outlined"
            >
              <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="message-content" id="message-header">
                <Typography variant="h5">Сообщение от компании</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography sx={{flexGrow: 1, whiteSpace: 'pre-line'}} variant="body1">
                  {applicationItem.companyMessage}
                </Typography>
              </AccordionDetails>
            </Accordion>
          )}

          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="details-content" id="details-header">
              <Typography variant="h5">Детали заявки</Typography>
            </AccordionSummary>
            <AccordionDetails>
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
            </AccordionDetails>
          </Accordion>
        </div>
        {userRole === userRoles.student &&
        applicationItem.companyStatus === applicationStates.submited &&
        applicationItem.studentStatus === applicationStates.pending ? (
          <>
            <Grid container spacing={2} justifyContent="end" mt={0}>
              <Grid item>
                <Button
                  color="error"
                  variant="outlined"
                  onClick={() => {
                    setOfferResponse('reject')
                    setOfferResponseDialog(true)
                  }}
                >
                  Отклонить предложение
                </Button>
              </Grid>
              <Grid item>
                <Button
                  color="success"
                  variant="outlined"
                  onClick={() => {
                    setOfferResponse('submit')
                    setOfferResponseDialog(true)
                  }}
                >
                  Принять предложение
                </Button>
              </Grid>
            </Grid>
            <OfferResponseDialog
              isOpen={isOfferResponseDialog}
              onClose={() => {
                setOfferResponseDialog(false)
              }}
              update={updateJobApplication}
              application={applicationItem}
              actionType={offerResponse}
            />
          </>
        ) : null}
      </StyledPaper>
    </>
  )
}

export default ApplicationItem
