import {Box, Button, CircularProgress, Dialog, DialogContent, Grid, Slide, TextField, Typography} from '@mui/material'
import {forwardRef, useEffect, useState} from 'react'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import UploadFileIcon from '@mui/icons-material/UploadFile'
import {useDispatch} from 'react-redux'
import {editJobApplication} from '../../store/actions/jobApplicationAction'

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />
})

const EditApplicationDialog = ({isOpen, onClose, update, application}) => {
  const [isLoading, setIsLoading] = useState(false)

  const [text, setText] = useState('')
  const [filePath, setFilePath] = useState('')

  const dispatch = useDispatch()
  // const {isLoadingEditData, vacancyEditData} = useSelector(state => state.vacancy)

  useEffect(() => {
    if (isOpen) {
      setText(application.text)
      setFilePath(application.filePath)
    }
  }, [isOpen, application])

  const handleClose = () => {
    setText('')
    setFilePath('')

    onClose()
  }

  const handleSubmit = async () => {
    setIsLoading(true)
    const form = {text, filePath, vacancyId: application?.vacancy?.id, id: application?.id}
    const {ok} = await dispatch(editJobApplication(form))
    setIsLoading(false)
    if (ok) {
      update()
      handleClose()
    }
  }

  return (
    <Dialog open={isOpen} onClose={handleClose} fullWidth={true} maxWidth="sm" TransitionComponent={Transition}>
      <DialogContent>
        <Typography variant="h4">Редактирование заявки</Typography>
        <Typography variant="h5" mt={2}>
          Позиция - {application.vacancy.positionName}
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
                Загрузить файл
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
              Редактировать
            </Button>
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
  )
}

export default EditApplicationDialog
