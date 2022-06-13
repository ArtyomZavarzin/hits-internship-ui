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
import {forwardRef, useEffect, useMemo, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import {createCompanyVacancy, editCompanyVacancy, getVacancyEditData} from '../../../store/actions/vacancyAction'
import CircularLoader from '../../../components/common-components/CircularLoader'

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />
})

const CrudVacancyDialog = ({isOpen, onClose, companyId, vacancyId, dialogAction}) => {
  const [isLoading, setIsLoading] = useState(false)

  const [positionName, setPositionName] = useState('')
  const [description, setDescription] = useState('')
  const [maxCountStudents, setMaxCountStudents] = useState(0)
  const [salary, setSalary] = useState(0)
  const [currentYear, setCurrentYear] = useState(false)

  const {isLoadingEditData, vacancyEditData} = useSelector(state => state.vacancy)

  const dispatch = useDispatch()

  useEffect(() => {
    if (isOpen && dialogAction === 'edit' && vacancyId !== null && vacancyId !== undefined) {
      dispatch(getVacancyEditData(vacancyId))
    }
  }, [dialogAction, vacancyId, isOpen])

  useEffect(() => {
    if (dialogAction === 'edit') {
      setPositionName(vacancyEditData.positionName)
      setDescription(vacancyEditData.description)
      setMaxCountStudents(vacancyEditData.maxCountStudents)
      setSalary(vacancyEditData.salary)
      setCurrentYear(vacancyEditData.currentYear)
    }
  }, [vacancyEditData, dialogAction])

  const isDisabled = useMemo(() => {
    return isLoading || (dialogAction === 'edit' && isLoadingEditData)
  }, [isLoading, isLoadingEditData, dialogAction])

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
      companyId: companyId, // не для запроса
      positionName,
      description,
      maxCountStudents: +maxCountStudents,
      salary: +salary,
      currentYear,
    }
    if (dialogAction === 'create') {
      form.id = companyId
    } else {
      form.id = vacancyId
    }
    const {ok} = await dispatch(dialogAction === 'create' ? createCompanyVacancy(form) : editCompanyVacancy(form))
    setIsLoading(false)
    if (ok) {
      handleClose()
    }
  }

  return (
    <Dialog open={isOpen} onClose={handleClose} fullWidth={true} maxWidth="sm" TransitionComponent={Transition}>
      <DialogContent>
        <Typography variant="h4">{dialogAction === 'edit' ? 'Редактирование' : 'Добавление'} вакансии</Typography>
        {dialogAction === 'edit' && isLoadingEditData ? (
          <Box sx={{height: '438px', position: 'relative'}}>
            <CircularLoader />
          </Box>
        ) : (
          <Grid container spacing={2} sx={{mt: 0}}>
            <Grid item xs={12}>
              <TextField
                disabled={isDisabled}
                fullWidth={true}
                label="Позиция"
                value={positionName}
                onChange={e => setPositionName(e.target.value)}
                placeholder="Позиция"
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                disabled={isDisabled}
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
                disabled={isDisabled}
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
                disabled={isDisabled}
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
              disabled={isDisabled}
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

export default CrudVacancyDialog
