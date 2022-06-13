import {Button, Divider, Grid, Paper, Typography} from '@mui/material'
import {useDispatch} from 'react-redux'
import {acceptUser, rejectUser} from '../../../../store/actions/whitelistAction'

const WhitelistItem = ({userDetails}) => {
  const dispatch = useDispatch()

  const onSubmit = async () => {
    const ok = await dispatch(acceptUser(userDetails.id))
  }

  const onReject = async () => {
    const ok = await dispatch(rejectUser(userDetails.id))
  }

  return (
    <>
      <Paper sx={{padding: 2, mb: 3}} variant="outlined">
        <Grid container spacing={3} alignItems="center">
          <Grid item xs={9}>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Typography variant="h6">Полное имя</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography>{userDetails.fullname}</Typography>
              </Grid>
            </Grid>
            <Divider sx={{my: 2}} />
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Typography variant="h6">Почта</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography>{userDetails.email}</Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={3}>
            <Button variant="contained" sx={{display: 'block', width: '100%', mb: 2}} onClick={onSubmit}>
              Принять
            </Button>

            <Button variant="outlined" sx={{display: 'block', width: '100%'}} onClick={onReject}>
              Отклонить
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </>
  )
}

export default WhitelistItem
