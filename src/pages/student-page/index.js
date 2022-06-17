import {Box, Button, Grid, Typography} from '@mui/material'
import {useEffect, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {useNavigate, useParams} from 'react-router-dom'
import {approvalStates, userRoles} from '../../common/constants.js'
import CircularLoader from '../../components/common-components/CircularLoader.js'
import {useAuth} from '../../hooks/use-auth.js'
import {getUserInfo} from '../../store/actions/userAction.js'
import EditProfileDialog from './editProfileDialog.js'

const StudentPage = ({profileId}) => {
  const [isOwner, setIsOwner] = useState(false)
  const [id, setId] = useState(false)
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
          <Grid container spacing={4}>
            <Grid item xs={12}>
              <Grid container mb={5} spacing={1} wrap="nowrap" alignItems="center">
                <Grid item xs={true}>
                  <Typography variant="h3" sx={{textTransform: 'capitalize'}}>
                    {userInfo.name} {userInfo.surname}
                  </Typography>
                  <Box>
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
                </Grid>
                <Grid item>
                  {isOwner ? (
                    <>
                      <Button sx={{mt: 1}} variant="outlined" onClick={() => setDialogIsOpen(true)}>
                        Редактировать
                      </Button>
                    </>
                  ) : null}
                </Grid>
              </Grid>

              <Grid container spacing={3} wrap="nowrap" alignItems="center" justifyContent="space-around">
                <Grid item xs="auto" sx={{bgcolor: '#f5f5f7', padding: 2, borderRadius: '10px'}}>
                  <Typography variant="h5" component="span">
                    Полное имя -{' '}
                  </Typography>
                  <Typography variant="h5" component="span">
                    {userInfo.name} {userInfo.middleName} {userInfo.surname}
                  </Typography>
                </Grid>
                <Grid item xs="auto" sx={{bgcolor: '#f5f5f7', padding: 2, borderRadius: '10px'}}>
                  <Typography variant="h5" component="span">
                    Телефон -{' '}
                  </Typography>
                  <Typography variant="h5" component="span">
                    {userInfo.phone ?? 'не указан'}
                  </Typography>
                </Grid>
              </Grid>

              {/* <Typography variant="body1" sx={{whiteSpace: 'pre-line'}}>
                {company.description}
              </Typography> */}
            </Grid>
            {/* <Grid item xs={4}>
              <CommentsSection companyId={[null, undefined].includes(companyId) ? paramsId : companyId} />
            </Grid> */}
          </Grid>
          {/* <VacanciesSection companyId={[null, undefined].includes(companyId) ? paramsId : companyId} /> */}
        </>
      )}
      {isOwner ? (
        <>
          <EditProfileDialog isOpen={dialogIsOpen} onClose={() => setDialogIsOpen(false)} studentId={id} />
        </>
      ) : null}
    </>
  )
}

export default StudentPage
