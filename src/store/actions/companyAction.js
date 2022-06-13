import companyService from '../../services/companyService'
import userService from '../../services/userService'
import userCompanyService from '../../services/userCompanyService'
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

    // await companyService.createCompany({
    //   name: 'РОЛавы аовы 2',
    //   // description: 'sdsada da вы ываываыаыфtring',
    //   // maxStudents: 10,
    //   email: 'string@mail.ru',
    //   password: '!Fhjdsk1221string',
    // })

    // await userCompanyService.createUserCompany({userId: 5, companyId: 1, isCurrent: true})
    // await userCompanyService.getUserCompanyList({userId: 5})
    // await userService.getUserInfo({id: 5})

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
      await dispatch(getCompanyEditData(form.id))
    }

    return {ok, errors}
  } catch (e) {}
}
