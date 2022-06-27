import api from '../http'

const reviewsService = {
  getCompanyReviews: companyId => api.get(`/reviews/list/${companyId}`),
  createReviews: data => api.post('/reviews/create', data),
  getPendingReviews: page => api.get('/reviews/pending', {params: page}),
  approveReviews: id => api.post(`/reviews/approve/${id}`),
  rejectReviews: id => api.post(`/reviews/reject/${id}`),
  checkOpportunityReview: id => api.get(`/reviews/canEditReviews/${id}`),
}

export default reviewsService
