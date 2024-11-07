<script setup>
import axios from 'axios';
import { ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const router = useRouter();
const route = useRoute();
const name = ref('');

const user = async () => {
  try {
    const response = await axios.get(`problems/${route.params.id}`);
    name.value = response.data.name;
  } catch(e) {
    console.log(e);
  }
}
const deleteProblem = async () => {
  try {
    await axios.delete(`/problems/${route.params.id}`)
    await router.push('/admin/problems')
  } catch (e) {
    console.log(e)
  }
}
user();
</script>

<template>
  <div class="container">
    <div class="title">
      <h3>Delete: {{ name }}</h3>
    </div>
    <button @click="deleteProblem">Delete</button>
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
