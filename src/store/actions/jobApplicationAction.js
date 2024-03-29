import jobApplicationService from '../../services/jobApplicationService'
import getResponse from '../../utils/getResponse'
import {
  getAcceptedJobApplicationError,
  getAcceptedJobApplicationFetching,
  getAcceptedJobApplicationSuccses,
} from '../slices/jobApplicationSlices'
import {
  getCompanyJobApplicationFetching,
  getCompanyJobApplicationSuccses,
  getCompanyJobApplicationError,
  getStudentJobApplicationFetching,
  getStudentJobApplicationSuccses,
  getStudentJobApplicationError,
} from '../slices/jobApplicationSlices'

export const getCompanyJobApplication = form => async dispatch => {
  try {
    dispatch(getCompanyJobApplicationFetching())

    const response = await jobApplicationService.getCompanyJobApplication(form)
    const {ok, data, errors} = getResponse(response)

    if (ok) {
      dispatch(getCompanyJobApplicationSuccses(data))
    } else {
      dispatch(getCompanyJobApplicationError(errors))
    }
  } catch (e) {}
}

export const getStudentJobApplication = form => async dispatch => {
  try {
    dispatch(getStudentJobApplicationFetching())

    const response = await jobApplicationService.getStudentJobApplication(form)
    const {ok, data, errors} = getResponse(response)

    if (ok) {
      dispatch(getStudentJobApplicationSuccses(data))
    } else {
      dispatch(getStudentJobApplicationError(errors))
    }
  } catch (e) {}
}

export const getAcceptedJobApplications = form => async dispatch => {
  try {
    dispatch(getAcceptedJobApplicationFetching())

    const response = await jobApplicationService.getAcceptedJobApplications(form)
    const {ok, data, errors} = getResponse(response)

    if (ok) {
      dispatch(getAcceptedJobApplicationSuccses(data))
    } else {
      dispatch(getAcceptedJobApplicationError(errors))
    }
  } catch (e) {}
}

export const createJobApplication = form => async dispatch => {
  try {
    const response = await jobApplicationService.createJobApplication(form)

    const {ok, data, errors} = getResponse(response)

    // if (ok) {
    //   await dispatch(getAllCompanies())
    // }

    return {ok, errors}
  } catch (e) {}
}

export const editJobApplication = form => async dispatch => {
  try {
    const response = await jobApplicationService.editJobApplication(form)

    const {ok, data, errors} = getResponse(response)

    // if (ok) {
    //   await dispatch(getAllCompanies())
    // }

    return {ok, errors}
  } catch (e) {}
}

export const setCompanyMessage = form => async dispatch => {
  try {
    const response = await jobApplicationService.setCompanyMessage(form)

    const {ok, data, errors} = getResponse(response)

    // if (ok) {
    //   await dispatch(getAllCompanies())
    // }

    return {ok, errors}
  } catch (e) {}
}

export const setApplicationCompnanyStatus = form => async dispatch => {
  try {
    const response = await jobApplicationService.changeJobApplicationCompanyStatus(form)

    const {ok, data, errors} = getResponse(response)

    // if (ok) {
    //   await dispatch(getAllCompanies())
    // }

    return {ok, errors}
  } catch (e) {}
}

export const setApplicationStudentStatus = form => async dispatch => {
  try {
    const response = await jobApplicationService.changeJobApplicationStudentStatus(form)

    const {ok, data, errors} = getResponse(response)

    // if (ok) {
    //   await dispatch(getAllCompanies())
    // }

    return {ok, errors}
  } catch (e) {}
}

export const setApplicationPrority = form => async dispatch => {
  try {
    const response = await jobApplicationService.changeJobApplicationPriority(form)

    const {ok, data, errors} = getResponse(response)

    // if (ok) {
    //   await dispatch(getAllCompanies())
    // }

    return {ok, errors}
  } catch (e) {}
}
