import api from '../http'

const userCompanyService = {
  getMatchingListUser: form => api.get(`/user-company/user-list`, {params: form}),
  getMatchingListCompany: form => api.get(`/user-company/company-list`, {params: form}),
  createMatching: form => api.post(`/user-company/create`, form),
  setCurrentMatching: form => api.post(`/user-company/set-current`, form),
  deleteMatching: form => api.post(`/user-company/delete`, form),
}

export default userCompanyService
