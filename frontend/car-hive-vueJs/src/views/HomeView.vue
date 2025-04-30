<script setup lang="ts">
import CarList from '@/components/CarList.vue'

import type { Car } from '@/types/car'
import { fetchCars } from '@/services/api'
import { ref, onMounted } from 'vue'

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
    const data = await fetchCars()

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
  <main>
    <CarList :cars="cars" :error="err" :loading="loading" routerName="car" />
  </main>
</template>
