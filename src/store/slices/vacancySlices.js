import {createSlice} from '@reduxjs/toolkit'

const initialState = {
  isLoading: false,
  companyVacancies: [],
  companyVacanciesError: {},
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
  },
})

export const {getCompanyVacanciesFetching, getCompanyVacanciesSuccses, getCompanyVacanciesError} = vacancySlice.actions

export default vacancySlice.reducer
