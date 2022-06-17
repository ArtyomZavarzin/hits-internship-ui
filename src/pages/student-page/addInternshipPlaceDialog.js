import {
  Box,
  Button,
  Checkbox,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  FormControlLabel,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Slide,
  TextField,
  Typography,
} from '@mui/material'
import {forwardRef, useEffect, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import CircularLoader from '../../components/common-components/CircularLoader'
import {getAllCompanies} from '../../store/actions/companyAction'
import {createMatching} from '../../store/actions/userCompanyAction'

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />
})

const AddInternshipPlaceDialog = ({isOpen, onClose, studentId}) => {
  const [isBlock, setIsBlock] = useState(false)

  const [companyId, setCompanyId] = useState('')
  const [isCurrent, setIsCurrent] = useState(true)

  const {isLoading, allCompanies} = useSelector(state => state.company)

  const dispatch = useDispatch()

  useEffect(() => {
    if (isOpen) dispatch(getAllCompanies())
  }, [isOpen])

  const handleClose = () => {
    setCompanyId(null)
    setIsCurrent(true)

    onClose()
  }

  const handleSubmit = async () => {
    setIsBlock(true)
    const form = {
      companyId: +companyId,
      userId: +studentId,
      isCurrent: isCurrent,
    }

    const {ok} = await dispatch(createMatching(form))
    setIsBlock(false)
    if (ok) {
      handleClose()
    }
  }

  return (
    <Dialog open={isOpen} onClose={handleClose} fullWidth={true} maxWidth="sm" TransitionComponent={Transition}>
      <DialogContent>
        <Typography variant="h4">Добавление места стажировки</Typography>
        {isLoading ? (
          <Box sx={{height: '130px', position: 'relative'}}>
            <CircularLoader />
          </Box>
        ) : (
          <Grid container spacing={2} sx={{mt: 0}}>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel id="company-select-label">Компания</InputLabel>
                <Select
                  labelId="company-select-label"
                  id="company-select"
                  value={companyId}
                  label="Компания"
                  onChange={e => setCompanyId(e.target.value)}
                  disabled={isLoading}
                >
                  {allCompanies.map(item => (
                    <MenuItem key={item.id} value={item.id}>
                      {item.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12}>
              <FormControlLabel
                label="Сделать текущим местом"
                control={
                  <Checkbox disabled={isLoading} checked={isCurrent} onChange={() => setIsCurrent(!isCurrent)} />
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
              disabled={isBlock || isLoading || companyId === ''}
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

export default AddInternshipPlaceDialog
