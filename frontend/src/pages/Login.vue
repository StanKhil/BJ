<script setup>
import { useRouter } from 'vue-router'
import {ref} from 'vue'
import axios from 'axios';
import { useUserStore } from '@/stores/user.store';
import { useToastStore } from '@/stores/toast.store';

const router = useRouter()
const userStore = useUserStore();
const username = ref("")
const password = ref("")

const toastStore = useToastStore();

const login = async () => {
    try {
        const response = await axios.post('/auth/signin', {
            username: username.value,
            password: password.value,
        });
        localStorage.setItem('token', response.data.access_token);
        axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('token')}`;
        userStore.user.token = response.data.access_token;
        userStore.checkToken();
        router.push('/');
    } catch (e) {
        toastStore.error("Invalid Crethentials")
    }
}
</script>

<template>
    <div class="container">
        <form class="main" @submit.prevent="login">
            <div style="width: 100%;">
                <div class="title">
                    <h3>Login</h3>
                </div>
                <div class="input-container">
                    <input v-model="username" placeholder="Enter your username">
                    <input v-model="password" placeholder="Enter your password" type="password">
                </div>
            </div>
            <button type="submit">Enter</button>
        </form>
    </div>
</template>

<style scoped>
.container {
    height: 100%;
    width: 100%;
}
.main {
    width: 250px;
    margin: 0;
    position: absolute;
    top: 50%;
    left: 50%;
    margin-right: -50%;
    transform: translate(-50%, -50%);
    border: 1px solid gray;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}
.input-container {
    padding: 4px;
    margin-top: 24px;
}
.title {
    background-color: #5083cf;
    color: white;
    font-weight: bold;
    padding: 8px;
}
input {
    padding: 12px;
    width: 100%;
    margin-top: 16px;
    background: 
    linear-gradient(#5083cf, #5083cf) center bottom 5px /calc(100% - 10px) 1px no-repeat;
    border: 0;
}
button {
    border: 0;
    border-radius: 0;
}
h3 {
    margin: 0;
}
form button {
    margin-top: 40px;
}
</style>