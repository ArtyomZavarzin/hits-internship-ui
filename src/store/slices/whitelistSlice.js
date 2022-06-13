import {createSlice} from '@reduxjs/toolkit'

const initialState = {
  isLoading: false,
  whitelist: [],
  errors: '',
}

export const whitelistSlice = createSlice({
  name: 'whitelist',
  initialState,
  reducers: {
    getWhitelistFetching: state => {
      state.isLoading = true
    },
    getWhitelistSuccses: (state, action) => {
      state.isLoading = false
      state.whitelist = action.payload
      state.errors = ''
    },
    getWhitelistError: (state, action) => {
      state.isLoading = false
      state.whitelist = {}
      state.errors = action.payload
    },
  },
})

export const {getWhitelistFetching, getWhitelistSuccses, getWhitelistError} = whitelistSlice.actions

export default whitelistSlice.reducer
