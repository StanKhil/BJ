<script setup>
import axios from 'axios';
import { useRoute, useRouter } from 'vue-router';

const router = useRouter();
const route = useRoute()

const deleteContest = async () => {
  try {
    const response = await axios.delete(`/contests/${route.params.id}`)
    await router.push('/admin/contests')
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
    <button @click="deleteContest">Delete</button>
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
