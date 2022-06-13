import {createSlice} from '@reduxjs/toolkit'

const initialState = {
  isLoading: false,
  userId: '',
  givenName: '',
  userData: {},
  error: '',
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    authFetching: state => {
      state.isLoading = true
    },
    authFetchingSuccess: (state, action) => {
      state.isLoading = false
      state.userId = action.payload.id
      state.givenName = action.payload.givenName
      state.error = ''
    },
    authFetchingError: (state, action) => {
      state.isLoading = false
      state.userId = ''
      state.error = action.payload
    },
    setUser: (state, action) => {
      state.userData = action.payload
    },

    logoutFetching: state => {
      state.isLoading = true
    },
    logoutFetchingSuccess: (state, action) => {
      state.isLoading = false
      state.userId = ''
      state.givenName = ''
      state.userData = {}
      state.error = ''
    },
    logoutFetchingError: (state, action) => {
      state.isLoading = false
      state.userId = ''
      state.error = action.payload
    },
  },
})

export const {
  authFetching,
  authFetchingSuccess,
  authFetchingError,
  setUser,
  logoutFetching,
  logoutFetchingSuccess,
  logoutFetchingError,
} = authSlice.actions

export default authSlice.reducer
