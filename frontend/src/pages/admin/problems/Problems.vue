<script setup>
import { ref } from 'vue';
import axios from 'axios';
import Loader from '@/components/UI/Loader.vue';

const loading = ref(true);
const problems = ref([]);
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
      <div class="problem-list">
        <div v-for="problem in problems" class="problems">
         <div class="problem-name">
          {{problem.name}} ({{ problem.draft }}) ({{ problem.rating }})
         </div>
         <div class="tools">
          <button>edit</button>
          <button>delete</button>
         </div>
        </div>
      </div>
    </div>

    <div class="create">
      <button>create</button>
    </div>
  </div>

</template>

<style scoped>
.problems {
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