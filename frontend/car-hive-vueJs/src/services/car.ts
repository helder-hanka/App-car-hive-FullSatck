/* eslint-disable @typescript-eslint/no-explicit-any */
import axiosInstance from '@/interceptor/api'
import type { Car } from '@/types/car'

const API_ROUTE = '/api/user'
export interface Credantials {
  marque: string
  modele: string
  immatriculation: string
  imageUrl: string
  color: string
  annee: string
  nomGarage: string
  adresseGarage: string
  telephoneGarage: string
}

export const fetchCarsUser = async (): Promise<Car[]> => {
  try {
    const response = await axiosInstance.get<Car[]>(`${API_ROUTE}/cars`)
    return response.data
  } catch (err: any) {
    throw catchError(err)
  }
}

export const postCar = async (car: Credantials): Promise<any> => {
  try {
    const response = await axiosInstance.post<Car>(`voiture/create`, car)
    return response.data
  } catch (err: any) {
    throw catchError(err)
  }
}
export const updateCar = async (car: Credantials, id: number): Promise<any> => {
  try {
    const response = await axiosInstance.put<Car>(`/voiture/${id}`, car)
    return response.data
  } catch (err: any) {
    throw catchError(err)
  }
}
export const deleteCar = async (id: number): Promise<any> => {
  try {
    const response = await axiosInstance.delete<Car>(`/voiture/${id}`)
    return response.data
  } catch (err: any) {
    throw catchError(err)
  }
}
export const fetchCarById = async (id: number): Promise<Car> => {
  try {
    const response = await axiosInstance.get<Car>(`/voiture/public/${id}`)
    return response.data
  } catch (err: any) {
    throw catchError(err)
  }
}

export const catchError = (err: any) => {
  if (err.response) {
    switch (err.response.status) {
      case 400:
        return err.response.data.error || 'Bad Request'
      case 401:
        return err.response.data.error || 'Identifiants invalides'
      case 403:
        return err.response.data.error || 'Accès interdit'
      case 404:
        return err.response.data.error || 'Utilisateur non trouvé'
      case 500:
        return err.response.data.error || 'Erreur interne du serveur'
      default:
        return err.response.data.error || 'Une erreur est survenue lors de la connexion.'
    }
  }
}
