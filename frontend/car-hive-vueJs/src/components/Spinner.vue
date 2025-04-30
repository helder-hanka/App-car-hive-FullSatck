<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div v-if="loading" class="spinner-container">
    <MDBSpinner grow color="primary" />
    <MDBSpinner grow color="secondary" />
    <MDBSpinner grow color="success" />
    <MDBSpinner grow color="danger" />
    <MDBSpinner grow color="warning" />
    <MDBSpinner grow color="info" />
    <MDBSpinner grow color="light" />
    <MDBSpinner grow color="dark" />
  </div>
</template>

<script setup lang="ts">
import { MDBSpinner } from 'mdb-vue-ui-kit'
import { ref } from 'vue'

const loading = ref(true) // Declare the 'loading' property as a reactive variable
</script>

<style scoped>
.spinner-container {
  text-align: center;
}
.spinner-container > * {
  margin: 0 0.5rem;
}
</style>
