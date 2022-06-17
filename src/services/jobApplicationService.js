import api from '../http'

const jobApplicationService = {
  createJobApplication: data => api.post('/jobApplication/create', data),
  getEditJobApplication: data => api.get('/jobApplication/edit', {params: data}),
  editJobApplication: data => api.post('/jobApplication/edit', data),
  getJobApplication: data => api.get('/jobApplication/getJobApplication', {params: data}),
  getCompanyJobApplication: data => api.get('/jobApplication/getCompanyJobApplication', {params: data}),
  getStudentJobApplication: data => api.get('/jobApplication/getSudentJobApplication', {params: data}),
  changeJobApplicationStatus: data => api.post('/jobApplication/changeJobApplicationStatus', data),
  setCompanyMessage: data => api.post('/jobApplication/setCompanyMessage', data),
  changeJobApplicationPriority: data => api.post('/jobApplication/changeJobApplicationPriority', data),
}

export default jobApplicationService