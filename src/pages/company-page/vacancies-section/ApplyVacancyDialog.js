import {Box, Button, CircularProgress, Dialog, DialogContent, Grid, Slide, TextField, Typography} from '@mui/material'
import {forwardRef, useState} from 'react'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import UploadFileIcon from '@mui/icons-material/UploadFile'
import {useDispatch} from 'react-redux'
import {createJobApplication} from '../../../store/actions/jobApplicationAction'

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />
})

const ApplyVacancyDialog = ({isOpen, onClose, vacancy}) => {
  const [isLoading, setIsLoading] = useState(false)

  const [text, setText] = useState('')
  const [filePath, setFilePath] = useState('')

  const dispatch = useDispatch()
  // const {isLoadingEditData, vacancyEditData} = useSelector(state => state.vacancy)

  const handleClose = () => {
    setText('')
    setFilePath('')

    onClose()
  }

  const handleSubmit = async () => {
    setIsLoading(true)
    const form = {text, filePath, vacancyId: vacancy.id}
    const {ok} = await dispatch(createJobApplication(form))
    setIsLoading(false)
    if (ok) {
      handleClose()
    }
  }

  return (
    <Dialog open={isOpen} onClose={handleClose} fullWidth={true} maxWidth="sm" TransitionComponent={Transition}>
      <DialogContent>
        <Typography variant="h4">Создание заявки на стажировку</Typography>
        <Typography variant="h5" mt={2}>
          Позиция - {vacancy.positionName}
        </Typography>
        <Grid container spacing={2} sx={{mt: 0}}>
          <Grid item xs={12}>
            <TextField
              disabled={isLoading}
              fullWidth={true}
              label="Мотивационное обращение"
              value={text}
              onChange={e => setText(e.target.value)}
              placeholder="О себе, опыт, ссылки и другая информация, которую вы хотите указать"
              multiline
              rows={5}
            />
          </Grid>

          <Grid item xs={12} container spacing={2} alignItems="center">
            <Grid item xs="auto">
              <Button variant="contained" component="label" endIcon={<UploadFileIcon />}>
                Загрузкить файл
                <input type="file" hidden onChange={e => setFilePath(e.target.value)} />
              </Button>
            </Grid>
            <Grid item xs={true}>
              <Typography>{filePath}</Typography>
            </Grid>
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
              Создать
            </Button>
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
  )
}

export default ApplyVacancyDialog
