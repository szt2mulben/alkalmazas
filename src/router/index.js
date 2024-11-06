import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/TimeEntry',
      name: 'TimeEntry',
      component: () => import('../views/TimeEntryFormView.vue'),
    },
    {
      path: '/Entries',
      name: 'Entries',
      component: () => import('../views/EntriesView.vue'),
    },

  ],
})

export default router
