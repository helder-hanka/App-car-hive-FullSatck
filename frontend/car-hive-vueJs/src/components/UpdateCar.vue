<script setup lang="ts">
import { ref, onMounted, nextTick } from 'vue'
import CarForm from './CarForm.vue'
import { useRoute, useRouter } from 'vue-router'
import { fetchCarById, updateCar } from '@/services/car'
import type { Credantials } from '@/services/car'
import { MDBBtn } from 'mdb-vue-ui-kit'

const router = useRouter()
const route = useRoute()
const carId = String(route.params.id)
const carIdNumber = Number(carId)
if (isNaN(carIdNumber)) {
  throw new Error('Invalid car ID')
}
if (carIdNumber <= 0) {
  throw new Error('Car ID must be a positive number')
}
const car = ref<Credantials | null>(null)
const loading = ref(false)
const error = ref<string | null>(null)
const success = ref<string | null>(null)

const fetchCarDetails = async (id: number) => {
  loading.value = true
  error.value = null
  try {
    const res = await fetchCarById(id)
    if (!res || Object.keys(res).length === 0) {
      throw new Error('Car not found')
    }
    car.value = {
      marque: res.marque,
      modele: res.modele,
      immatriculation: res.immatriculation,
      imageUrl: res.imageUrl,
      color: res.color.color,
      annee: res.annee,
      nomGarage: res.garage.nom,
      adresseGarage: res.garage.adresse,
      telephoneGarage: res.garage.telephone,
    }
  } catch (err) {
    error.value = (err as Error).message
  } finally {
    loading.value = false
    await nextTick()
  }
}

const handleSubmit = async (updatedCarData: Credantials) => {
  // Recevoir les données mises à jour
  if (!updatedCarData) {
    error.value = 'Veuillez remplir tous les champs'
    return
  }
  loading.value = true
  error.value = null
  try {
    const res = await updateCar(updatedCarData, carIdNumber)
    success.value = res?.message || 'Voiture modifiée !'

    setTimeout(() => {
      router.push({ name: 'user-cars' })
    }, 3000)
  } catch (e: string | unknown) {
    console.log('Error: ', e)
    error.value = typeof e === 'string' ? e : 'Une erreur inconnue est survenue'
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  fetchCarDetails(carIdNumber)
})
</script>

<template>
  <div class="update-car">
    <MDBBtn
      size="lg"
      color="primary"
      outline="primary"
      rounded
      tag="a"
      :href="`/user-cars`"
      :rel="`noopener noreferrer`"
      class="car-list__profile-button back-button"
      >Retour</MDBBtn
    >
    <h1>Modifier une voiture</h1>
    <div v-if="car">
      <CarForm
        :car="car"
        :loading="loading"
        mode="edit"
        @submit="handleSubmit"
        :error="error"
        :successMessage="success"
      />
    </div>
  </div>
</template>

<style lang="scss">
.update-car,
.register-form {
  background-color: white;
  max-width: 1200px;
  margin: 100px auto;
  border-radius: 10px;
  padding: 20px;
  text-align: center;

  h1 {
    margin-bottom: 20px;
    font-size: 2rem;
    color: #343a40;
  }

  .back-button {
    float: inline-end;
  }
}
</style>
