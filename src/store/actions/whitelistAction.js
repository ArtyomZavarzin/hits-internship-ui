import whitelistService from '../../services/whitelistService'
import getResponse from '../../utils/getResponse'
import {getWhitelistError, getWhitelistFetching, getWhitelistSuccses} from '../slices/whitelistSlice'

export const getWhitelist = page => async dispatch => {
  try {
    dispatch(getWhitelistFetching())
    const response = await whitelistService.getWhitelist({Page: page})
    const {ok, data, errors} = getResponse(response)

    if (ok) {
      dispatch(getWhitelistSuccses(data))
    } else {
      dispatch(getWhitelistError(errors))
    }
  } catch (e) {}
}

export const acceptUser = id => async dispatch => {
  try {
    const response = await whitelistService.acceptUser(id)
    const {ok, data, errors} = getResponse(response)
    if (ok) {
      dispatch(getWhitelist())
    }
    return ok
  } catch (e) {}
}

export const rejectUser = id => async dispatch => {
  try {
    const response = await whitelistService.rejectUser(id)
    const {ok, data, errors} = getResponse(response)
    if (ok) {
      dispatch(getWhitelist())
    }
    return ok
  } catch (e) {}
}
