import axios, { AxiosInstance, AxiosError } from 'axios'
import { useAuthStore } from './store'

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'

let apiInstance: AxiosInstance

export const initializeAPI = () => {
  apiInstance = axios.create({
    baseURL: API_URL,
    headers: {
      'Content-Type': 'application/json',
    },
  })

  // Request interceptor
  apiInstance.interceptors.request.use(
    (config) => {
      const token = useAuthStore.getState().token
      if (token) {
        config.headers.Authorization = `Bearer ${token}`
      }
      return config
    },
    (error) => Promise.reject(error)
  )

  // Response interceptor
  apiInstance.interceptors.response.use(
    (response) => response,
    (error: AxiosError) => {
      if (error.response?.status === 401) {
        useAuthStore.getState().logout()
        window.location.href = '/auth/login'
      }
      return Promise.reject(error)
    }
  )

  return apiInstance
}

export const getAPI = () => {
  if (!apiInstance) {
    return initializeAPI()
  }
  return apiInstance
}

export default getAPI
