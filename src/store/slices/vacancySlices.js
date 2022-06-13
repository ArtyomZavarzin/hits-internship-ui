import {createSlice} from '@reduxjs/toolkit'

const initialState = {
  isLoading: false,
  companyVacancies: [],
  companyVacanciesError: {},
  isLoadingEditData: false,
  vacancyEditData: {},
  vacancyEditDataEror: {},
}

export const vacancySlice = createSlice({
  name: 'vacancy',
  initialState,
  reducers: {
    getCompanyVacanciesFetching: state => {
      state.isLoading = true
    },
    getCompanyVacanciesSuccses: (state, action) => {
      state.isLoading = false
      state.companyVacancies = action.payload
      state.companyVacanciesError = ''
    },
    getCompanyVacanciesError: (state, action) => {
      state.isLoading = false
      state.companyVacancies = []
      state.companyVacanciesError = action.payload
    },

    getVacanciesEditDataFetching: state => {
      state.isLoadingEditData = true
    },
    getVacanciesEditDataSuccses: (state, action) => {
      state.isLoadingEditData = false
      state.vacancyEditData = action.payload
      state.vacancyEditDataEror = ''
    },
    getVacanciesEditDataError: (state, action) => {
      state.isLoadingEditData = false
      state.vacancyEditData = {}
      state.vacancyEditDataEror = action.payload
    },
  },
})

export const {
  getCompanyVacanciesFetching,
  getCompanyVacanciesSuccses,
  getCompanyVacanciesError,
  getVacanciesEditDataFetching,
  getVacanciesEditDataSuccses,
  getVacanciesEditDataError,
} = vacancySlice.actions

export default vacancySlice.reducer
