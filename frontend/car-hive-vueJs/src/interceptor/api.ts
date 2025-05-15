import axios from 'axios'

const API_URL = 'http://localhost:8080'

const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Define the type for authStore
interface AuthStore {
  getToken: () => string | null
  clearAuth: () => void
}

export function setupInterceptors(authStore: AuthStore) {
  axiosInstance.interceptors.request.use(
    (config) => {
      const token = authStore.getToken()
      if (token) {
        config.headers.Authorization = `Bearer ${token}`
      }
      return config
    },
    (error) => Promise.reject(error),
  )

  axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response?.status === 401) {
        authStore.clearAuth()
      }
      return Promise.reject(error)
    },
  )
}
export default axiosInstance
