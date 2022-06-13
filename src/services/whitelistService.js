import api from '../http'

const whitelistService = {
  getWhitelist: page => api.get('/whitelist/list', {params: page}),
  acceptUser: id => api.post(`/whitelist/accept/${id}`),
  rejectUser: id => api.post(`/whitelist/reject/${id}`),
}

export default whitelistService
