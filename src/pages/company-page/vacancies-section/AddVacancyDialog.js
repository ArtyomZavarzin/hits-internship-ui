import {
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
import {forwardRef, useState} from 'react'
import {useDispatch} from 'react-redux'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import {createCompanyVacancy} from '../../../store/actions/vacancyAction'

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />
})

const AddVacancyDialog = ({isOpen, onClose, companyId}) => {
  const [isLoading, setIsLoading] = useState(false)

  const [positionName, setPositionName] = useState('')
  const [description, setDescription] = useState('')
  const [maxCountStudents, setMaxCountStudents] = useState(0)
  const [salary, setSalary] = useState(0)
  const [currentYear, setCurrentYear] = useState(false)

  const dispatch = useDispatch()

  const handleClose = () => {
    setPositionName('')
    setDescription('')
    setMaxCountStudents('')
    setSalary('')
    setCurrentYear(false)
    onClose()
  }

  const handleSubmit = async () => {
    setIsLoading(true)
    const form = {
      positionName,
      description,
      maxCountStudents: +maxCountStudents,
      salary: +salary,
      currentYear,
      id: companyId,
    }
    const {ok} = await dispatch(createCompanyVacancy(form))
    setIsLoading(false)
    if (ok) {
      handleClose()
    }
  }

  return (
    <Dialog open={isOpen} onClose={handleClose} fullWidth={true} maxWidth="sm" TransitionComponent={Transition}>
      <DialogContent>
        <Typography variant="h4">Добавление вакансии</Typography>
        <Grid container spacing={2} sx={{mt: 0}}>
          <Grid item xs={12}>
            <TextField
              disabled={isLoading}
              fullWidth={true}
              label="Позиция"
              value={positionName}
              onChange={e => setPositionName(e.target.value)}
              placeholder="Позиция"
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              disabled={isLoading}
              fullWidth={true}
              label="Описание"
              value={description}
              onChange={e => setDescription(e.target.value)}
              placeholder="Описание вакансии, стек технологий"
              multiline
              rows={5}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              disabled={isLoading}
              fullWidth={true}
              label="Количство студентов"
              type="number"
              value={maxCountStudents}
              onChange={e => setMaxCountStudents(e.target.value)}
              placeholder="Количство студентов"
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              disabled={isLoading}
              type="number"
              InputProps={{inputProps: {min: 0}}}
              fullWidth={true}
              label="Зарплата"
              value={salary}
              onChange={e => setSalary(e.target.value)}
              placeholder="Зарплата"
            />
          </Grid>

          <Grid item xs={12}>
            <FormControlLabel
              label="Текущий год"
              control={
                <Checkbox disabled={isLoading} checked={currentYear} onChange={() => setCurrentYear(!currentYear)} />
              }
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
              Добавить
            </Button>
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
  )
}

export default AddVacancyDialog
