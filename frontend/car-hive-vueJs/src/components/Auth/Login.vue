<script setup lang="ts">
import { ref } from 'vue'
import { MDBInput, MDBSpinner } from 'mdb-vue-ui-kit'
import { useRouter } from 'vue-router'
import { postLogin } from '@/services/auth'
import { useAuthStore } from '@/stores/authStore'

interface Credentials {
  email: string
  password: string
}
const router = useRouter()
const authStore = useAuthStore()

defineOptions({
  name: 'LoginUser',
})

if (authStore.isAuthenticated()) {
  router.push('/')
}

const credentials = ref<Credentials>({
  email: '',
  password: '',
})
const error = ref<string | null>(null)
const loading = ref(false)
const emailError = ref<string | null>(null)
const passwordError = ref<string | null>(null)

const touchEmail = ref(false)
const touchPassword = ref(false)

const handleBlurEmail = () => {
  touchEmail.value = true
}
const handleBlurPassword = () => (touchPassword.value = true)
const isValidEmail = () => {
  const email = credentials.value.email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (email === '') {
    emailError.value = "L'email est obligatoire"
    return false
  } else if (!emailRegex.test(email)) {
    emailError.value = "L'email n'est pas valide"
    return false
  }
  return true
}

const isValidPassword = () => credentials.value.password !== ''
const isValidForm = () => isValidEmail() && isValidPassword()

const handleSubmit = async (event: Event) => {
  event.preventDefault()
  loading.value = true
  error.value = null

  try {
    if (!isValidForm()) {
      error.value = 'Veuillez remplir tous les champs.'
      return
    }

    const response = await postLogin(credentials.value)

    if (response.status !== 200) {
      throw new Error('Invalid credentials')
    }
    authStore.setToken(response.data.token)
    router.push('/user-cars')
    error.value = null
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    if (err.response && err.response.status === 401) {
      error.value = 'Identifiants invalides'
    } else if (err.response && err.response.status === 403) {
      error.value = 'Accès interdit'
    } else if (err.response && err.response.status === 404) {
      error.value = 'Utilisateur non trouvé'
    } else if (err.response && err.response.status === 500) {
      error.value = 'Erreur interne du serveur'
    } else if (err.response && err.response.status === 400) {
      error.value = err ? err.response.data.error : 'Une erreur est survenue lors de la connexion.'
    } else {
      error.value = err ? err.message : 'Une erreur est survenue lors de la connexion.'
    }
  } finally {
    loading.value = false
  }
}
</script>
<template>
  <div class="login-form" :class="touchEmail || touchPassword ? 'was-validated' : undefined">
    <h1>Login</h1>
    <form @submit.prevent="handleSubmit" novalidate>
      <div class="mb-3 pb-1">
        <MDBInput
          type="email"
          id="email"
          label="E-mail"
          required
          class="mb-4 was-validated"
          v-model="credentials.email"
          @blur="handleBlurEmail"
          @input="emailError = null"
          :invalid-feedback="emailError ? emailError : 'L\'email est obligatoire'"
        />
      </div>
      <div class="mb-3 pb-1">
        <MDBInput
          type="password"
          id="password"
          label="Password"
          required
          invalid-feedback=" Le mot de passe est obligatoire "
          class="mb-4"
          v-model:model-value="credentials.password"
          @blur="handleBlurPassword"
          @input="passwordError = null"
          :invalid="touchPassword && !isValidPassword()"
        />
      </div>
      <button type="submit" class="btn btn-primary" :disabled="!isValidForm()">
        <span v-if="loading"> <MDBSpinner tag="span" grow size="sm" /> loading... </span>
        <span v-else> Se connecter </span>
      </button>
      <p class="mt-2">Pas de compte ? <router-link to="/register">S'inscrire</router-link></p>
      <div v-if="error" class="error">{{ error }}</div>
    </form>
  </div>
</template>

<style scoped lang="scss">
.login-form {
  max-width: 800px;
  margin: auto;
  text-align: center;
  margin-top: 10%;

  h1 {
    margin-bottom: 20px;
    font-size: 2rem;
    color: #343a40;
  }

  form {
    padding: 42px 24px;
    background-color: #fff;
    border-radius: 16px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  }

  .btn {
    margin-top: 10px;
    font-size: large;
    font-weight: bold;
  }
}
.error {
  color: red;
  margin-top: 10px;
}
.loading {
  color: blue;
  margin-top: 10px;
}
.success {
  color: green;
  margin-top: 10px;
}
.info {
  margin-top: 10px;
  a {
    color: blue;
    text-decoration: underline;
  }
}
.info a:hover {
  text-decoration: none;
}
.info a:visited {
  color: purple;
}
.info a:active {
  color: red;
}
.info a:focus {
  outline: none;
  box-shadow: 0 0 5px rgba(0, 0, 255, 0.5);
}
.info a:focus-visible {
  outline: 2px solid blue;
}
.info a:focus-within {
  outline: 2px solid blue;
}
.info a:focus-within-visible {
  outline: 2px solid blue;
}
input:invalid {
  border-color: red !important;
  box-shadow: 0 0 5px rgba(255, 0, 0, 0.5);
}
.btn {
  margin-top: 10px;
  font-size: large;
  font-weight: bold;
}
</style>
