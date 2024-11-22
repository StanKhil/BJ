<script setup>
import { ref } from 'vue';
import axios from 'axios';
import Loader from '@/components/UI/Loader.vue';
import router from '@/router';

const loading = ref(true);
const groups = ref([]);
const page = ref(1);
const total = ref(0);
const getGroups = async () => {
  try {
    const response = await axios.get('/teams', { params: { page: page.value } });
    groups.value = response.data.data;
    total.value = response.data.meta.lastPage;
  } catch(e) {
    console.log(e)
  } finally {
    loading.value = false;
  }
}
getGroups()
</script>

<template>
  <div class="container">
    <div v-if="loading" class="loading">
      <div class="load">
        <Loader />
      </div>
    </div>
    <div class="container-content" v-else>
      <div class="group-list">
        <div v-for="group in groups" class="group" @click="router.push(`/groups/${group.id}`)">
          <div class="groupname">
           {{group.name}}
          </div>
        </div>
      </div>
      <div class="pagination" v-if="total > 1">
          <button v-if="page !== 1" @click="() => { page -= 1; getGroups();}"><</button>
          <button>{{ page }}</button>
          <button v-if="page !== total" @click="() => { page += 1; getGroups();}">></button>
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
  cursor: pointer;
}
.group-list {
  padding: 8px;
}
.container-content {
  padding: 2px;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  overflow: auto;
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
.pagination {
  width: 100%;
  display: flex;
  justify-content: center;
}
</style>



