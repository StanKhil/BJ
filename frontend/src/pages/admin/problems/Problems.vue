<script setup>
import { ref } from 'vue';
import axios from 'axios';
import Loader from '@/components/UI/Loader.vue';
import router from '@/router';

const loading = ref(true);
const problems = ref([]);
const page = ref(1);
const total = ref(1);
const searchProblems = async (event) => {
  if (!event.target.value) {
    await getProblems();
  } else {
    try {
      const response = await axios.get('/problems/search', { params: { search: event.target.value } });
      problems.value = response.data;
    } catch(e) {
      console.log(e);
    } finally {
      loading.value = false;
    }
  }
}
const getProblems = async () => {
  try {
    const response = await axios.get('/problems/admin', { params: { page: page.value } });
    problems.value = response.data.data;
    total.value = response.data.meta.lastPage;
  } catch(e) {
    console.log(e)
  } finally {
    loading.value = false;
  }
}
getProblems()
</script>

<template>
  <div v-if="loading" class="loading">
    <div class="load">
      <Loader />
    </div>
  </div>
  <div class="container" v-else>
    <div class="problem-list-container">
      <div class="input-container">
        <input type="text" placeholder="Search..." @input="searchProblems">
      </div>
      <div class="problem-list">
        <div v-for="problem in problems" class="problems">
         <div class="problem-name">
          {{problem.name}} ({{ problem.draft }}) ({{ problem.rating }})
         </div>
         <div class="tools">
          <button @click="router.push(`/admin/problems/edit/${problem.id}`)">edit</button>
          <button @click="router.push(`/admin/problems/delete/${problem.id}`)">delete</button>
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
        <button @click="router.push('/admin/problems/create')">create</button>
      </div>
    </div>
  </div>

</template>

<style scoped>

.problem-name {
  overflow: hidden;
  white-space:nowrap;
  text-overflow: ellipsis;
  max-width: 200px;
}
.problems {
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
.problems-list {
  padding: 8px;
}
.container {
  padding: 2px;
  width: 100%;
  height: 100%;
  display: flex;
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
.problem-list-container {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.pagination {
  width: 100%;
  display: flex;
  justify-content: center;
}
</style>