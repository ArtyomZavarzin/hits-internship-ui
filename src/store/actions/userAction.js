import userService from '../../services/userService'
import getResponse from '../../utils/getResponse'
import {
  getUserEditFetching,
  getUserEditSuccses,
  getUserEditError,
  getAllStudentsFetching,
  getAllStudentsSuccses,
} from '../slices/userSlices'

export const getUserEditData = id => async dispatch => {
  try {
    dispatch(getUserEditFetching())
    const response = await userService.getUserEdit({id: id})
    const {ok, data, errors} = getResponse(response)

    if (ok) {
      dispatch(getUserEditSuccses(data))
    } else {
      dispatch(getUserEditError(errors))
    }
  } catch (e) {}
}

export const getAllStudents = () => async dispatch => {
  try {
    dispatch(getAllStudentsFetching())
    const response = await userService.getAllStudents()
    const {ok, data, errors} = getResponse(response)

    if (ok) {
      dispatch(getAllStudentsSuccses(data))
    } else {
      dispatch(getAllStudentsFetching(errors))
    }
  } catch (e) {}
}
