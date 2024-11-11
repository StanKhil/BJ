<script setup>
import { ref } from 'vue';
import axios from 'axios';
import { useRoute, useRouter } from 'vue-router';

const router = useRouter();
const route = useRoute();

const name = ref('');
const problems = ref([]);
const searchedProblems = ref([]);
const timeEnd = ref("");
const searchProblemInput = ref(null);

const edit = async () => {
  try {
    await axios.patch(`/contests/${route.params.id}`, {
      name: name.value,
      problems: problems.value.map((problem) => problem.id),
      timeEnd: timeEnd.value
    });
    await router.push('/admin/contests');
  } catch (e) {
    console.log(e);
  }
};

const searchProblem = async (event) => {
  if (!event.target.value) {
    searchedProblems.value = []
    return
  }
  try {
    const response = await axios.get("/problems/search",{
        params:{
            search: event.target.value
        }
    });
    searchedProblems.value = response.data
  } catch (e) {
    console.log(e);
  }
};
const selectProblem = async(problem)=>{
  if (problems.value.find((p) => p.id === problem.id)) {
    searchedProblems.value = [];
    return
  }
  problems.value.push(problem);
  searchedProblems.value = [];
  searchProblemInput.value.value = "";
}
const removeProblem = async(problem)=>{
    problems.value = problems.value.filter((p) => {
      return p.id != problem.id;
    });
}
const getContest = async () => {
  try {
    const response = await axios.get(`/contests/${route.params.id}`);
    problems.value = response.data.problems
    name.value = response.data.name
    timeEnd.value = (new Date(response.data.timeEnd)).toISOString().replace("Z", "").substring(0, 16);
  } catch(e) {
    console.log(e);
  }
}

getContest()
</script>

<template>
  <div class="container">
    <div class="title">
      <h3>Edit</h3>
    </div>
    <form class="main" @submit.prevent="edit">
      <div class="input-container">
        <div class="problem-container">
          <p>Add Problem</p>
          <input @input="searchProblem" placeholder="search problem" ref="searchProblemInput">
          <div class="search-problems">
              <div class="search-element" v-for="problem in searchedProblems" :key="problem.id" @click="selectProblem(problem)">
                  {{ problem.name }}
              </div>
          </div>
          <div class="container-add" v-if="problems.length > 0">
            <div class="problem-element" v-for="problem in problems" :key="problem.id" @click="removeProblem(problem)">
              {{ problem.name }}
            </div>
          </div>
        </div>
        <input v-model="name" placeholder="Enter your contestname" required>
        <input v-model="timeEnd" placeholder="Enter your timeEnd" type="datetime-local" required>
      </div>
      <button type="submit">Enter</button>
    </form>
  </div>
</template>

<style scoped>
.input-container {
  width: 100%;
  padding: 4px;
  position: relative;
}
.main {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.container {
  padding: 4px;
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
}
input {
    padding: 12px;
    width: 100%;
    margin-top: 16px;
    background: 
    linear-gradient(#5083cf, #5083cf) center bottom 5px /calc(100% - 10px) 1px no-repeat;
    border: 0;
}
select {
  width: 100%;
  padding: 12px;
  margin-top: 16px;
  border: #5083cf 1px solid;
}
.main {
  display: flex;
  flex-direction: column;
}
.container-add {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  padding: 8px;
  border: 1px solid #5083cf;
  border-radius: 8px;
}
.problem-container {
  padding: 8px;
  border: 1px solid #5083cf;
  border-radius: 8px;
}
.problem-container > input, p {
  margin-top: 2px;
}
.problem-element {
  border: 1px solid black;
  background-color:lightgray;
  border-radius: 12px;
  padding: 8px;
  cursor: pointer;
  margin-right: 4px;
  margin-bottom: 4px;
}
.search-teams  {
    position: absolute;
    background-color: white;
    z-index: 9999;
    width: 100%;
}
.search-element {
  width: 100%;
  border: 1px solid #5083cf;
  margin-top: 1px;
  border-radius: 4px;
  padding: 4px;
  cursor: pointer;
}
</style>
