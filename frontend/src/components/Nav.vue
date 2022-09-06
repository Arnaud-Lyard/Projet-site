<template>
    <!-- <nav v-show="authStore.user"> -->
        <div class="navbar-nav">
            <router-link to="/login">Connexion</router-link> | 
            <router-link to="/register">Créer un compte</router-link> | 
            <router-link to="/profile">Mon compte</router-link> | 
            <button @click="authStore.logout()">Déconnexion</button>
        </div>
    <!-- </nav> -->
</template>

<script setup>
import { useAuthStore } from '@/stores/auth.store';
const authStore = useAuthStore();
</script>