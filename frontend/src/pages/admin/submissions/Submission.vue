<script setup>
import { ref } from 'vue';
import axios from 'axios';
import Loader from '@/components/UI/Loader.vue';
import router from '@/router';



const loading = ref(false);
const submissions = ref([]);
const page = ref(1);
const total = ref(1);
const input = ref('');
const flag = ref(false)

const getSubmissionById = async (id) => {
  try {
    const response = await axios.get(`/submissions/${id.value}`);
    submissions.value = [response.data];
    if(response.data.id===undefined){
        flag.value=true;
    }
  } catch (e) {
    console.error(e);
    console.log(id.value);
    submissions.value = [];
  }
};

const getSubmissionsByProblem = async (id) => {
  try {
    const response = await axios.get(`/submissions/problem/${id.value}`);
    submissions.value = response.data;
  } catch (e) {
    console.error(e);
    submissions.value = [];
  }
};

const search = async (event) => {
  if (!input.value) {
    await getSubmissionsByProblem();
  } else {
    try {
      loading.value = true;
      await getSubmissionById(input);
      if (flag.value === true) {
        await getSubmissionsByProblem(input);
      }
    } catch (e) {
      console.error(e);
    } finally {
      loading.value = false;
    }
  }
};
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
          <h3>Enter id of submission, problem or user</h3>
          <input v-model="input" type="text" placeholder="Search submissions...">
          <button @click="search">Search</button>
        </div>
        <div class="submission-list">
          <div v-for="submission in submissions" :key="submission.id" class="submission" @click="router.push(`/submission/${submission.id}`)">
            <div class="submission-name">
                Submission ID: {{ submission.id }} | Verdict: {{ submission.verdict }} | User ID: {{ submission.userId }}
            </div>
          </div>
        </div>
      </div>
      <div>
        <div class="pagination" v-if="total > 1">
          <button v-if="page !== 1" @click="() => { page.value -= 1; getSubmissionsByProblem(); }"><</button>
          <button>{{ page }}</button>
          <button v-if="page !== total" @click="() => { page.value += 1; getSubmissionsByProblem(); }">></button>
        </div>
      </div>
    </div>
</template>

<style scoped>
  .submission-name {
    white-space:nowrap;
    text-overflow: ellipsis;
    max-width: 200px;
  }
  .submission {
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
  .submission-list {
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
  .input-container{
    padding: 8px;
    margin: 4px;
  }
</style>
