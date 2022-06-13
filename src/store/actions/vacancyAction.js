import vacancyService from '../../services/vacancyService'
import getResponse from '../../utils/getResponse'
import {
  getCompanyVacanciesFetching,
  getCompanyVacanciesSuccses,
  getCompanyVacanciesError,
  getVacanciesEditDataFetching,
  getVacanciesEditDataError,
  getVacanciesEditDataSuccses,
} from '../slices/vacancySlices'

export const getCompanyVacancies = id => async dispatch => {
  try {
    dispatch(getCompanyVacanciesFetching())

    const response = await vacancyService.getCompanyVacancy({companyId: id})
    const {ok, data, errors} = getResponse(response)

    if (ok) {
      dispatch(getCompanyVacanciesSuccses(data))
    } else {
      dispatch(getCompanyVacanciesError(errors))
    }
  } catch (e) {}
}

export const createCompanyVacancy = form => async dispatch => {
  try {
    const response = await vacancyService.createVacancy(form)

    const {ok, data, errors} = getResponse(response)

    if (ok) {
      await dispatch(getCompanyVacancies(form.companyId))
    }

    return {ok, errors}
  } catch (e) {}
}

export const editCompanyVacancy = form => async dispatch => {
  try {
    const response = await vacancyService.editVacancy(form)

    const {ok, data, errors} = getResponse(response)

    if (ok) {
      await dispatch(getCompanyVacancies(form.companyId))
    }

    return {ok, errors}
  } catch (e) {}
}

export const getVacancyEditData = id => async dispatch => {
  try {
    dispatch(getVacanciesEditDataFetching())

    const response = await vacancyService.getVacancyEdit({id: id})
    const {ok, data, errors} = getResponse(response)

    if (ok) {
      dispatch(getVacanciesEditDataSuccses(data))
    } else {
      dispatch(getVacanciesEditDataError(errors))
    }
  } catch (e) {}
}
