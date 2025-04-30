<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { fetchCarsUser } from '@/services/car'
import type { Car } from '@/types/car'
import CarList from '@/components/CarList.vue'

const cars = ref<Car[]>([])
const loading = ref(false)
const err = ref<string | undefined>(undefined)
onMounted(() => {
  loadCars()
})
async function loadCars() {
  loading.value = true
  err.value = undefined

  try {
    const data = await fetchCarsUser()

    if (!data || !Array.isArray(data)) {
      throw new Error('Failed to fetch cars')
    }
    cars.value = data
  } catch (error) {
    err.value = (error as Error).message
  } finally {
    loading.value = false
  }
}
</script>
<template>
  <CarList :cars="cars" :error="err" :loading="loading" routerName="user-cars" />
</template>
