import api from '../http'

const userCompanyService = {
  getUserCompanyList: userId => api.get(`/user-company/list`, {params: userId}),
  createUserCompany: form => api.post(`/user-company/create`, form),
  setCurrentUserCompany: form => api.post(`/user-company/set-current`, form),
  deleteUserCompany: form => api.post(`/user-company/delete`, form),
}

export default userCompanyService
