<script setup>
import axios from 'axios';
import { ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const router = useRouter();
const route = useRoute();
const username = ref('');

const get = async () => {
  try {
    const response = await axios.get(`/users/${route.params.id}`);
    username.value = response.data.username;
  } catch(e) {
    console.log(e);
  }
}
const deleteUser = async () => {
  try {
    await axios.delete(`/users/${route.params.id}`)
    await router.push('/admin/users')
  } catch (e) {
    console.log(e)
  }
}
get();
</script>

<template>
  <div class="container">
    <div class="title">
      <h3>Delete: {{ username }}</h3>
    </div>
    <button @click="deleteUser">Delete</button>
  </div>
</template>

<style scoped>
.container {
  padding: 4px;
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
}
.main {
  display: flex;
  flex-direction: column;
}
</style>
