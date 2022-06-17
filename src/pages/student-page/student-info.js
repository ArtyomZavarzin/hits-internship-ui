import {Button, Grid, Typography} from '@mui/material'
import {useState} from 'react'
import EditProfileDialog from './editProfileDialog'

const StudentInfo = ({userInfo, isOwner}) => {
  const [dialogIsOpen, setDialogIsOpen] = useState(false)

  return (
    <>
      <Grid container mb={2} spacing={1} wrap="nowrap" alignItems="center">
        <Grid item xs={true}>
          <Typography variant="h5" color="primary">
            О студенте
          </Typography>
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
      <Grid container sx={{mt: 2}}>
        <Grid item xs={4}>
          <Typography variant="h6">ФИО</Typography>
        </Grid>
        <Grid item xs={8}>
          <Typography variant="h5" component="span">
            {userInfo.name} {userInfo.middleName} {userInfo.surname}
          </Typography>
        </Grid>
      </Grid>

      <Grid container sx={{mt: 2}}>
        <Grid item xs={4}>
          <Typography variant="h6">Курс</Typography>
        </Grid>
        <Grid item xs={8}>
          <Typography variant="h5" component="span">
            {userInfo.yearOfEducation}
          </Typography>
        </Grid>
      </Grid>

      <Grid container sx={{mt: 2}}>
        <Grid item xs={4}>
          <Typography variant="h6">Телефон</Typography>
        </Grid>
        <Grid item xs={8}>
          <Typography variant="h5" component="span">
            {userInfo.phone}
          </Typography>
        </Grid>
      </Grid>
      {isOwner ? (
        <>
          <EditProfileDialog isOpen={dialogIsOpen} onClose={() => setDialogIsOpen(false)} studentId={userInfo.id} />
        </>
      ) : null}
    </>
  )
}

export default StudentInfo
