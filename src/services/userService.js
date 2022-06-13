import api from '../http'

const userService = {
  getUserInfo: id => api.get('/user/getUserBaseInfo', {params: id}),
  getUserEdit: id => api.get('/user/edit', {params: id}),
  editUser: form => api.post('/user/edit', form),
  getAllStudents: () => api.get('/user/getAllStudents'),
  getAllUsers: page => api.get(`/user/getAllUsers`),
}

export default userService
