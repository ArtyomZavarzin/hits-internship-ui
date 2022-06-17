import authService from '../../services/authService'
import userService from '../../services/userService'
import getResponse from '../../utils/getResponse'
import {
  authFetching,
  authFetchingSuccess,
  authFetchingError,
  setUser,
  logoutFetching,
  logoutFetchingSuccess,
  logoutFetchingError,
} from '../slices/authSlices'

export const getMe = id => async dispatch => {
  try {
    const response = await userService.getUserInfo({id: id})
    const {ok, data, errors} = getResponse(response)

    if (ok) {
      await dispatch(setUser(data))
    } else {
      dispatch(authFetchingError(errors[0].value))
    }
    return ok
  } catch (e) {
    // console.log(e)
    // dispatch(authFetchingError(e.message))
  }
}

export const login = loginData => async dispatch => {
  try {
    dispatch(authFetching())
    const response = await authService.login(loginData)
    const {ok, data, errors} = getResponse(response)

    if (ok) {
      localStorage.setItem('token', data.accessToken)
      localStorage.setItem('refreshToken', data.refreshToken)

      await dispatch(getMe(data.id))
      dispatch(authFetchingSuccess(data))
    } else {
      dispatch(authFetchingError(errors[0].value))
    }
    return ok
  } catch (e) {
    // console.log(e)
    dispatch(authFetchingError(e.message))
  }
}

export const refresh = token => async dispatch => {
  try {
    const response = await authService.refresh({refreshToken: token})
    const {ok, data, errors} = getResponse(response)

    if (ok) {
      localStorage.setItem('token', data.accessToken)
      localStorage.setItem('refreshToken', data.refreshToken)

      await dispatch(getMe(data.id))
      dispatch(authFetchingSuccess(data))
    }
    return ok
  } catch (e) {
    // console.log(e)
    dispatch(authFetchingError(e.message))
  }
}

export const register = form => async dispatch => {
  try {
    dispatch(authFetching())
    const response = await authService.register(form)
    const {ok, data, errors} = getResponse(response)
    if (ok) {
      await dispatch(authFetchingSuccess(data))
    } else {
      dispatch(authFetchingError(errors[0].value))
    }
    return ok
  } catch (e) {
    dispatch(authFetchingError(e.message))
  }
}

export const logout = () => async dispatch => {
  try {
    dispatch(logoutFetching())
    const response = await authService.logout()
    const {ok, data, errors} = getResponse(response)
    if (ok) {
      localStorage.setItem('token', data.accessToken)
      localStorage.setItem('refreshToken', data.refreshToken)
      await dispatch(logoutFetchingSuccess(data))
    } else {
      dispatch(logoutFetchingError(errors[0].value))
    }
    return ok
  } catch (e) {
    dispatch(logoutFetchingError(e.message))
  }
}

// export const register = registerData => async dispatch => {
//   try {
//     dispatch(authFetching())
//     const response = await authService.login(loginData)
//     dispatch(authFetchingSuccess(response.data))
//   } catch (e) {
//     dispatch(authFetchingError(e.message))
//   }
// }
