import {Button, Divider, Grid, Paper, Typography} from '@mui/material'
import {useState} from 'react'
import {useDispatch} from 'react-redux'
import CommentItem from '../../../components/comments-section/comment-item'
import {acceptReviews, rejectReviews} from '../../../store/actions/reviewsActions'

const NewReviewsItem = ({commentItem}) => {
  const [isLoading, setIsLoading] = useState(false)
  const dispatch = useDispatch()

  const onSubmit = async () => {
    setIsLoading(true)
    await dispatch(acceptReviews(commentItem.id))
    setIsLoading(false)
  }

  const onReject = async () => {
    setIsLoading(true)
    await dispatch(rejectReviews(commentItem.id))
    setIsLoading(false)
  }

  return (
    <>
      <Paper sx={{padding: 2, mb: 3}} variant="outlined">
        <Grid container spacing={3} alignItems="center">
          <Grid item xs={9}>
            <Typography variant="h6">К компании {commentItem.companyName}</Typography>
            <Divider sx={{my: 1}} />
            <CommentItem commentItem={commentItem} />
          </Grid>
          <Grid item xs={3}>
            <Button
              variant="contained"
              sx={{display: 'block', width: '100%', mb: 2}}
              onClick={onSubmit}
              disabled={isLoading}
            >
              Принять
            </Button>

            <Button variant="outlined" sx={{display: 'block', width: '100%'}} onClick={onReject} disabled={isLoading}>
              Отклонить
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </>
  )
}

export default NewReviewsItem
