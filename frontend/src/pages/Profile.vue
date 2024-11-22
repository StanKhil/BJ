<script setup>
import Loader from '@/components/UI/Loader.vue';
import { useUserStore } from '@/stores/user.store';
import axios from 'axios';
import { reactive, ref } from 'vue';

const userStore = useUserStore();

const loading = ref(true)
const user = reactive({
  id: '',
  username: '',
  role: '',
  createdAt: ''
})
const getMe = async () => {
  try {
    const response = await axios.get('/users/me');
    user.id = response.data.id;
    user.username = response.data.username;
    user.role = response.data.role;
    user.createdAt = response.data.createdAt;
  } catch (e) {
    console.log(e);
  } finally {
    loading.value = false;
  }
}
getMe();
</script>

<template>
  <div>
    <div class="container">
      <div v-if="loading" class="load">
        <Loader />
      </div>
      <div class="profile-container" v-else>
        <div class="text">
          id: {{ user.id }}
        </div>
        <div class="text">
          username: {{ user.username }}
        </div>
        <div class="text">
          role: {{ user.role }}
        </div>
        <div class="text">
          created At: {{ (new Date(user.createdAt)).toLocaleDateString() }}
        </div>
        <div class="logout-container">
          <button @click="userStore.logout">logout</button>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
.container {
  width: 100%;
  height: 100%;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
}

.load {
  position: absolute;
}
.profile-container {
  width: 400px;
  display: flex;
  flex-direction: column;
  border: 2px solid #0066cc;
  border-radius: 8px;
  padding: 12px;
}
.text  {
  background-color: #0066cc;
  margin-top: 16px;
  padding: 4px;
  border-radius: 8px;
  color: white;
}
.logout-container {
  margin-top: 16px;
}
.logout-container > button {
  background-color: #0066cc;
  width: 100%;
}
</style>


