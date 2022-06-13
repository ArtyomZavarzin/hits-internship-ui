import api from '../http'

const authService = {
  login: loginData => api.post('/login', loginData),
  refresh: data => api.post('/refresh', data),
  register: registerData => api.post('/register', registerData),
  logout: () => api.delete('/logout'),
}

export default authService
