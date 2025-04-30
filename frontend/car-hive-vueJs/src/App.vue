<script setup lang="ts">
import { RouterLink, RouterView, useRouter } from 'vue-router'
import { useAuthStore } from './stores/authStore'
import { MDBBtn } from 'mdb-vue-ui-kit'

const router = useRouter()
const authStore = useAuthStore()
import { computed } from 'vue'

const isLoggedIn = computed(() => authStore.isAuthenticated())

const logoutRedirection = () => {
  authStore.clearAuth()
  router.push('/login')
}
</script>

<template>
  <header>
    <nav>
      <div>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink v-if="isLoggedIn" to="/user-cars">Cars</RouterLink>
        <RouterLink v-if="isLoggedIn" to="/user-cars/create">Ajouter</RouterLink>
        <RouterLink v-if="isLoggedIn" to="/user-cars/profile">Mon Profil</RouterLink>
        <RouterLink to="/about">About</RouterLink>
      </div>

      <div class="nav-auth">
        <RouterLink v-if="!isLoggedIn" to="login">Login</RouterLink>
        <RouterLink v-if="!isLoggedIn" to="register">Register</RouterLink>
        <MDBBtn v-if="isLoggedIn" @click="logoutRedirection" color="link" class="btnLink"
          >Logout</MDBBtn
        >
      </div>
    </nav>
  </header>

  <RouterView />
</template>

<style scoped>
header {
  line-height: 1.5;
  max-height: 100vh;
}

nav {
  font-size: 30px;
  padding: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.btnLink {
  font-size: 24px;
  margin: 0;
}
nav a.router-link-exact-active,
.btnLink.rourter-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover,
.btnLink:hover.btnLink.rourter-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
}

@media (min-width: 1024px) {
  nav {
    font-size: 1.5rem;
  }
  nav a,
  .btnLink {
    padding: 0 2rem;
  }
  nav a:first-of-type {
    border: 0;
  }
}
</style>
