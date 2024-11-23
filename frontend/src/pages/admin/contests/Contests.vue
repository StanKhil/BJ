<script setup>
import { ref, watch } from 'vue';
import axios from 'axios';
import Loader from '@/components/UI/Loader.vue';
import router from '@/router';

const loading = ref(true);
const contests = ref([]);
const total = ref(0);
const page = ref(1);
const searchContests = async (event) => {
  if (!event.target.value) {
    await getContests();
  } else {
    try {
      const response = await axios.get('/contests/search', { params: { search: event.target.value } });
      contests.value = response.data;
    } catch(e) {
      console.log(e);
    } finally {
      loading.value = false;
    }
  }
}
const getContests = async () => {
  try {
    const response = await axios.get('/contests/admin', { params: { page: page.value } });
    contests.value = response.data.data;
    total.value = response.data.meta.lastPage;
  } catch(e) {
    console.log(e)
  } finally {
    loading.value = false;
  }
}
watch(page, async () => {
  await getContests();
})
getContests()
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
        <input type="text" placeholder="Search..." @input="searchContests">
      </div>
      <div class="contest-list">
        <div v-for="contest in contests" class="contest">
         <div class="contestname">
          {{contest.name}} ({{ new Date(contest.timeEnd).toLocaleDateString() }})
         </div>
         <div class="tools">
          <button @click="router.push(`/admin/contests/edit/${contest.id}`)">edit</button>
          <button @click="router.push(`/admin/contests/delete/${contest.id}`)">delete</button>
         </div>
        </div>
      </div>
    </div>
    <div>
      <div class="pagination" v-if="total > 1">
          <button v-if="page !== 1" @click="page -= 1"><</button>
          <button>{{ page }}</button>
          <button v-if="page !== total" @click="page += 1">></button>
        </div>
      <div class="create">
        <button @click="router.push('/admin/contests/create')">create</button>
      </div>
    </div>
  </div>

</template>

<style scoped>
.contestname {
  overflow: hidden;
  white-space:nowrap;
  text-overflow: ellipsis;
  max-width: 200px;
}
.contest {
  width: 100%;
  display: flex;
  background-color: #5083cf;
  padding: 16px;
  color: white;
  margin-top: 4px;
  border-radius: 8px;
  justify-content: space-between;
  align-items: center;
}
.contest-list {
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
.pagination {
  width: 100%;
  display: flex;
  justify-content: center;
}
</style>
