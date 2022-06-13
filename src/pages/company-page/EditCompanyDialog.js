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
import {editCompany, getCompanyEditData} from '../../store/actions/companyAction'
import CircularLoader from '../../components/common-components/CircularLoader'

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />
})

const EditCompanyDialog = ({isOpen, onClose, companyId}) => {
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')

  const [submitLoading, setSubmitLoading] = useState(false)

  const {isLoadingEditData, companyEditData} = useSelector(state => state.company)

  const dispatch = useDispatch()

  useEffect(() => {
    if (isOpen) dispatch(getCompanyEditData(companyId))
  }, [isOpen])

  useEffect(() => {
    setName(companyEditData.name)
    setDescription(companyEditData.description)
  }, [companyEditData])

  const handleClose = () => {
    setName('')
    setDescription('')

    onClose()
  }

  const onSubmit = async () => {
    setSubmitLoading(true)
    const form = {
      id: companyEditData.id,
      name,
      description,
    }
    const {ok} = await dispatch(editCompany(form))
    if (ok) {
      handleClose()
    }
    setSubmitLoading(false)
  }

  return (
    <Dialog open={isOpen} onClose={handleClose} fullWidth={true} maxWidth="sm" TransitionComponent={Transition}>
      <DialogContent>
        <Typography variant="h4">Редактирование компании</Typography>
        {isLoadingEditData ? (
          <Box sx={{height: '236px', position: 'relative'}}>
            <CircularLoader />
          </Box>
        ) : (
          <Grid container spacing={2} sx={{mt: 0}}>
            <Grid item xs={12}>
              <TextField
                disabled={isLoadingEditData || submitLoading}
                fullWidth={true}
                label="Название"
                value={name}
                onChange={e => setName(e.target.value)}
                placeholder="Название"
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                disabled={isLoadingEditData || submitLoading}
                fullWidth={true}
                label="Описание"
                value={description}
                onChange={e => setDescription(e.target.value)}
                placeholder="Описание компании"
                multiline
                rows={5}
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
              onClick={onSubmit}
              disabled={isLoadingEditData || submitLoading}
              endIcon={submitLoading ? <CircularProgress size="1em" sx={{color: 'white'}} /> : <ArrowForwardIcon />}
            >
              Редактировать
            </Button>
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
  )
}

export default EditCompanyDialog
