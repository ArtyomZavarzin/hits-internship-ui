import {Button, Grid, IconButton, MobileStepper, Rating, TextField, Typography} from '@mui/material'
import LoadingButton from '@mui/lab/LoadingButton'
import {Box} from '@mui/system'
import {useState} from 'react'
import NavigateNextIcon from '@mui/icons-material/NavigateNext'
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore'
import DoneIcon from '@mui/icons-material/Done'
import {useDispatch} from 'react-redux'
import {createCompanyReviews} from '../../../store/actions/reviewsActions'

const NewComment = ({onCancel, companyId}) => {
  const [commentText, setCommentText] = useState('')
  const [rating, setRating] = useState(3)
  const [isLoading, setIsLoading] = useState(false)

  const dispatch = useDispatch()

  const handleCancel = () => {
    setCommentText('')
    setRating(3)
    onCancel()
  }

  const handleSubmit = async () => {
    setIsLoading(true)
    const form = {text: commentText, rating, companyId}
    const {ok} = await dispatch(createCompanyReviews(form))
    setIsLoading(false)
    if (ok) {
      handleCancel()
    }
  }

  return (
    <Box
      sx={{
        p: 2,
        position: 'absolute',
        left: '0',
        right: '0',
        top: '0',
        bottom: '0',
        display: 'flex',
        flexDirection: 'column',
        backdropFilter: 'blur(10px)',
        bgcolor: '#ffffffaa',
        justifyContent: 'center',
      }}
    >
      <Typography variant="subtitle2">Отзыв появится на сайте после одобрения модерацией</Typography>
      <TextField
        size="small"
        label="Ваш отзыв"
        multiline
        rows={4}
        maxRows={8}
        value={commentText}
        onChange={e => setCommentText(e.target.value)}
        variant="filled"
        sx={{mt: 1}}
        fullWidth
      />
      <Grid container justifyContent="space-between" alignItems="center" sx={{mt: 3}}>
        <Grid item>
          <Typography>Ваша оценка</Typography>
        </Grid>
        <Grid item>
          <Rating
            name="simple-controlled"
            value={rating}
            onChange={(event, newValue) => {
              setRating(newValue)
            }}
            sx={{verticalAlign: 'middle'}}
          />
        </Grid>
      </Grid>
      <Grid container justifyContent="space-between" sx={{mt: 3}}>
        <Grid item>
          <Button size="small" variant="outlined" startIcon={<NavigateBeforeIcon />} onClick={handleCancel}>
            Назад
          </Button>
        </Grid>
        <Grid item>
          <LoadingButton
            size="small"
            variant="contained"
            endIcon={<DoneIcon />}
            onClick={handleSubmit}
            loading={isLoading}
            loadingPosition="end"
          >
            Отправить
          </LoadingButton>
        </Grid>
      </Grid>
      {/* <MobileStepper
        variant="dots"
        steps={2}
        position="static"
        activeStep={activeStep}
        sx={{justifyContent: 'space-around', mt: 1, bgcolor: 'transparent'}}
        nextButton={
          <Button onClick={() => setActiveStep(1)} disabled={activeStep === 1} endIcon={<NavigateNextIcon />}>
            Далее
          </Button>
        }
        backButton={
          <Button onClick={() => setActiveStep(0)} disabled={activeStep === 0} startIcon={<NavigateBeforeIcon />}>
            Назад
          </Button>
        } */}
    </Box>
  )
}

export default NewComment
