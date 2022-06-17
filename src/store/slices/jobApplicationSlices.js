import {createSlice} from '@reduxjs/toolkit'

const initialState = {
  isLoadingJobApplication: false,
  jobApplication: {},
  jobApplicationError: {},

  isLoadingCompanyJobApplications: false,
  companyJobApplications: [],
  companyJobApplicatiosnError: {},

  isLoadingStudentJobApplications: false,
  studentJobApplications: [],
  studentJobApplicationsError: {},
}

export const jobApplicationSlice = createSlice({
  name: 'jobApplication',
  initialState,
  reducers: {
    getCompanyJobApplicationFetching: state => {
      state.isLoadingCompanyJobApplications = true
    },
    getCompanyJobApplicationSuccses: (state, action) => {
      state.isLoadingCompanyJobApplications = false
      state.companyJobApplications = action.payload
    },
    getCompanyJobApplicationError: (state, action) => {
      state.isLoadingCompanyJobApplications = false
      state.companyJobApplications = []
    },

    getStudentJobApplicationFetching: state => {
      state.isLoadingStudentJobApplications = true
    },
    getStudentJobApplicationSuccses: (state, action) => {
      state.isLoadingStudentJobApplications = false
      state.studentJobApplications = action.payload
    },
    getStudentJobApplicationError: (state, action) => {
      state.isLoadingStudentJobApplications = false
      state.studentJobApplications = []
    },
  },
})

export const {
  getCompanyJobApplicationFetching,
  getCompanyJobApplicationSuccses,
  getCompanyJobApplicationError,
  getStudentJobApplicationFetching,
  getStudentJobApplicationSuccses,
  getStudentJobApplicationError,
} = jobApplicationSlice.actions

export default jobApplicationSlice.reducer
