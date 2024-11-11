<script setup>
import { ref } from 'vue';
import axios from 'axios';
import Loader from '@/components/UI/Loader.vue';
import router from '@/router';
import { useRoute } from 'vue-router';

const route = useRoute();
const loading = ref(true);
const problems = ref([]);
const getProblems = async () => {
  try {
    const response = await axios.get(`/contests/${route.params.id}`);
    problems.value = response.data.problems;
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
      <div class="problem-list">
        <div v-for="problem in problems" class="problems"  @click="router.push(`/problem/${problem.id}`)">
         <div class="problem-name">
          {{problem.name}} ({{ problem.draft }}) ({{ problem.rating }})
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
</style>