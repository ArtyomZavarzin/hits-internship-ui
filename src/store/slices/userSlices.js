import {createSlice} from '@reduxjs/toolkit'

const initialState = {
  isLoading: false,
  userEditData: {},
  userEditError: '',
  allStudents: [],
  allStudentsError: '',
  allUsers: [],
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
  },
})

export const {
  getUserEditFetching,
  getUserEditSuccses,
  getUserEditError,
  getAllStudentsFetching,
  getAllStudentsSuccses,
  getAllStudentsError,
} = userSlice.actions

export default userSlice.reducer
