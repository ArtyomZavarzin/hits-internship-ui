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
  } catch (e) {
    dispatch(getUserCompanyMatchingError(e))
  }
}

export const getMatchingCompanyList = id => async dispatch => {
  try {
    dispatch(getUserCompanyMatchingFetching())
    const response = await userCompanyService.getMatchingListCompany({companyId: id})
    const {ok, data, errors} = getResponse(response)

    if (ok) {
      dispatch(getUserCompanyMatchingSuccses(data))
    } else {
      dispatch(getUserCompanyMatchingError(errors))
    }
  } catch (e) {
    dispatch(getUserCompanyMatchingError(e))
  }
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

export const deleteMatching = form => async dispatch => {
  try {
    const response = await userCompanyService.deleteMatching(form)
    const {ok, data, errors} = getResponse(response)

    if (ok) {
      dispatch(getMatchingUserList(form.userId))
    }
    return {ok, errors}
  } catch (e) {}
}

export const setCurrentMatching = form => async dispatch => {
  try {
    const response = await userCompanyService.setCurrentMatching(form)
    const {ok, data, errors} = getResponse(response)

    if (ok) {
      dispatch(getMatchingUserList(form.userId))
    }
    return {ok, errors}
  } catch (e) {}
}
