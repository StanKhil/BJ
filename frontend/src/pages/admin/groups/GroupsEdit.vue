<script setup>
import { ref } from 'vue';
import axios from 'axios';
import { useRoute, useRouter } from 'vue-router';

const router = useRouter();
const route = useRoute()

const name = ref('');
const edit = async () => {
  try {
    const response = await axios.patch(`/teams/${route.params.id}`, {
        name: name.value,
    })
    await router.push('/admin/groups')
  } catch (e) {
    console.log(e)
  }
}

const group = async () => {
  try {
    const response = await axios.get(`/teams/${route.params.id}`);
    name.value = response.data.name;
    console.log(response.name)
  } catch(e) {
    console.log(e);
  }
}

group()
</script>

<template>
  <div class="container">
    <div class="title">
      <h3>Edit</h3>
    </div>
    <form class="main" @submit.prevent="edit">
      <div class="input-container">
        <input v-model="name" placeholder="Enter new group name" required>
      </div>
      <button type="submit">Enter</button>
    </form>
  </div>
</template>

<style scoped>
.input-container {
  width: 100%;
  padding: 4px;
}
.main {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.container {
  padding: 4px;
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
}
input {
    padding: 12px;
    width: 100%;
    margin-top: 16px;
    background: 
    linear-gradient(#5083cf, #5083cf) center bottom 5px /calc(100% - 10px) 1px no-repeat;
    border: 0;
}
select {
  width: 100%;
  padding: 12px;
  margin-top: 16px;
  border: #5083cf 1px solid;
}
.main {
  display: flex;
  flex-direction: column;
}
</style>
