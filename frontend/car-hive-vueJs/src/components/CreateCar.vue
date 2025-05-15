<script setup lang="ts">
import { ref } from 'vue'
import { postCar } from '@/services/car'
import type { Credantials } from '@/services/car'

import CarForm from '@/components/CarForm.vue'

const car = ref<Credantials>({
  marque: '',
  modele: '',
  immatriculation: '',
  imageUrl: '',
  color: '',
  annee: '',
  nomGarage: '',
  adresseGarage: '',
  telephoneGarage: '',
})

const error = ref<string | null>(null)
const loading = ref(false)
const success = ref<string | null>(null)

const handleSubmit = async (car: Credantials) => {
  if (!car) {
    error.value = 'Veuillez remplir tous les champs'
    return
  }

  loading.value = true
  error.value = null
  try {
    const res = await postCar(car)
    success.value = res?.message || 'Voiture enregistrée !'
    Object.keys(car).forEach((k) => (car[k as keyof Credantials] = ''))
  } catch (e: string | unknown) {
    error.value = typeof e === 'string' ? e : 'Une erreur inconnue est survenue'
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="register-form">
    <h1>Ajouter une voiture</h1>
    <CarForm
      v-model="car"
      :loading="loading"
      mode="create"
      @submit="handleSubmit"
      :error="error"
      :successMessage="success"
    />
  </div>
</template>

<style scoped lang="scss">
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
  // .input-error {
  //   text-align: left;
  //   color: red;
  //   font-size: 0.9rem;
  //   margin-top: 5px;
  //   padding-left: 5px;
  // }

  // .is-invalid {
  //   border: 1px solid red !important;
  // }
}
// .error {
//   color: red;
//   margin-top: 10px;
// }
// .loading {
//   color: blue;
//   margin-top: 10px;
// }
// .success {
//   color: green;
//   margin-top: 10px;
// }
// .info {
//   margin-top: 10px;
//   a {
//     color: blue;
//     text-decoration: underline;
//   }
// }
</style>
