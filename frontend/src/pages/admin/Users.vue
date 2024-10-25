<script setup>
import AdminNavComponent from '@/components/AdminNavComponent.vue';
import { ref } from 'vue';
import axios from 'axios';
const users = ref([]);
const getUsers = async () => {
  try {
    const response = await axios.get('/users');
    users.value = response.data;
    console.log(response.data)
  } catch(e) {
    console.log(e)
  }
}
getUsers()
</script>

<template>
  <AdminNavComponent objType="user"></AdminNavComponent>
  <div v-for="user in users">
    {{user.username}}
  </div>
</template>

<style scoped>
</style>
