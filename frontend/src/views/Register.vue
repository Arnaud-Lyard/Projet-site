<template>
    <div class="form-login">
        <form @submit.prevent="handleRegister">

            <label for="email">Email</label>
            <input type="email" name="email" v-model="email">

            <label for="password">Mot de passe</label>
            <input type="password" name="password" v-model="password">

            <label for="password">Confirmer mot de passe</label>
            <input type="password" name="password" v-model="passwordConfirm">

            <button type="submit">Inscription</button>
        </form>
    </div>
</template>

<script setup>

import { useAuthStore } from '@/stores/auth.store'
import { ref } from 'vue'

const email = ref('')
const password = ref('')
const passwordConfirm = ref('')

const handleRegister = async () => {
    const authStore = useAuthStore();
    await authStore.register(email.value, password.value, passwordConfirm.value);
    email.value = "",
    password.value = "",
    passwordConfirm.value = ""
}

</script>

<style scoped>
.form-login {
    width: 400px;
    padding: 20px;
}
label, input {
    display: block;
    font-size: 1.2em;
}
input {
  padding: 10px;
  margin-top: 10px;
  margin-bottom: 20px;
  width: 100%;
  border: 1px solid #ddd;
  border-radius: 4px;
  box-sizing: border-box;
}
form button {
  border: 0;
  background-color: rgb(0, 189, 223);
  color: #fff;
  padding: 10px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1.2em;
}
form button:hover {
    background-color: rgb(0, 217, 255);
    transition: 0.3s;
}
textarea {
    width: 392px;
    height: 200px;
    margin-bottom: 20px;
}
</style>