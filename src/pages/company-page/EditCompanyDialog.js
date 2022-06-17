import {
  Box,
  Button,
  Checkbox,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
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
import DeleteIcon from '@mui/icons-material/Delete'
import {deleteCompany, editCompany, getCompanyEditData} from '../../store/actions/companyAction'
import CircularLoader from '../../components/common-components/CircularLoader'
import {useNavigate} from 'react-router-dom'

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />
})

const EditCompanyDialog = ({isOpen, onClose, companyId, isAdmin}) => {
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)

  const [name, setName] = useState('')
  const [description, setDescription] = useState('')

  const [submitLoading, setSubmitLoading] = useState(false)

  const {isLoadingEditData, companyEditData} = useSelector(state => state.company)

  const dispatch = useDispatch()
  const navigate = useNavigate()

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

  const onDelete = async () => {
    setIsDeleteDialogOpen(false)
    setSubmitLoading(true)
    const {ok} = await dispatch(deleteCompany(companyEditData.id))
    if (ok) {
      navigate('/companies')
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
          {isAdmin && (
            <>
              <Grid item>
                <Button
                  variant="contained"
                  color="error"
                  disabled={isLoadingEditData || submitLoading}
                  onClick={() => setIsDeleteDialogOpen(true)}
                  endIcon={<DeleteIcon />}
                >
                  Удалить
                </Button>
              </Grid>
              <Dialog
                open={isDeleteDialogOpen}
                onClose={() => setIsDeleteDialogOpen(false)}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
              >
                <DialogTitle id="alert-dialog-title">Подтвереждение удаления</DialogTitle>
                <DialogContent>
                  <DialogContentText id="alert-dialog-description">
                    Удалить компанию? Действеие нельзя будет отменить.
                  </DialogContentText>
                </DialogContent>
                <DialogActions>
                  <Button onClick={() => setIsDeleteDialogOpen(false)}>Назад</Button>
                  <Button onClick={onDelete} autoFocus>
                    Подтвердить
                  </Button>
                </DialogActions>
              </Dialog>
            </>
          )}
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
