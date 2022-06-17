import api from '../http'

const companyService = {
  getCompanyEdit: data => api.get('/company/edit', {params: data}),
  editCompany: form => api.post('/company/edit', form),
  createCompany: form => api.post('/company/create', form),
  deleteCompany: form => api.post('/company/delete', form),
  getCompany: data => api.get('/company/getCompany', {params: data}),
  getCompanies: data => api.get('/company/getCompanies', {params: data}),
  getAllCompanies: data => api.get('/company/getAllCompanies', {params: data}),
}

export default companyService
