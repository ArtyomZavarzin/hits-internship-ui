import {
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogContent,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Slide,
  TextField,
  Typography,
} from '@mui/material'
import {forwardRef, useEffect, useState} from 'react'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import {useDispatch} from 'react-redux'
import {setApplicationStatus} from '../../store/actions/jobApplicationAction'
import {applicationStatuses} from './models'

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />
})

const ApplicationStatusDialog = ({isOpen, onClose, update, application}) => {
  const [isLoading, setIsLoading] = useState(false)

  const [status, setStatus] = useState('')

  const dispatch = useDispatch()

  useEffect(() => {
    setStatus(application.status)
  }, [isOpen, application])

  const handleClose = () => {
    setStatus('')

    onClose()
  }

  const handleSubmit = async () => {
    setIsLoading(true)
    const form = {status: +status, id: application.id}
    const {ok} = await dispatch(setApplicationStatus(form))
    setIsLoading(false)
    if (ok) {
      update()
      handleClose()
    }
  }

  return (
    <Dialog open={isOpen} onClose={handleClose} fullWidth={true} maxWidth="xs" TransitionComponent={Transition}>
      <DialogContent>
        <Typography variant="h4">Изменение статуса</Typography>
        {/* <Typography variant="h5" mt={2}>
          Позиция - {vacancy.positionName}
        </Typography> */}
        <Grid container spacing={2} sx={{mt: 0}}>
          <Grid item xs={12}>
            <FormControl fullWidth>
              <InputLabel id="select-label">Статус</InputLabel>
              <Select
                labelId="select-label"
                id="select-label"
                value={status}
                label="Статус"
                onChange={e => setStatus(e.target.value)}
              >
                {Object.keys(applicationStatuses).map(key => (
                  <MenuItem key={key} value={key}>
                    {applicationStatuses[key]}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
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
              endIcon={isLoading ? <CircularProgress size="1em" sx={{color: 'white'}} /> : <ArrowForwardIcon />}
            >
              Подтвердить
            </Button>
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
  )
}

export default ApplicationStatusDialog
