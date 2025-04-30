import axios from 'axios'
import type { Car } from '../types/car'

const API_URL = 'http://localhost:8080'

export const fetchCars = async (): Promise<Car[]> => {
  try {
    const response = await axios.get<Car[]>(`${API_URL}/voiture/public`)
    return response.data
  } catch (error) {
    console.error('Error fetching cars:', error)
    throw error
  }
}
export const fetchCarById = async (id: number): Promise<Car> => {
  try {
    const response = await axios.get<Car>(`${API_URL}/voiture/public/${id}`)
    return response.data
  } catch (error) {
    console.error(`Error fetching car with id ${id}:`, error)
    throw error
  }
}
