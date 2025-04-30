<!-- eslint-disable @typescript-eslint/no-explicit-any -->
<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { MDBInput, MDBSpinner } from 'mdb-vue-ui-kit'

import { useAuthStore } from '@/stores/authStore'
import { postRegister } from '@/services/auth'

interface Credentials {
  email: string
  password: string
  confirmPassword: string
  role: string
}

const router = useRouter()
const authStore = useAuthStore()

const credentials = ref<Credentials>({
  email: '',
  password: '',
  confirmPassword: '',
  role: '',
})

const error = ref<string | null>(null)
const loading = ref(false)

const emailError = ref<string | null>(null)
const passwordError = ref<string | null>(null)
const confirmPasswordError = ref<string | null>(null)
const roleError = ref<string | null>(null)
const successMessage = ref<string | null>(null)

const touchEmail = ref(false)
const touchPassword = ref(false)
const touchConfirmPassword = ref(false)
const touchRole = ref(false)

const handleBlurEmail = () => {
  touchEmail.value = true
  validateEmail()
}
const handleBlurPassword = () => {
  touchPassword.value = true
  validatePassword()
}
const handleBlurConfirmPassword = () => {
  touchConfirmPassword.value = true
  validateConfirmPassword()
}

const validateEmail = () => {
  const email = credentials.value.email
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!email) {
    emailError.value = "L'email est obligatoire"
    return false
  } else if (!regex.test(email)) {
    emailError.value = "L'email n'est pas valide"
    return false
  }
  emailError.value = null
  return true
}

const validatePassword = () => {
  if (!credentials.value.password) {
    passwordError.value = 'Le mot de passe est obligatoire'
    return false
  }
  passwordError.value = null
  return true
}

const validateConfirmPassword = () => {
  const { password, confirmPassword } = credentials.value
  if (!confirmPassword) {
    confirmPasswordError.value = 'La confirmation est obligatoire'
    return false
  }
  if (password !== confirmPassword) {
    confirmPasswordError.value = 'Les mots de passe ne correspondent pas'
    return false
  }
  confirmPasswordError.value = null
  return true
}

const handleBlurRole = () => {
  touchRole.value = true
  if (!credentials.value.role) {
    roleError.value = 'Le rôle est obligatoire'
    return false
  } else if (!['USER', 'ADMIN'].includes(credentials.value.role)) {
    roleError.value = 'Rôle invalide'
    return false
  } else if (credentials.value.role === '') {
    roleError.value = 'Le rôle est obligatoire'
    return false
  }
  roleError.value = null
  return true
}

const isValidForm = () =>
  validateEmail() && validatePassword() && validateConfirmPassword() && handleBlurRole()

const handleSubmit = async (event: Event) => {
  event.preventDefault()
  loading.value = true
  error.value = null

  touchEmail.value = true
  touchPassword.value = true
  touchConfirmPassword.value = true

  if (!isValidForm()) {
    error.value = 'Veuillez remplir tous les champs correctement'
    loading.value = false
    return
  }

  try {
    const response = await postRegister(credentials.value)

    if (response.status === 201 || response.status === 200) {
      successMessage.value = response?.data?.message
        ? response.data.message
        : 'Inscription réussie !'

      setTimeout(() => {
        router.push('/login')
      }, 2000)
    } else {
      error.value = "Erreur lors de l'inscription"
    }
  } catch (err: any) {
    if (err.response) {
      switch (err.response.status) {
        case 400:
          error.value = err.response.data.error || 'Erreur de requête'
          break
        case 401:
          error.value = 'Identifiants invalides'
          break
        case 403:
          error.value = 'Accès interdit'
          break
        case 404:
          error.value = 'Utilisateur non trouvé'
          break
        case 500:
          error.value = 'Erreur interne du serveur'
          break
        default:
          error.value = err.message || 'Erreur inconnue'
      }
    }
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  if (authStore.isAuthenticated()) {
    router.push('/')
  }
})
</script>

<template>
  <div class="register-form">
    <h1>Inscription</h1>
    <form @submit="handleSubmit" novalidate class="register-form">
      <div class="mb-3 pb-1">
        <MDBInput
          type="email"
          id="email"
          label="E-mail"
          required
          v-model="credentials.email"
          @blur="handleBlurEmail"
          @input="emailError = null"
          :class="{ 'is-invalid': touchEmail && emailError }"
        />
        <div v-if="touchEmail && emailError" class="input-error">{{ emailError }}</div>
      </div>
      <div class="mb-3 pb-1">
        <MDBInput
          type="password"
          id="password"
          label="Mot de passe"
          required
          v-model="credentials.password"
          @blur="handleBlurPassword"
          @input="passwordError = null"
          :class="{ 'is-invalid': touchPassword && passwordError }"
        />
        <div v-if="touchPassword && passwordError" class="input-error">{{ passwordError }}</div>
      </div>
      <div class="mb-3 pb-1">
        <MDBInput
          type="password"
          id="confirmPassword"
          label="Confirmation du mot de passe"
          required
          v-model="credentials.confirmPassword"
          @blur="handleBlurConfirmPassword"
          @input="confirmPasswordError = null"
          :class="{ 'is-invalid': touchConfirmPassword && confirmPasswordError }"
        />
        <div v-if="touchConfirmPassword && confirmPasswordError" class="input-error">
          {{ confirmPasswordError }}
        </div>
      </div>

      <div class="mb-3 pb-1">
        <label for="role" class="form-label"></label>
        <select
          id="role"
          class="form-select"
          v-model="credentials.role"
          required
          @blur="handleBlurRole"
          :class="{ 'is-invalid': touchRole && roleError }"
        >
          <option disabled value="">Choisissez un rôle</option>
          <option value="USER">Utilisateur</option>
          <option value="ADMIN">Administrateur</option>
        </select>
        <div v-if="touchRole && roleError" class="input-error">{{ roleError }}</div>
      </div>

      <button
        type="submit"
        class="btn btn-primary"
        :disabled="loading || !isValidForm() || successMessage ? true : false"
      >
        <span v-if="loading"><MDBSpinner tag="span" grow size="sm" /> Chargement...</span>
        <span v-else>S'inscrire</span>
      </button>

      <p class="mt-2">
        Vous avez déjà un compte ?
        <router-link to="/login">Se connecter</router-link>
      </p>
      <div v-if="error" class="error">{{ error }}</div>
      <div v-if="successMessage" class="success-message">{{ successMessage }}</div>
    </form>
  </div>
</template>

<style scoped lang="scss">
.register-form {
  max-width: 800px;
  margin: 10% auto;
  text-align: center;

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

  .input-error {
    text-align: left;
    color: red;
    font-size: 0.9rem;
    margin-top: 5px;
    padding-left: 5px;
  }

  .is-invalid {
    border: 1px solid red !important;
  }
}

.error {
  color: red;
  margin-top: 10px;
}
.success-message {
  color: green;
  margin-top: 10px;
}
</style>
