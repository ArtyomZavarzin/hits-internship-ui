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
import {setCurrentMatching} from '../../store/actions/userCompanyAction'

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />
})

const ChangePlaceDialog = ({isOpen, onClose, places, studentId}) => {
  const [isLoading, setIsLoading] = useState(false)

  const [place, setPlace] = useState('')

  const dispatch = useDispatch()

  useEffect(() => {
    const currentPlace = places.find(el => el.isCurrent)
    currentPlace && setPlace(currentPlace.company.id)
  }, [isOpen, places])

  const handleClose = () => {
    setPlace('')

    onClose()
  }

  const handleSubmit = async () => {
    setIsLoading(true)
    const form = {userId: +studentId, companyId: +place}
    const {ok} = await dispatch(setCurrentMatching(form))
    setIsLoading(false)
    if (ok) {
      handleClose()
    }
  }

  return (
    <Dialog open={isOpen} onClose={handleClose} fullWidth={true} maxWidth="xs" TransitionComponent={Transition}>
      <DialogContent>
        <Typography variant="h4">Изменение текущего места</Typography>
        {/* <Typography variant="h5" mt={2}>
          Позиция - {vacancy.positionName}
        </Typography> */}
        <Grid container spacing={2} sx={{mt: 0}}>
          <Grid item xs={12}>
            <FormControl fullWidth>
              <InputLabel id="select-label">Текущее место</InputLabel>
              <Select
                labelId="select-label"
                id="select-label"
                value={place}
                label="Текущее место"
                onChange={e => setPlace(e.target.value)}
              >
                {places.map(el => (
                  <MenuItem key={el.company.id} value={el.company.id}>
                    {el.company.name}
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

export default ChangePlaceDialog
