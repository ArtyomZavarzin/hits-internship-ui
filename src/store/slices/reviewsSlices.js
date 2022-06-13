import {createSlice} from '@reduxjs/toolkit'

const initialState = {
  isLoading: false,
  companyReviews: [],
  companyReviewsError: '',
}

export const reviewsSlice = createSlice({
  name: 'reviews',
  initialState,
  reducers: {
    getCompanyReviewsFetching: state => {
      state.isLoading = true
    },
    getCompanyReviewsSuccses: (state, action) => {
      state.isLoading = false
      state.companyReviews = action.payload
      state.companyReviewsError = ''
    },
    getCompanyReviewsError: (state, action) => {
      state.isLoading = false
      state.companyReviews = []
      state.companyReviewsError = action.payload
    },
  },
})

export const {getCompanyReviewsFetching, getCompanyReviewsSuccses, getCompanyReviewsError} = reviewsSlice.actions

export default reviewsSlice.reducer