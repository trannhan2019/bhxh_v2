import { useAuthStore } from '@/stores/auth'
import axios from 'axios'
import NProgress from 'nprogress'

const hostname = window.location.hostname;

const axiosClient = axios.create({
  baseURL: `http://${hostname}:5000/api`,
  headers: {
    'Content-Type': 'application/json',
  },
})

axiosClient.interceptors.request.use((config) => {
  NProgress.start()
  const token = useAuthStore.getState().auth.token
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

axiosClient.interceptors.response.use(
  (response) => {
    NProgress.done()
    return response
  },
  (error) => {
    const { setAuth } = useAuthStore.getState()
    switch (error.response.status) {
      case 401:
        setAuth({ user: null, token: null })
        window.location.href = '/login'
        break;
    
      default:
        break;
    }
    NProgress.done()
    console.log(error);
    
    return Promise.reject(error)
  }
)

export default axiosClient