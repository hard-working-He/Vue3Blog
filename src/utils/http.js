import axios from 'axios'
import { clearToken, getToken } from './token'
import { history } from './history'

const http = axios.create({
  baseURL: 'http://geek.itheima.net/v1_0',
  timeout:5000
})

http.interceptors.request.use(
  (config) => {
    const token = getToken()
    if (token) {
      config.headers.Authorization=`Bearer ${token}`
    }
    return config

  },
  error=>Promise.reject(error)
)
http.interceptors.response.use(
  response => {
    return response
  }
  , error => {
    if (error.response.status === 401) {
      clearToken()
      history.push('./login')
    }
    return Promise.reject(error)
  }
)
export {http}