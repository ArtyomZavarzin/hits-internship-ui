import companyService from '../../services/companyService'
import getResponse from '../../utils/getResponse'
import {
  getAllCompaniesError,
  getAllCompaniesFetching,
  getAllCompaniesSuccses,
  getCompanyFetching,
  getCompanySuccses,
  getCompanyError,
  getCompanyEditDataFetching,
  getCompanyEditDataSuccses,
  getCompanyEditDataError,
} from '../slices/companySlices'

export const getAllCompanies = () => async dispatch => {
  try {
    dispatch(getAllCompaniesFetching())

    const response = await companyService.getAllCompanies()
    const {ok, data, errors} = getResponse(response)

    if (ok) {
      dispatch(getAllCompaniesSuccses(data))
    } else {
      dispatch(getAllCompaniesError(errors))
    }
  } catch (e) {}
}

export const getCompany = id => async dispatch => {
  try {
    dispatch(getCompanyFetching())

    const response = await companyService.getCompany({id: id})
    const {ok, data, errors} = getResponse(response)

    if (ok) {
      dispatch(getCompanySuccses(data))
    } else {
      dispatch(getCompanyError(errors))
    }
  } catch (e) {}
}

export const getCompanyEditData = id => async dispatch => {
  try {
    dispatch(getCompanyEditDataFetching())

    const response = await companyService.getCompanyEdit({id: id})
    const {ok, data, errors} = getResponse(response)

    if (ok) {
      dispatch(getCompanyEditDataSuccses(data))
    } else {
      dispatch(getCompanyEditDataError(errors))
    }
  } catch (e) {}
}

export const createCompany = form => async dispatch => {
  try {
    const response = await companyService.createCompany(form)

    const {ok, data, errors} = getResponse(response)

    if (ok) {
      await dispatch(getAllCompanies())
    }

    return {ok, errors}
  } catch (e) {}
}

export const editCompany = form => async dispatch => {
  try {
    const response = await companyService.editCompany(form)

    const {ok, data, errors} = getResponse(response)

    if (ok) {
      await dispatch(getCompany(form.id))
    }

    return {ok, errors}
  } catch (e) {}
}

export const deleteCompany = id => async dispatch => {
  try {
    const response = await companyService.deleteCompany({id: id})

    const {ok, data, errors} = getResponse(response)

    return {ok, errors}
  } catch (e) {}
}
