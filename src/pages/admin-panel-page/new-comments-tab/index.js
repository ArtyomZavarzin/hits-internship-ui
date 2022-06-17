import {Grid, Typography} from '@mui/material'
import {useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import NewReviewsItem from './new-rewiews-item.js'
import CircularLoader from '../../../components/common-components/CircularLoader.js'
import {getNewReviews} from '../../../store/actions/reviewsActions.js'

const NewCommentsTab = () => {
  const dispatch = useDispatch()
  const {isLoading, newReviews} = useSelector(state => state.reviews)

  useEffect(() => {
    dispatch(getNewReviews())
  }, [dispatch])

  if (isLoading) {
    return <CircularLoader />
  }

  return (
    <>
      {newReviews?.map(item => (
        <NewReviewsItem commentItem={item} />
      ))}
    </>
  )
}

export default NewCommentsTab
