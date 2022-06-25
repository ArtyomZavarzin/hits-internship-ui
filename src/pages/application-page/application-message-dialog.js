import {Box, Button, CircularProgress, Dialog, DialogContent, Grid, Slide, TextField, Typography} from '@mui/material'
import {forwardRef, useState} from 'react'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import {useDispatch} from 'react-redux'
import {setCompanyMessage} from '../../store/actions/jobApplicationAction'

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />
})

const ApplicationMessageDialog = ({isOpen, onClose, application}) => {
  const [isLoading, setIsLoading] = useState(false)

  const [text, setText] = useState('')

  const dispatch = useDispatch()
  // const {isLoadingEditData, vacancyEditData} = useSelector(state => state.vacancy)

  const handleClose = () => {
    setText('')

    onClose()
  }

  const handleSubmit = async () => {
    setIsLoading(true)
    const form = {text, id: application.id}
    const {ok} = await dispatch(setCompanyMessage(form))
    setIsLoading(false)
    if (ok) {
      handleClose()
    }
  }

  return (
    <Dialog open={isOpen} onClose={handleClose} fullWidth={true} maxWidth="sm" TransitionComponent={Transition}>
      <DialogContent>
        <Typography variant="h4">Сообщение к заявке</Typography>
        {/* <Typography variant="h5" mt={2}>
          Позиция - {vacancy.positionName}
        </Typography> */}
        <Grid container spacing={2} sx={{mt: 0}}>
          <Grid item xs={12}>
            <TextField
              disabled={isLoading}
              fullWidth={true}
              label="Сообщение"
              value={text}
              onChange={e => setText(e.target.value)}
              placeholder="Место встречи, контакты и прочая информация"
              multiline
              rows={5}
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
              endIcon={isLoading ? <CircularProgress size="1em" sx={{color: 'white'}} /> : <ArrowForwardIcon />}
            >
              Отправить
            </Button>
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
  )
}

export default ApplicationMessageDialog
