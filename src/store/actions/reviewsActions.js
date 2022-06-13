import reviewsService from '../../services/reviewsService'
import getResponse from '../../utils/getResponse'
import {getCompanyReviewsError, getCompanyReviewsFetching, getCompanyReviewsSuccses} from '../slices/reviewsSlices'

export const getCompanyReviews = id => async dispatch => {
  try {
    dispatch(getCompanyReviewsFetching())

    // await reviewsService.createReviews({
    //   text: 'gfjkfdsfh jkfdsfhks hjk',
    //   rating: 4,
    // })

    const response = await reviewsService.getCompanyReviews(id)
    const {ok, data, errors} = getResponse(response)

    if (ok) {
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
