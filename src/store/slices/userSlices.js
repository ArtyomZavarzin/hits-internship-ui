import {createSlice} from '@reduxjs/toolkit'

const initialState = {
  isLoading: false,
  userEditData: {},
  userEditError: '',
  allStudents: [],
  allStudentsError: '',
  allUsers: [],
  isLoadingUserInfo: false,
  userInfo: {},
  userInfoError: '',
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    getUserEditFetching: state => {
      state.isLoading = true
    },
    getUserEditSuccses: (state, action) => {
      state.isLoading = false
      state.userEditData = action.payload
      state.userEditError = ''
    },
    getUserEditError: (state, action) => {
      state.isLoading = false
      state.userEditData = {}
      state.userEditError = action.payload
    },

    getAllStudentsFetching: state => {
      state.isLoading = true
    },
    getAllStudentsSuccses: (state, action) => {
      state.isLoading = false
      state.allStudents = action.payload
      state.allStudentsError = ''
    },
    getAllStudentsError: (state, action) => {
      state.isLoading = false
      state.allStudents = []
      state.allStudentsError = action.payload
    },

    getUserInfoFetching: state => {
      state.isLoadingUserInfo = true
    },
    getUserInfoSuccses: (state, action) => {
      state.isLoadingUserInfo = false
      state.userInfo = action.payload
      state.userInfoError = ''
    },
    getUserInfoError: (state, action) => {
      state.isLoadingUserInfo = false
      state.userInfo = {}
      state.userInfoError = action.payload
    },
  },
})

export const {
  getUserEditFetching,
  getUserEditSuccses,
  getUserEditError,
  getAllStudentsFetching,
  getAllStudentsSuccses,
  getAllStudentsError,
  getUserInfoFetching,
  getUserInfoSuccses,
  getUserInfoError,
} = userSlice.actions

export default userSlice.reducer
