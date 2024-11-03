<script setup>
import axios from 'axios';
import { useRoute, useRouter } from 'vue-router';

const router = useRouter();
const route = useRoute()

const deleteUser = async () => {
  try {
    const response = await axios.delete(`/users/${route.params.id}`)
    await router.push('/admin/users')
  } catch (e) {
    console.log(e)
  }
}
</script>

<template>
  <div class="container">
    <div class="title">
      <h3>Delete</h3>
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
