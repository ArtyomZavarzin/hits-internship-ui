import {createSlice} from '@reduxjs/toolkit'

const initialState = {
  isLoading: false,
  companyReviews: [],
  companyReviewsError: '',

  newReviews: [],
  newReviewsError: '',

  isLoadingOpportunityReview: false,
  opportunityReview: false,
  opportunityReviewError: '',
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

    getNewReviewsFetching: state => {
      state.isLoading = true
    },
    getNewReviewsSuccses: (state, action) => {
      state.isLoading = false
      state.newReviews = action.payload
      state.newReviewsError = ''
    },
    getNewReviewsError: (state, action) => {
      state.isLoading = false
      state.newReviews = []
      state.newReviewsError = action.payload
    },

    getOpportunityReviewFetching: state => {
      state.isLoadingOpportunityReview = true
    },
    getOpportunityReviewSuccses: (state, action) => {
      state.isLoadingOpportunityReview = false
      state.opportunityReview = action.payload
      state.opportunityReviewError = ''
    },
    getOpportunityReviewError: (state, action) => {
      state.isLoadingOpportunityReview = false
      state.opportunityReview = false
      state.opportunityReviewError = action.payload
    },
  },
})

export const {
  getCompanyReviewsFetching,
  getCompanyReviewsSuccses,
  getCompanyReviewsError,
  getNewReviewsFetching,
  getNewReviewsSuccses,
  getNewReviewsError,
  getOpportunityReviewFetching,
  getOpportunityReviewSuccses,
  getOpportunityReviewError,
} = reviewsSlice.actions

export default reviewsSlice.reducer
