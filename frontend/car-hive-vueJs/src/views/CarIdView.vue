<script setup lang="ts">
import { useRoute } from 'vue-router'
import { fetchCarById } from '@/services/api'
import { ref, onMounted } from 'vue'
import type { Car } from '@/types/car'
import Spinner from '@/components/Spinner.vue'
import CarListItem from '@/components/CarListItem.vue'

const route = useRoute()
const carId = String(route.params.id)
const carIdNumber = Number(carId)
if (isNaN(carIdNumber)) {
  throw new Error('Invalid car ID')
}
if (carIdNumber <= 0) {
  throw new Error('Car ID must be a positive number')
}

const car = ref<Car | null>(null)
const loading = ref(false)
const error = ref<string | null>(null)

onMounted(() => {
  fetchCarDetails(carIdNumber)
})

async function fetchCarDetails(id: number) {
  loading.value = true
  error.value = null
  try {
    const res = await fetchCarById(id)
    if (!res || Object.keys(res).length === 0) {
      throw new Error('Car not found')
    }
    car.value = res
    loading.value = false
  } catch (err) {
    loading.value = false
    error.value = (err as Error).message
  }
}

const displayRouterName = route.matched[0].name === 'user-carId' ? 'user-cars' : ''
</script>
<template>
  <Spinner v-if="loading" />
  <div v-if="error" class="error">{{ error }}</div>
  <div class="car-details">
    <CarListItem
      v-if="car"
      :car="car"
      :displayBtnBack="true"
      routerName="user-cars"
      :routerNameOfId="displayRouterName"
    />
    <div v-else-if="!loading && !error" class="no-car">No car available</div>
  </div>
</template>
<style scoped>
.car-details {
  background-color: white;
  max-width: 1200px;
  margin: 100px auto;
  border-radius: 10px;
}
</style>
