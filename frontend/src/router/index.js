import { createRouter, createWebHistory } from 'vue-router'

import { useAuthStore } from '@/stores/auth.store';
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import Profile from '../views/Profile.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/register',
      name: 'register',
      component: Register
    },
    {
      path: '/profile',
      name: 'profile',
      component: Profile
    }
    // { 
    //   path: '/:pathMatch(.*)*',
    //   redirect: '/' 
    // }
  ]
});

router.beforeEach(async (to) => {

  // redirect to login page if not logged in and trying to access a restricted page 
  const publicPages = ['/login', '/register', '/articles'];
  const authRequired = !publicPages.includes(to.path);
  const authStore = useAuthStore();

  if (authRequired && !authStore.user) {
      authStore.returnUrl = to.fullPath;
      return '/login';
  }
});

export default router
