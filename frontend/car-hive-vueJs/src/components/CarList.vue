<script setup lang="ts">
import CarListItem from './CarListItem.vue'
import type { Car } from '@/types/car'
import Spinner from './Spinner.vue'
import { defineProps } from 'vue'

defineProps({
  cars: {
    type: Array as () => Car[],
    required: true,
  },
  loading: {
    type: Boolean,
    default: false,
  },
  error: {
    type: String,
    default: null,
  },
  routerName: {
    type: String,
    default: '',
  },
})
</script>

<template>
  <div class="car-list">
    <Spinner v-if="loading" />
    <div v-if="error">{{ error }}</div>
    <div v-if="!loading && !error && cars.length === 0">No cars available</div>
    <div class="car-list__item" v-for="car in cars" :key="car.id">
      <CarListItem :car="car" :routerName="routerName" />
    </div>
  </div>
</template>

<style scoped>
.car-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
}
.car-list__item {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-content: flex-start;
  width: 500px;
  height: auto;
  border-radius: 10px;
  background: var(--vt-c-white);
  margin-bottom: 10px;
}
</style>
