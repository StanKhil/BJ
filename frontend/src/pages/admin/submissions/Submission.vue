<script setup>
import { ref } from 'vue';
import axios from 'axios';
import Loader from '@/components/UI/Loader.vue';
import router from '@/router';

const loading = ref(true);
const problems = ref([]);
const submissions = ref([]);
const page = ref(1);
const total = ref(1);
const selectedProblem = ref('');

const getProblems = async () => {
  try {
    loading.value = true;
    const response = await axios.get('/problems', { params: { page: page.value } });
    problems.value = response.data.problems;
    total.value = response.data.totalPages;
  } catch (e) {
    console.error(e);
  } finally {
    loading.value = false;
  }
};


const searchProblem = async (event) => {
  if (!event.target.value) {
    await getProblems();
  } else {
    try {
      loading.value = true;
      const response = await axios.get('/problems/search', { params: { search: event.target.value } });
      problems.value = response.data.problems;
    } catch (e) {
      console.error(e);
    } finally {
      loading.value = false;
    }
  }
};

const getSubmissionsByProblem = async () => {
  if (!selectedProblem.value) return;

  try {
    loading.value = true;
    const response = await axios.get('/submissions', { params: { problemName: selectedProblem.value, page: page.value } });
    submissions.value = response.data.submissions;
    total.value = response.data.totalPages;
  } catch (e) {
    console.error(e);
  } finally {
    loading.value = false;
  }
};


getProblems();
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
          <input type="text" placeholder="Search submissions..." @input="searchProblem">
        </div>
        <div class="submission-list">
          <div v-for="problem in problems" :key="problem.id" class="submission">
            <div class="submission-name">
              {{ problem.name }} ({{ problem.draft }}) ({{ problem.rating }})
            </div>
            <button @click="() => { selectedProblem.value = problem.name; getSubmissionsByProblem(); }">
              View Submissions
            </button>
          </div>
        </div>
      </div>
      <div v-if="submissions.length">
        <h3>Submissions for "{{ selectedProblem }}"</h3>
        <div class="submission-list">
          <div v-for="submission in submissions" :key="submission.id" class="submission">
            <div class="submission-name">
              Submission ID: {{ submission.id }} | Status: {{ submission.status }}
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
    overflow: hidden;
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
</style>
