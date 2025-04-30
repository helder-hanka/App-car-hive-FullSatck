import { defineStore } from 'pinia'
import { ref } from 'vue'

interface User {
  id: number
  name: string
  email: string
  role: string
}
interface AuthState {
  user: User | null
  token: string | null
}

export const useAuthStore = defineStore('auth', () => {
  const user = ref<User | null>(
    localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user') as string) : null,
  )
  const token = ref<string | null>(
    localStorage.getItem('token') ? localStorage.getItem('token') : null,
  )

  const setUser = (newUserData: User) => {
    user.value = newUserData
    localStorage.setItem('user', JSON.stringify(newUserData))
  }
  const setToken = (newToken: string) => {
    token.value = newToken
    localStorage.setItem('token', newToken)
  }

  const clearAuth = () => {
    user.value = null
    token.value = null
    localStorage.removeItem('user')
    localStorage.removeItem('token')
  }

  const isAuthenticated = () => !!token.value
  const getUser = () => user.value
  const getToken = () => token.value
  const isUser = () => user.value?.role.includes('ROLE_USER')

  return {
    getUser,
    getToken,
    isAuthenticated,
    isUser,
    clearAuth,
    setUser,
    setToken,
  }
})
