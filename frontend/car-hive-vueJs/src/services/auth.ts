import axios, { type AxiosResponse } from 'axios'

const API_URL = 'http://localhost:8080'
const USER_URL = `${API_URL}/api/auth`
const AUTH_URL = `${USER_URL}/login`

interface User {
  email: string
  password: string
}

export const postLogin = async (user: User): Promise<AxiosResponse> => {
  return axios.post(`${AUTH_URL}`, user)
}

export const postRegister = async (user: User): Promise<AxiosResponse> => {
  return axios.post(`${USER_URL}/signup`, user)
}
