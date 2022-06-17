import {
  Box,
  Button,
  Checkbox,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  Grid,
  Slide,
  TextField,
  Typography,
} from '@mui/material'
import {forwardRef, useEffect, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import CircularLoader from '../../components/common-components/CircularLoader'
import {editUserData, getUserEditData} from '../../store/actions/userAction'

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />
})

const EditProfileDialog = ({isOpen, onClose, studentId}) => {
  const [isBlock, setIsBlock] = useState(false)

  const [name, setName] = useState('')
  const [surname, setSurname] = useState('')
  const [middleName, setMiddleName] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const {isLoading, userEditData} = useSelector(state => state.user)

  const dispatch = useDispatch()

  useEffect(() => {
    if (isOpen) dispatch(getUserEditData(studentId))
  }, [studentId, isOpen])

  useEffect(() => {
    setName(userEditData.name)
    setMiddleName(userEditData.middleName)
    setSurname(userEditData.surname)
    setPhone(userEditData.phone)
    setEmail(userEditData.email)
    setPassword(userEditData.password)
  }, [userEditData])

  const handleClose = () => {
    setName('')
    setMiddleName('')
    setSurname('')
    setPhone('')
    setEmail('')
    setPassword('')

    onClose()
  }

  const handleSubmit = async () => {
    setIsBlock(true)
    const form = {
      name,
      middleName,
      surname,
      phone,
      email,
      userId: studentId,
    }

    const {ok} = await dispatch(editUserData(form))
    setIsBlock(false)
    if (ok) {
      handleClose()
    }
  }

  return (
    <Dialog open={isOpen} onClose={handleClose} fullWidth={true} maxWidth="sm" TransitionComponent={Transition}>
      <DialogContent>
        <Typography variant="h4">Редактирование профиля</Typography>
        {isLoading ? (
          <Box sx={{height: '438px', position: 'relative'}}>
            <CircularLoader />
          </Box>
        ) : (
          <Grid container spacing={2} sx={{mt: 0}}>
            <Grid item xs={12}>
              <TextField
                fullWidth={true}
                label="Name"
                value={name}
                onChange={e => setName(e.target.value)}
                placeholder="name"
                disabled={isBlock}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth={true}
                label="Surname"
                value={surname}
                onChange={e => setSurname(e.target.value)}
                placeholder="surname"
                disabled={isBlock}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth={true}
                label="Middlename"
                value={middleName}
                onChange={e => setMiddleName(e.target.value)}
                placeholder="middlename"
                disabled={isBlock}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth={true}
                label="Phone"
                value={phone}
                onChange={e => setPhone(e.target.value)}
                placeholder="phone"
                disabled={isBlock}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth={true}
                label="Email"
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="email"
                disabled={isBlock}
              />
            </Grid>
          </Grid>
        )}

        <Grid container mt={2} justifyContent="end" spacing={1}>
          <Grid item>
            <Button variant="outlined" onClick={handleClose}>
              Закрыть
            </Button>
          </Grid>
          <Grid item>
            <Button
              variant="contained"
              onClick={handleSubmit}
              disabled={isBlock || isLoading}
              endIcon={
                isLoading || isBlock ? <CircularProgress size="1em" sx={{color: 'white'}} /> : <ArrowForwardIcon />
              }
            >
              Редактировать
            </Button>
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
  )
}

export default EditProfileDialog
