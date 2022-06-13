import {
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  Slide,
  TextField,
  Typography,
} from '@mui/material'
import {forwardRef, useState} from 'react'
import {useDispatch} from 'react-redux'
import {useNavigate} from 'react-router-dom'
import {createCompany} from '../../store/actions/companyAction'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />
})

const AddCompanyDialog = ({isOpen, onClose}) => {
  const [isLoading, setIsLoading] = useState(false)

  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const dispatch = useDispatch()

  const handleClose = () => {
    setName('')
    setDescription('')
    setEmail('')
    setPassword('')
    onClose()
  }

  const handleSubmit = async () => {
    setIsLoading(true)
    const form = {name, description, email, password}
    const {ok} = await dispatch(createCompany(form))
    setIsLoading(false)
    if (ok) {
      handleClose()
    }
  }

  return (
    <Dialog open={isOpen} onClose={handleClose} fullWidth={true} maxWidth="sm" TransitionComponent={Transition}>
      <DialogContent>
        <Typography variant="h4">Добавление компании</Typography>
        <Grid container spacing={2} sx={{mt: 0}}>
          <Grid item xs={12}>
            <TextField
              disabled={isLoading}
              fullWidth={true}
              label="Название"
              value={name}
              onChange={e => setName(e.target.value)}
              placeholder="Название"
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              disabled={isLoading}
              fullWidth={true}
              label="Описание"
              value={description}
              onChange={e => setDescription(e.target.value)}
              placeholder="Описание компании"
              multiline
              rows={5}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              disabled={isLoading}
              fullWidth={true}
              label="Почта"
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="Почта"
              autoComplete="new-email"
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              disabled={isLoading}
              type="password"
              fullWidth={true}
              label="Пароль"
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="Пароль"
              autoComplete="new-password"
            />
          </Grid>
        </Grid>
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
              disabled={isLoading}
              // endIcon={<CircularProgress sx={{color: 'white', fontSize: '17px'}} />}
              endIcon={isLoading ? <CircularProgress size="1em" sx={{color: 'white'}} /> : <ArrowForwardIcon />}
            >
              Добавить
            </Button>
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
  )
}

export default AddCompanyDialog
