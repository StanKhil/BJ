<script setup>
import { ref } from 'vue';
import axios from 'axios';
import Loader from '@/components/UI/Loader.vue';
import router from '@/router';

const loading = ref(true);
const users = ref([]);
const getUsers = async () => {
  try {
    const response = await axios.get('/users');
    users.value = response.data;
  } catch(e) {
    console.log(e)
  } finally {
    loading.value = false;
  }
}
getUsers()
</script>

<template>
  <div v-if="loading" class="loading">
    <div class="load">
      <Loader />
    </div>
  </div>
  <div class="container" v-else>
    <div>
      <div class="input-container">
        <input type="text" placeholder="Search...">
      </div>
      <div class="user-list">
        <div v-for="user in users" class="user">
         <div class="username">
          {{user.username}} ({{ user.role }})
         </div>
         <div class="tools">
          <button @click="router.push(`/admin/users/edit/${user.id}`)">edit</button>
          <button @click="router.push(`/admin/users/delete/${user.id}`)">delete</button>
         </div>
        </div>
      </div>
    </div>

    <div class="create">
      <button @click="router.push('/admin/users/create')">create</button>
    </div>
  </div>

</template>

<style scoped>
.user {
  display: flex;
  background-color: #5083cf;
  padding: 16px;
  color: white;
  margin-top: 4px;
  border-radius: 8px;
  justify-content: space-between;
  align-items: center;
}
.user-list {
  padding: 8px;
}
.container {
  padding: 2px;
  width: 100%;
  height: 100%;
  flex-direction: column;
  justify-content: space-between;
}
.input-container > input {
  padding: 8px;
  width: 100%;
  border-radius: 8px;
  border: 2px solid #4673b6;
}
.load {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.loading {
  width: 100%;
  height: 100%;
  position: relative;
}
.create > button {
  width: 100%;
  background-color: #4673b6;
}
.tools > button {
  margin-left: 4px;
}
</style>
