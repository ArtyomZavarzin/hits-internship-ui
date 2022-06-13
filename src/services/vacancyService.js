import api from '../http'

const vacancyService = {
  getVacancyEdit: data => api.get('/vacancy/edit', {params: data}),
  editVacancy: form => api.post('/vacancy/edit', form),
  createVacancy: form => api.post('/vacancy/create', form),
  getVacancy: data => api.get('/vacancy/getVacancy', {params: data}),
  getCompanyVacancy: data => api.get('/vacancy/getCompanyVacancy', {params: data}),
}

export default vacancyService
