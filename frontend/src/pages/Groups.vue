<script setup>
import { ref } from 'vue';
import axios from 'axios';
import Loader from '@/components/UI/Loader.vue';
import router from '@/router';

const loading = ref(true);
const groups = ref([]);
const getGroups = async () => {
  try {
    const response = await axios.get('/teams');
    groups.value = response.data.data;
  } catch(e) {
    console.log(e)
  } finally {
    loading.value = false;
  }
}
getGroups()
</script>

<template>
    <div v-if="loading" class="loading">
      <div class="load">
        <Loader />
      </div>
    </div>
    <div class="container">
        <div class="group-list">
        <div v-for="group in groups" class="group">
          <div class="groupname" @click="router.push(`/groups/${group.id}`)">
           {{group.name}}
          </div>
        </div>
      </div>
    </div>
</template>

<style scoped>
.group {
  display: flex;
  background-color: #5083cf;
  padding: 16px;
  color: white;
  margin-top: 4px;
  border-radius: 8px;
  justify-content: space-between;
  align-items: center;
}
.group-list {
  padding: 8px;
}
.container {
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
</style>



