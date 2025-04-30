export interface Car {
  id: number
  immatriculation: string
  marque: string
  modele: string
  annee: string
  imageUrl: string
  color: Color
  garage: Garage
  userProfile: UserProfile
}

export interface Color {
  id: number
  color: string
}
export interface Garage {
  id: number
  nom: string
  adresse: string
  telephone: string
}
export interface UserProfile {
  id: number
  firstName: string
  lastName: string
  user: string
}
