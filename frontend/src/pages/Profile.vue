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
  <div class="container">
    <div v-if="loading" class="loading">
      <div class="load">
        <Loader />
      </div>
    </div>
    <div class="container-content" v-else>
      <div class="text">
        username: {{ user.username }}
      </div>
      <div class="text">
        role: {{ user.role }}
      </div>
      <div class="text">
        created At: {{ user.createdAt }}
      </div>
      <div class="logout-container">
        <button @click="userStore.logout">logout</button>
      </div>
    </div>
  </div>
</template>
<style scoped>
.container-content {
  padding: 2px;
  width: 100%;
  height: 100%;
  flex-direction: column;
  justify-content: space-between;
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
.text {
  background: #5083cf;
  color: white;
}
</style>


