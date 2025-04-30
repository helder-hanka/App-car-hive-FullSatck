<script setup lang="ts">
import router from '@/router'
import type { Car } from '@/types/car'
import { MDBBtn } from 'mdb-vue-ui-kit'
import { defineProps, computed } from 'vue'
import { deleteCar } from '@/services/car'
defineProps({
  car: {
    type: Object as () => Car,
    required: true,
  },
  displayBtnBack: {
    type: Boolean,
    default: false,
  },
  routerName: {
    type: String,
    default: '',
  },
  routerNameOfId: {
    type: String,
    default: '',
  },
})

const handleDeleteCar = async (id: number) => {
  try {
    // Vérification de l'ID de la voiture
    if (!id) {
      alert('Pas de ID')
      return
    }
    // Confirmation de la suppression
    const confirmDelete = confirm('Êtes-vous sûr de vouloir supprimer cette voiture ?')

    if (!confirmDelete) {
      return
    }
    // Suppression de la voiture
    await deleteCar(id)
    // Redirection après la suppression
    alert('Voiture supprimée avec succès')
    router.push({ name: 'user-cars' })
  } catch (error) {
    console.error('Error deleting car:', error)
    alert('Une erreur est survenue lors de la suppression')
  }
}

const handleBack = () => {
  router.back()
}

const isHomeRouter = computed(() => {
  const currentRouteName = router.currentRoute.value.name
  return currentRouteName !== 'carId' && currentRouteName !== 'user-carId'
})
</script>

<template>
  <div class="car-list__profile">
    <div class="car-list__profile-image-container">
      <img :src="car.imageUrl" :alt="car.marque" class="car-list__profile-image" />
    </div>
    <div class="car-list__profile-info">
      <p>{{ car.userProfile.firstName }}</p>
      <p>{{ car.userProfile.lastName }}</p>
    </div>
    <div class="car-list__profile-buttons">
      <MDBBtn
        v-if="displayBtnBack && routerNameOfId === 'user-cars'"
        class="car-list__profile-button"
        color="link"
        size="lg"
        rounded
        tag="a"
        :rel="`noopener noreferrer`"
        :href="`/${routerName}/${car.id}/update`"
        >Modifier</MDBBtn
      >
      <MDBBtn
        v-if="displayBtnBack && routerNameOfId === 'user-cars'"
        class="car-list__profile-button"
        color="link"
        size="lg"
        rounded
        :onclick="() => handleDeleteCar(car.id)"
        >supprimer</MDBBtn
      >
      <MDBBtn
        v-if="displayBtnBack"
        class="car-list__profile-button"
        color="link"
        size="lg"
        rounded
        :onclick="handleBack"
        >Retour</MDBBtn
      >
    </div>
  </div>
  <component
    :is="isHomeRouter ? 'a' : 'div'"
    :href="isHomeRouter ? `/${routerName}/${car.id}` : undefined"
  >
    <div>
      <img :src="car.imageUrl" :alt="car.userProfile.firstName" class="car-list__image" />
    </div>
    <div class="car-list__details">
      <div class="car-list__details-info">
        <h3>{{ car.marque }}</h3>
        <p>{{ car.modele }}</p>
        <p>{{ car.immatriculation }}</p>
        <p :style="{ backgroundColor: car.color.color }" class="color"></p>
      </div>
      <div class="car-list__details-garage">
        <h4>Garage</h4>
        <p>{{ car.garage.nom }}</p>
        <p>{{ car.garage.adresse }}</p>
        <p>{{ car.garage.telephone }}</p>
      </div>
    </div>
  </component>
  <!-- </a> -->
</template>

<style scoped>
.car-list__profile-image-container {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  overflow: hidden;
}
.car-list__profile-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.car-list__profile {
  display: flex;
  align-items: center;
}
.car-list__profile-info {
  margin-left: 1rem;
  flex: 1;
}
.car-list__profile-info p {
  margin: 0;
}
.car-list__profile-info p:first-of-type {
  font-weight: bold;
}
.car-list__profile-info p:last-of-type {
  color: #666;
}
.car-list__image {
  width: 100%;
  height: auto;
  border-radius: 8px;
}
.car-list__details,
.car-list__profile {
  padding: 10px;
}
.car-list__details h3,
.car-list__details p,
.car-list__details h4 {
  margin: 0;
}
.color {
  width: 30px;
  height: 30px;
  border-radius: 50%;
}

.car-list__details {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
a {
  padding: 0;
  color: inherit;
}

.car-list__profile-button {
  margin-left: auto;
  font-size: 20px;
  padding: 6px 29px;
  color: #749ada;
}
</style>
