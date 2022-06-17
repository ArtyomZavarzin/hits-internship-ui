import userCompanyService from '../../services/userCompanyService'
import getResponse from '../../utils/getResponse'
import {
  getUserCompanyMatchingError,
  getUserCompanyMatchingFetching,
  getUserCompanyMatchingSuccses,
} from '../slices/userCompanySlices'

export const getMatchingUserList = id => async dispatch => {
  try {
    dispatch(getUserCompanyMatchingFetching())
    const response = await userCompanyService.getMatchingListUser({userId: id})
    const {ok, data, errors} = getResponse(response)

    if (ok) {
      dispatch(getUserCompanyMatchingSuccses(data))
    } else {
      dispatch(getUserCompanyMatchingError(errors))
    }
  } catch (e) {}
}

export const createMatching = form => async dispatch => {
  try {
    const response = await userCompanyService.createMatching(form)
    const {ok, data, errors} = getResponse(response)

    if (ok) {
      dispatch(getMatchingUserList(form.userId))
    }
    return {ok, errors}
  } catch (e) {}
}