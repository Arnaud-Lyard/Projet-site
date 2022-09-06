<template>
    <h1>Informations du compte</h1>
    <div class="profile">
        <div class="email">
            Adresse email : {{ authStore.user.email }}
        </div>
        <div class="role">
            Accès et autorisation : {{ authStore.user.authorities }}
        </div>
    </div>
</template>

<script setup>

import { useAuthStore } from '@/stores/auth.store'

const authStore = useAuthStore();

console.log(authStore.showUserBoard)

</script>

<style scoped>

</style>