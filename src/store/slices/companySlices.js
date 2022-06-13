import {createSlice} from '@reduxjs/toolkit'

const initialState = {
  isLoading: false,
  allCompanies: [],
  company: {},
  isLoadingEditData: false,
  companyEditData: {},
}

export const userSlice = createSlice({
  name: 'company',
  initialState,
  reducers: {
    getAllCompaniesFetching: state => {
      state.isLoading = true
    },
    getAllCompaniesSuccses: (state, action) => {
      state.isLoading = false
      state.allCompanies = action.payload
    },
    getAllCompaniesError: (state, action) => {
      state.isLoading = false
      state.allCompanies = []
    },

    getCompanyFetching: state => {
      state.company = {}
      state.isLoading = true
    },
    getCompanySuccses: (state, action) => {
      state.isLoading = false
      state.company = action.payload
    },
    getCompanyError: (state, action) => {
      state.isLoading = false
      state.company = {}
    },

    getCompanyEditDataFetching: state => {
      state.companyEditData = {}
      state.isLoadingEditData = true
    },
    getCompanyEditDataSuccses: (state, action) => {
      state.isLoadingEditData = false
      state.companyEditData = action.payload
    },
    getCompanyEditDataError: (state, action) => {
      state.isLoadingEditData = false
      state.companyEditData = {}
    },
    // createCompanyFetching: state => {
    //   state.isLoading = true
    // },
    // createCompanySuccses: (state, action) => {
    //   state.isLoading = false
    //   state.company = action.payload
    // },
    // getCompanyError: (state, action) => {
    //   state.isLoading = false
    //   state.company = {}
    // },
  },
})

export const {
  getAllCompaniesFetching,
  getAllCompaniesSuccses,
  getAllCompaniesError,
  getCompanyFetching,
  getCompanySuccses,
  getCompanyError,
  getCompanyEditDataFetching,
  getCompanyEditDataSuccses,
  getCompanyEditDataError,
} = userSlice.actions

export default userSlice.reducer
