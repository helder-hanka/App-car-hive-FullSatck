import axiosInstance from '@/interceptor/api'
import { catchError } from './car'
import UserProfile from '@/components/UserProfile.vue'

export interface UserProfile {
  id?: number
  firstName: string
  lastName: string
}

const API_ROUTE = '/api/userProfile'

export const fecthProfileUser = async (): Promise<UserProfile> => {
  try {
    const res = await axiosInstance.get<UserProfile>(`${API_ROUTE}`)
    return res.data
  } catch (error) {
    throw catchError(error)
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const registerProfileUser = async (profile: UserProfile): Promise<any> => {
  try {
    const res = await axiosInstance.post<UserProfile>(`${API_ROUTE}`, profile)
    return res.data
  } catch (error) {
    throw catchError(error)
  }
}

export const updateProfileUser = async (id: number, profile: UserProfile): Promise<UserProfile> => {
  try {
    const res = await axiosInstance.put<UserProfile>(`${API_ROUTE}/${id}`, profile)
    return res.data
  } catch (error) {
    throw catchError(error)
  }
}
