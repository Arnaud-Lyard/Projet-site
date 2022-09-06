import { defineStore } from 'pinia'

import { fetchWrapper } from '@/helpers/fetch-wrapper';
// import { useRouter } from 'vue-router';

// const router = useRouter()
const baseUrl = `${import.meta.env.VITE_API_URL}/api/auth`;

export const useAuthStore = defineStore({
  id: 'auth',
  state: () => ({
      // initialize state from local storage to enable user to stay logged in
      user: JSON.parse(localStorage.getItem('user')),
  }),
  getters: {
    showUserBoard(state) {
      if (state.user && state.user.authorities) {
        return state.user.authorities.includes('ROLE_USER');
      }
      return false;
    },
    showAdminBoard(state) {
        if (state.user && state.user.authorities) {
          return state.user.authorities.includes('ROLE_ADMIN');
        }
        return false;
    },
    showModeratorBoard(state) {
      if (state.user && state.user.authorities) {
        return state.user.authorities.includes('ROLE_MODERATOR');
      }
      return false;
    }
  },
  actions: {
      async login(email, password) {
          try {
              const user = await fetchWrapper.post(`${baseUrl}/login`, { email, password });    

              // update pinia state
              this.user = user;

              // store user details and jwt in local storage to keep user logged in between page refreshes
              localStorage.setItem('user', JSON.stringify(user));

              // redirect to previous url or default to home page
            //   router.push(this.returnUrl || '/');
          } catch (error) {
            console.log(error)
        }
      },
      async register(email, password, passwordConfirm) {
        await fetchWrapper.post(`${baseUrl}/signup`, { email, password, passwordConfirm });
    },
      logout() {
          this.user = null;
          localStorage.removeItem('user');
        //   router.push('/account/login');
      }
  }
});
