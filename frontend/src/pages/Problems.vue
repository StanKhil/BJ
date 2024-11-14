<script setup>
import { ref } from 'vue';
import axios from 'axios';
import Loader from '@/components/UI/Loader.vue';
import router from '@/router';

const loading = ref(true);
const problems = ref([]);
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
    const response = await axios.get('/problems');
    problems.value = response.data.data;
  } catch(e) {
    console.log(e)
  } finally {
    loading.value = false;
  }
}
getProblems()
</script>

<template>
  <div>
    <div v-if="loading" class="loading">
      <div class="load">
        <Loader/>
      </div>
    </div>
    <div class="container" v-else>
      <div class="input-container">
        <input type="text" placeholder="Search..." @input="searchProblems">
      </div>
      <div class="problem-list">
        <div v-for="problem in problems" class="problems" @click="router.push(`/problem/${problem.id}`)">
          <div class="problem-name">
            {{ problem.name }} ({{ problem.draft }}) ({{ problem.rating }})
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.problem-name {
  overflow: hidden;
  white-space:nowrap;
  text-overflow: ellipsis;
}
.problems {
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
.problems-list {
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
.input-container > input {
  padding: 8px;
  width: 100%;
  border-radius: 8px;
  border: 2px solid #4673b6;
}
</style>