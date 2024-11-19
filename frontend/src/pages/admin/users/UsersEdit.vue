<script setup>
import { ref } from 'vue';
import axios from 'axios';
import { useRoute, useRouter } from 'vue-router';

const router = useRouter();
const route = useRoute()

const username = ref('');
const password = ref('');
const role = ref('');
const user = async () => {
  try {
    const response = await axios.get(`/users/${route.params.id}`);
    username.value = response.data.username;
    role.value = response.data.role;
  } catch(e) {
    console.log(e);
  }
}
const edit = async () => {
  try {
    const data = {
      username: username.value,
      role: role.value
    }
    if (password.value) {
      data['password'] = password.value;
    }
    await axios.patch(`/users/${route.params.id}`, data);
    await router.push('/admin/users')
  } catch (e) {
    console.log(e)
  }
}

user();
</script>

<template>
  <div class="container">
    <div class="title">
      <h3>Edit</h3>
    </div>
    <form class="main" @submit.prevent="edit">
      <div class="input-container">
        <input v-model="username" placeholder="Edit users username" required>
        <select v-model="role" required>
          <option disabled value="">Please select one</option>
          <option>USER</option>
          <option>ADMIN</option>
        </select>
        <input v-model="password" placeholder="Update users password(not required)" type="password">
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
