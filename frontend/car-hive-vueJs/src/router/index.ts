import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import CarId from '@/views/CarIdView.vue'
import CreateCarView from '@/views/userViews/CreateCarView.vue'
import Profile from '../views/userViews/Profile.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    { path: '/register', name: 'register', component: () => import('@/views/RegisterView.vue') },
    { path: '/login', name: 'login', component: () => import('@/views/LoginView.vue') },
    { path: '/car/:id', name: 'carId', component: CarId },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue'),
    },
    {
      path: '/user-cars',
      name: 'user-cars',
      component: () => import('../views/userViews/CarsView.vue'),
    },
    {
      path: '/user-cars/profile',
      name: 'profile',
      component: Profile,
    },
    {
      path: '/user-cars/create',
      name: 'create',
      component: CreateCarView,
    },
    {
      path: '/user-cars/:id',
      name: 'user-carId',
      component: () => import('@/views/CarIdView.vue'),
    },
    {
      path: '/user-cars/:id/update',
      name: 'update',
      component: () => import('../views/userViews/UpdateCarView.vue'),
    },
  ],
})

router.beforeEach((to, from, next) => {
  const publicPages = ['/login', '/register', '/', '/about']
  const authRequired = !publicPages.includes(to.path)
  const loggedIn = localStorage.getItem('token')

  if (authRequired && !loggedIn) {
    next('/login')
  } else {
    next()
  }
})

export default router
