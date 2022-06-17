import {createSlice} from '@reduxjs/toolkit'

const initialState = {
  isLoading: false,
  userCompanyMatching: [],
  userCompanyMatchingError: '',
}

export const userCompanySlice = createSlice({
  name: 'userCompany',
  initialState,
  reducers: {
    getUserCompanyMatchingFetching: state => {
      state.isLoading = true
    },
    getUserCompanyMatchingSuccses: (state, action) => {
      state.isLoading = false
      state.userCompanyMatching = action.payload
      state.userCompanyMatchingError = ''
    },
    getUserCompanyMatchingError: (state, action) => {
      state.isLoading = false
      state.userCompanyMatching = []
      state.userCompanyMatchingError = action.payload
    },
  },
})

export const {getUserCompanyMatchingFetching, getUserCompanyMatchingSuccses, getUserCompanyMatchingError} =
  userCompanySlice.actions

export default userCompanySlice.reducer
