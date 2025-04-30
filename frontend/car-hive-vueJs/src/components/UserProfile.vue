<script setup lang="ts">
import { MDBInput, MDBSpinner, MDBBtn } from 'mdb-vue-ui-kit'
import { fecthProfileUser, updateProfileUser, registerProfileUser } from '@/services/profile'

import { ref, onMounted } from 'vue'

const loading = ref(false)
const error = ref<string | null>(null)
const success = ref<string | null>(null)
const firstNameError = ref<string | null>(null)
const lastNameError = ref<string | null>(null)
const isRegisterProfile = ref(false)

const touchFirstName = ref(false)
const touchLastName = ref(false)

interface User {
  id?: number
  firstName: string
  lastName: string
}
const user = ref<User>({
  id: undefined,
  firstName: '',
  lastName: '',
})

const handleBlurName = () => {
  touchFirstName.value = true
  isValidFirstName()
}
const handleBlurLastName = () => {
  touchLastName.value = true
  isValidLastName()
}

const isValidFirstName = () => {
  const firstName = user.value.firstName
  if (firstName === '') {
    firstNameError.value = 'Nom requis'
    return false
  } else if (firstName.length < 2) {
    firstNameError.value = 'Le nom doit comporter au moins 2 caractères'
    return false
  }
  return true
}
const isValidLastName = () => {
  const lastName = user.value.lastName
  if (lastName === '') {
    lastNameError.value = 'Prénom requis'
    return false
  } else if (lastName.length < 2) {
    lastNameError.value = 'Le prénom doit comporter au moins 2 caractères'
    return false
  }
  return true
}
const isValidForm = () => isValidFirstName() && isValidLastName()

const handleSubmit = async (event: Event) => {
  event.preventDefault()
  loading.value = true
  try {
    if (!isValidForm()) {
      error.value = 'Veuillez remplir tous les champs'
    }
    let res

    if (isRegisterProfile.value) {
      if (user.value.id !== undefined) {
        res = await updateProfileUser(user.value.id, user.value)
      } else {
        throw new Error('User ID is undefined')
      }
    } else {
      res = await registerProfileUser(user.value)
    }
    success.value = res.message ? res.message : 'Profil mis à jour avec succès'
  } catch (error) {
    alert((error as Error).message)
  } finally {
    loading.value = false
  }
}

const getProfile = async () => {
  loading.value = true
  error.value = null
  try {
    const res = await fecthProfileUser()
    isRegisterProfile.value = true
    user.value = res
  } catch (err) {
    error.value = (err as Error).message
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  getProfile()
})
</script>
<template>
  <h1 class="text-center text-3xl font-bold mb-4">Mon Profil</h1>

  <form @submit="handleSubmit" class="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md">
    <div class="mb-3 pb-2">
      <MDBInput
        label="Nom"
        type="text"
        v-model="user.firstName"
        class="mb-3"
        :invalid-feedback="firstNameError ? firstNameError : undefined"
        @blur="handleBlurName"
        @input="firstNameError = null"
        required
        :class="{ 'is-invalid': touchFirstName && firstNameError }"
      />
    </div>
    <div class="mb-3 pb-1">
      <MDBInput
        label="Prénom"
        type="text"
        v-model="user.lastName"
        class="mb-3, mt-8"
        :invalid-feedback="lastNameError ? lastNameError : undefined"
        @blur="handleBlurLastName"
        @input="lastNameError = null"
        required
        :class="{ 'is-invalid': touchLastName && lastNameError }"
      />
    </div>
    <MDBBtn type="submit" color="primary" :disabled="!isValidForm()">
      <MDBSpinner v-if="loading" tag="span" grow size="sm" />
      {{ loading ? 'Chargement...' : isRegisterProfile ? 'Mettre à jour' : 'Enregistrer' }}
    </MDBBtn>
    <div v-if="error" class="error">{{ error }}</div>
    <div v-if="success" class="success">{{ success }}</div>
  </form>
</template>

<style lang="scss">
form {
  border-radius: 10px;
  padding: 20px;
  text-align: center;
}

.error {
  color: red;
  margin-top: 10px;
}
.success {
  color: green;
  margin-top: 10px;
}
</style>
