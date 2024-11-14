<script setup>
import { ref } from 'vue';
import axios from 'axios';
import Loader from '@/components/UI/Loader.vue';
import router from '@/router';

const loading = ref(true);
const groups = ref([]);
const searchGroups = async (event) => {
  if (!event.target.value) {
    await getGroups();
  } else {
    try {
      const response = await axios.get('/teams/search', { params: { search: event.target.value } });
      groups.value = response.data;
    } catch(e) {
      console.log(e);
    } finally {
      loading.value = false;
    }
  }
}
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
  <div class="container" v-else>
    <div>
      <div class="input-container">
        <input type="text" placeholder="Search..." @input="searchGroups">
      </div>
      <div class="group-list">
        <div v-for="group in groups" class="group">
         <div class="groupname">
          {{group.name}}
         </div>
         <div class="tools">
          <button @click="router.push(`/admin/groups/edit/${group.id}`)">edit</button>
          <button @click="router.push(`/admin/groups/delete/${group.id}`)">delete</button>
         </div>
        </div>
      </div>
    </div>
    <div>
      
      <div class="create">
        <button @click="router.push('/admin/groups/create')">create</button>
      </div>
    </div>

  </div>

</template>

<style scoped>
.groupname {
  overflow: hidden;
  white-space:nowrap;
  text-overflow: ellipsis;
}
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
  overflow: auto;
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
