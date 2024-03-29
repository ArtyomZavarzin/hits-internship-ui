import reviewsService from '../../services/reviewsService'
import getResponse from '../../utils/getResponse'
import {
  getCompanyReviewsError,
  getCompanyReviewsFetching,
  getCompanyReviewsSuccses,
  getNewReviewsError,
  getNewReviewsFetching,
  getNewReviewsSuccses,
  getOpportunityReviewError,
  getOpportunityReviewFetching,
  getOpportunityReviewSuccses,
} from '../slices/reviewsSlices'

export const checkOpportunityReview = id => async dispatch => {
  try {
    dispatch(getOpportunityReviewFetching())
    const response = await reviewsService.checkOpportunityReview(id)
    const {ok, data, errors} = getResponse(response)

    if (ok) {
      dispatch(getOpportunityReviewSuccses(data))
    } else {
      dispatch(getOpportunityReviewError(errors))
    }
  } catch (e) {}
}

export const getCompanyReviews = id => async dispatch => {
  try {
    dispatch(getCompanyReviewsFetching())

    const response = await reviewsService.getCompanyReviews(id)
    const {ok, data, errors} = getResponse(response)

    if (ok) {
      dispatch(checkOpportunityReview(id))
      dispatch(getCompanyReviewsSuccses(data))
    } else {
      dispatch(getCompanyReviewsError(errors))
    }
  } catch (e) {}
}

export const createCompanyReviews = form => async dispatch => {
  try {
    const response = await reviewsService.createReviews(form)

    const {ok, data, errors} = getResponse(response)

    if (ok) {
      await dispatch(getCompanyReviews(form.companyId))
    }

    return {ok, errors}
  } catch (e) {}
}

export const getNewReviews = () => async dispatch => {
  try {
    dispatch(getNewReviewsFetching())

    // await reviewsService.createReviews({
    //   text: 'gfjkfdsfh jkfdsfhks hjk',
    //   rating: 4,
    // })

    const response = await reviewsService.getPendingReviews()
    const {ok, data, errors} = getResponse(response)

    if (ok) {
      dispatch(getNewReviewsSuccses(data))
    } else {
      dispatch(getNewReviewsError(errors))
    }
  } catch (e) {}
}

export const acceptReviews = id => async dispatch => {
  try {
    const response = await reviewsService.approveReviews(id)
    const {ok, data, errors} = getResponse(response)
    if (ok) {
      dispatch(getNewReviews())
    }
    return ok
  } catch (e) {}
}

export const rejectReviews = id => async dispatch => {
  try {
    const response = await reviewsService.rejectReviews(id)
    const {ok, data, errors} = getResponse(response)
    if (ok) {
      dispatch(getNewReviews())
    }
    return ok
  } catch (e) {}
}
