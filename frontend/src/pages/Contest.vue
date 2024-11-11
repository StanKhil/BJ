<script setup>
import { onMounted, reactive, ref } from 'vue';
import axios from 'axios';
import Loader from '@/components/UI/Loader.vue';
import router from '@/router';
import { useRoute } from 'vue-router';

const route = useRoute();
const loading = ref(true);
const contest = reactive({
  id: '',
  teamid: '',
  problems: [],
})
const users = ref([])
const problemsResult = ref([]);
const getProblems = async () => {
  try {
    const response = await axios.get(`/contests/${route.params.id}`);
    contest.problems = response.data.problems;
    contest.teamid = response.data.teamId;
    contest.id = response.data.id;
  } catch(e) {
    console.log(e)
  }
}
const getResult = async () => {
  try {
    users.value = (await axios.get(`/teams/${contest.teamid}`)).data.participants;
    const response = await axios.get(`/contests/results/${route.params.id}`);
    problemsResult.value = response.data;
  } catch(e) {
    console.log(e)
  } finally {
    loading.value = false;
  }
}
onMounted(async () => {
  await getProblems()
  await getResult()
})

</script>

<template>
  <div v-if="loading" class="loading">
    <div class="load">
      <Loader />
    </div>
  </div>
  <div class="container" v-else>
    <div class="table">
      <div class="row">
        <div class="td">+</div>
        <div v-for="problem in problemsResult" @click="router.push(`/problem/${problem.id}`)" class="td">
          {{ problem.name }}
        </div>
      </div>
      <div v-for="user in users" class="row">
        <div class="td">
          {{ user.username }}
        </div>
        <div v-for="problem in problemsResult" class="td">
          <div v-for="result in problem.submission" >
            <div v-if="result.user.id === user.id">{{ result.verdict }}</div>
          </div>
          <div v-if="problem?.submission?.filter((s) => s.user.id === user.id).length === 0">
            0
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
.table {
  width: 100%;
  height: 100%;
  display: flex;

}
.row {
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  
  
}
.td {
  cursor: pointer;
  padding: 4px;
  color: white;
  background-color: #5083cf;
  border: 1px solid white;
}
</style>