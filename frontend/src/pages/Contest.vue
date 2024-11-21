<script setup>
import { onMounted, reactive, ref } from 'vue';
import axios from 'axios';
import Loader from '@/components/UI/Loader.vue';
import { useRoute } from 'vue-router';
import router from '@/router';

const route = useRoute();
const loading = ref(true);
const contest = reactive({
  id: '',
  teamid: '',
  problems: [],
  timeStart: '',
  timeEnd: ''
})
const now = ref(new Date());
const users = ref([])
const problemsResult = ref([]);
const getProblems = async () => {
  try {
    const response = await axios.get(`/contests/${route.params.id}`);
    contest.problems = response.data.problems;
    contest.teamid = response.data.teamId;
    contest.id = response.data.id;
    contest.timeStart = (new Date(response.data.timeStart));
    contest.timeEnd = (new Date(response.data.timeEnd));
  } catch(e) {
    console.log(e)
  }
}
const getResult = async () => {
  try {
    users.value = (await axios.get(`/teams/${contest.teamid}`)).data.participants;
    const response = await axios.get(`/contests/results/${route.params.id}`);
  } catch(e) {
    console.log(e)
  } finally {
    loading.value = false;
  }
}

onMounted(async () => {
  await getProblems()
  await getResult()
  setInterval(() => {
    now.value = new Date();
  }, 1000)
})

</script>

<template>
  <div>
    <div v-if="loading" class="loading">
      <div class="load">
        <Loader />
      </div>
    </div>
    <div class="container" v-else>
      <div class="time-container">
        <div class="time-title">
          <div>{{ contest.timeStart.toLocaleTimeString('en-US') }}</div>
          <div>{{ contest.timeEnd.toLocaleTimeString('en-US') }}</div>
        </div>
        <progress class="time" :value="now - contest.timeStart" :max="contest.timeEnd - contest.timeStart"></progress>
      </div>
      <div class="table">
        <div class="row">
          <div class="td">+</div>
          <div v-for="user in users" :key="user.id" class="td user-name">
            {{ user.username }}
          </div>
        </div>
        <div v-for="problem in problemsResult" :key="problem.id" class="row">
          <div class="td problem-name" @click="router.push(`/problem/${problem.id}`)">
            {{ problem.name }}
          </div>
          <div v-for="user in users" :key="user.id" class="td">
            <div v-if="problem.submissions && problem.submissions.length">
              <div v-for="result in problem.submissions" :key="result.id">
                <div v-if="result.user.id === user.id">
                  {{ result.verdict }}
                </div>
              </div>
              <div v-if="!problem.submissions.some((s) => s.user.id === user.id)">
                0
              </div>
            </div>
            <div v-else>
              0
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.problem-name, .user-name {
  overflow: hidden;
  white-space:nowrap;
  text-overflow: ellipsis;
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
  overflow: auto;
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
.time-container {
  width: 100%;
  padding: 4px;
  display: flex;
  flex-direction: column;
}
progress {
  border: 1px solid #5083cf;
  width: 100%;
}
progress::-webkit-progress-bar {
  background-color: white;
}
progress::-webkit-progress-value {
  background-color: #5083cf;
}
.time-title {
  display: flex;
  justify-content: space-between;
}
</style>