<script setup lang="ts">
import { ref, watch } from 'vue'
import { MDBInput, MDBSpinner } from 'mdb-vue-ui-kit'
import type { Credantials } from '@/services/car'

defineProps<{
  loading: boolean
  error: string | null
  successMessage: string | null
  mode?: 'create' | 'edit'
}>()
const emit = defineEmits<{
  (e: 'submit', payload: Credantials): void
}>()

const modelValue = defineModel<Credantials>('car')

const credentials = ref<Credantials>({
  marque: '',
  modele: '',
  immatriculation: '',
  imageUrl: '',
  color: '#000000',
  annee: '',
  nomGarage: '',
  adresseGarage: '',
  telephoneGarage: '',
  ...modelValue?.value,
})

watch(
  () => modelValue.value,
  (newValue) => {
    credentials.value = newValue
      ? { ...newValue }
      : {
          marque: '',
          modele: '',
          immatriculation: '',
          imageUrl: '',
          color: '#000000',
          annee: '',
          nomGarage: '',
          adresseGarage: '',
          telephoneGarage: '',
        }
  },
  { immediate: true },
)

const immatriculationError = ref<string | null>(null)
const marqueError = ref<string | null>(null)
const modeleError = ref<string | null>(null)
const imageUrlError = ref<string | null>(null)
const colorError = ref<string | null>(null)
const anneeError = ref<string | null>(null)
const nomGarageError = ref<string | null>(null)
const adresseGarageError = ref<string | null>(null)
const telephoneGarageError = ref<string | null>(null)

const touchImmatriculation = ref(false)
const touchMarque = ref(false)
const touchModele = ref(false)
const touchImageUrl = ref(false)
const touchColor = ref(false)
const touchAnnee = ref(false)
const touchNomGarage = ref(false)
const touchAdresseGarage = ref(false)
const touchTelephoneGarage = ref(false)

const handleBlurImmatriculation = () => {
  touchImmatriculation.value = true
  isValidImmatriculation()
}
const handleBlurMarque = () => {
  touchMarque.value = true
  isValidMarque()
}
const handleBlurModele = () => {
  touchModele.value = true
  isValidModele()
}
const handleBlurImageUrl = () => {
  touchImageUrl.value = true
  isValidImageUrl()
}
const handleBlurColor = () => {
  touchColor.value = true
  isValidColor()
}
const handleBlurAnnee = () => {
  touchAnnee.value = true
  isValidAnnee()
}
const handleBlurNomGarage = () => {
  touchNomGarage.value = true
  isValidNomGarage()
}
const handleBlurAdresseGarage = () => {
  touchAdresseGarage.value = true
  isValidAdresseGarage()
}
const handleBlurTelephoneGarage = () => {
  touchTelephoneGarage.value = true
  isValidTelephoneGarage()
}

const isValidImmatriculation = () => {
  const immatriculation = credentials.value.immatriculation
  const immatriculationRegex = /^[A-Z]{2}-\d{3}-[A-Z]{2}$/
  if (immatriculation === '') {
    immatriculationError.value = "L'immatriculation est obligatoire"
    return false
  } else if (!immatriculationRegex.test(immatriculation)) {
    immatriculationError.value = "L'immatriculation n'est pas valide"
    return false
  }
  return true
}

const isValidMarque = () => {
  const marque = credentials.value.marque
  if (marque === '') {
    marqueError.value = 'La marque est obligatoire'
    return false
  }
  return true
}
const isValidModele = () => {
  const modele = credentials.value.modele
  if (modele === '') {
    modeleError.value = 'Le modèle est obligatoire'
    return false
  }
  return true
}
const isValidImageUrl = () => {
  const imageUrl = credentials.value.imageUrl
  const imageUrlRegex = /^(https?:\/\/.*\.(?:png|jpg|jpeg|gif|webp))$/
  if (imageUrl === '') {
    imageUrlError.value = "L'URL de l'image est obligatoire"
    return false
  } else if (!imageUrlRegex.test(imageUrl)) {
    imageUrlError.value = "L'URL de l'image n'est pas valide"
    return false
  }
  return true
}
const isValidColor = () => {
  const color = credentials.value.color
  if (color === '') {
    colorError.value = 'La couleur est obligatoire'
    return false
  }
  return true
}
const isValidAnnee = () => {
  const annee = credentials.value.annee
  if (annee === '') {
    anneeError.value = "L'année est obligatoire"
    return false
  }
  return true
}
const isValidNomGarage = () => {
  const nomGarage = credentials.value.nomGarage
  if (nomGarage === '') {
    nomGarageError.value = 'Le nom du garage est obligatoire'
    return false
  }
  return true
}
const isValidAdresseGarage = () => {
  const adresseGarage = credentials.value.adresseGarage
  if (adresseGarage === '') {
    adresseGarageError.value = "L'adresse du garage est obligatoire"
    return false
  }
  return true
}
const isValidTelephoneGarage = () => {
  const telephoneGarage = credentials.value.telephoneGarage
  const telephoneRegex = /^\d{10}$/
  if (telephoneGarage === '') {
    telephoneGarageError.value = 'Le téléphone du garage est obligatoire'
    return false
  } else if (!telephoneRegex.test(telephoneGarage)) {
    telephoneGarageError.value = "Le téléphone du garage n'est pas valide"
    return false
  }
  return true
}

const isValidForm = () =>
  isValidImmatriculation() &&
  isValidMarque() &&
  isValidModele() &&
  isValidImageUrl() &&
  isValidColor() &&
  isValidAnnee() &&
  isValidNomGarage() &&
  isValidAdresseGarage() &&
  isValidTelephoneGarage()

const handleSubmit = (event: Event) => {
  event.preventDefault()
  if (isValidForm()) {
    emit('submit', credentials.value)
  } else {
    console.log('Form is not valid')
  }
}
</script>
<template>
  <form @submit="handleSubmit" novalidate>
    <div class="car-garage-container">
      <div class="voiture-container">
        <h2>Voiture</h2>
        <div>
          <div class="mb-3 pb-1">
            <MDBInput
              type="text"
              id="marque"
              label="Marque de la voiture"
              required
              v-model="credentials.marque"
              @blur="handleBlurMarque"
              @input="marqueError = null"
              :class="{ 'is-invalid': touchMarque && marqueError }"
            />
            <div v-if="touchMarque && marqueError" class="input-error">
              {{ marqueError }}
            </div>
          </div>
          <div class="mb-3 pb-1">
            <MDBInput
              type="text"
              id="modele"
              label="Modèle de la voiture"
              required
              v-model="credentials.modele"
              @blur="handleBlurModele"
              @input="modeleError = null"
              :class="{ 'is-invalid': touchModele && modeleError }"
            />
            <div v-if="touchModele && modeleError" class="input-error">
              {{ modeleError }}
            </div>
          </div>
          <div class="mb-3 pb-1">
            <MDBInput
              type="text"
              id="immatriculation"
              label="Immatriculation de la voiture"
              required
              v-model="credentials.immatriculation"
              @blur="handleBlurImmatriculation"
              @input="immatriculationError = null"
              :pattern="'[A-Z]{2}-\d{3}-[A-Z]{2}'"
              :class="{ 'is-invalid': touchImmatriculation && immatriculationError }"
              :placeholder="'AA-123-AA'"
            />
            <div v-if="touchImmatriculation && immatriculationError" class="input-error">
              {{ immatriculationError }}
            </div>
          </div>
          <div class="mb-3 pb-1">
            <MDBInput
              type="url"
              id="imageUrl"
              label="Image de la voiture"
              required
              v-model="credentials.imageUrl"
              @blur="handleBlurImageUrl"
              @input="imageUrlError = null"
              :class="{ 'is-invalid': touchImageUrl && imageUrlError }"
            />
            <div v-if="touchImageUrl && imageUrlError" class="input-error">
              {{ imageUrlError }}
            </div>
          </div>
        </div>
        <div class="color-year-container">
          <div class="mb-3 pb-1 color">
            <MDBInput
              type="color"
              id="color"
              label="Couleur de la voiture"
              required
              v-model="credentials.color"
              @blur="handleBlurColor"
              @input="colorError = null"
              :class="{ 'is-invalid': touchColor && colorError }"
              class="col-md-6"
            />
            <div v-if="touchColor && colorError" class="input-error">
              {{ colorError }}
            </div>
          </div>
          <div class="mb-3 pb-1 year">
            <MDBInput
              type="date"
              id="annee"
              label="Année de la voiture"
              required
              v-model="credentials.annee"
              @blur="handleBlurAnnee"
              @input="anneeError = null"
              :class="{ 'is-invalid': touchAnnee && anneeError }"
            />
            <div v-if="touchAnnee && anneeError" class="input-error">
              {{ anneeError }}
            </div>
          </div>
        </div>
      </div>
      <div class="garage-container">
        <h2>Garage voiture</h2>
        <div>
          <div class="mb-3 pb-1">
            <MDBInput
              type="text"
              id="nomGarage"
              label="Nom du Garage"
              required
              v-model="credentials.nomGarage"
              @blur="handleBlurNomGarage"
              @input="nomGarageError = null"
              :class="{ 'is-invalid': touchNomGarage && nomGarageError }"
            />
            <div v-if="touchNomGarage && nomGarageError" class="input-error">
              {{ nomGarageError }}
            </div>
          </div>
          <div class="mb-3 pb-1">
            <MDBInput
              type="text"
              id="adresseGarage"
              label="Adresse du Garage"
              required
              v-model="credentials.adresseGarage"
              @blur="handleBlurAdresseGarage"
              @input="adresseGarageError = null"
              :class="{ 'is-invalid': touchAdresseGarage && adresseGarageError }"
            />
            <div v-if="touchAdresseGarage && adresseGarageError" class="input-error">
              {{ adresseGarageError }}
            </div>
          </div>
          <div class="mb-3 pb-1">
            <MDBInput
              type="tel"
              id="telephoneGarage"
              label="Telephone de Garage"
              required
              v-model="credentials.telephoneGarage"
              @blur="handleBlurTelephoneGarage"
              @input="telephoneGarageError = null"
              :class="{ 'is-invalid': touchTelephoneGarage && telephoneGarageError }"
            />
            <div v-if="touchTelephoneGarage && telephoneGarageError" class="input-error">
              {{ telephoneGarageError }}
            </div>
          </div>
        </div>
      </div>
    </div>

    <button type="submit" class="btn btn-primary" :disabled="!isValidForm()">
      <MDBSpinner v-if="loading" tag="span" grow size="sm" />
      {{ loading ? 'Enregistrement en cours...' : mode === 'edit' ? 'Mettre à jour' : 'Valider' }}
    </button>
    <div v-if="error" class="error">{{ error }}</div>
    <div v-if="successMessage" class="success">{{ successMessage }}</div>
  </form>
</template>

<style scoped lang="scss">
.register-form {
  max-width: 800px;
  margin: auto;
  text-align: center;
  margin-top: 10%;

  .btn-primary {
    font-size: large;
    font-weight: bold;
  }
  // .btn-primary:disabled
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

.car-garage-container {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  text-align: left;
}
.color-year-container {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
}
.voiture-container,
.garage-container {
  flex-grow: 1;
  padding: 15px;
}

.color {
  flex-grow: 1;
  padding-right: 9px;
}
.year {
  padding-left: 9px;
}
</style>
