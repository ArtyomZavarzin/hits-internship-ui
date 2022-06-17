import axios from 'axios'

export const API_URL = 'https://localhost:5001/'

const api = axios.create({
  baseURL: API_URL,
})

api.interceptors.request.use(config => {
  config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`
  return config
})

api.interceptors.response.use(
  config => {
    return config
  },
  async error => {
    const originalRequest = error.config
    if (error.response.status === 401 && !error.config.isRetry) {
      originalRequest.isRetry = true
      try {
        const refreshToken = localStorage.getItem('refreshToken')
        if (refreshToken) {
          const response = await axios.get(`${API_URL}refresh`, {withCredentials: true})
          localStorage.setItem('token', response.data.accessToken)
          return api.request(originalRequest)
        }
      } catch (e) {}
    }
  }
)

export default api
