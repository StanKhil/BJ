<script setup>
import { ref } from 'vue';
import axios from 'axios';
import Loader from '@/components/UI/Loader.vue';
import router from '@/router';
import { useRoute } from 'vue-router';

const route = useRoute();

const loading = ref(true);
const contests = ref([]);
const getContests = async () => {
  try {
    const response = await axios.get(`/contests/team/${route.params.id}`);
    contests.value = response.data;
  } catch(e) {
    console.log(e)
  } finally {
    loading.value = false;
  }
}
getContests()
</script>

<template>
  <div class="container">
    <div v-if="loading" class="loading">
      <div class="load">
        <Loader />
      </div>
    </div>
    <div class="container-content" v-else>
      <div class="contest-list">
        <div v-for="contest in contests" class="contest" @click="router.push(`/contest/${contest.id}`)">
         <div class="contestname">
          {{contest.name}} ( {{ new Date(contest.timeStart).toLocaleString() }} - {{ new Date(contest.timeEnd).toLocaleString() }} )
         </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.contest {
  cursor: pointer;
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
</style>
