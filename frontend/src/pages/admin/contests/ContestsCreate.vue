<script setup>
import { nextTick, ref } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';

const router = useRouter();
const teams = ref([]);
const teamid = ref("");
const name = ref('');
const problems = ref([]);
const searchedProblems = ref([]);
const timeEnd = ref("");
const timeStart = ref("");
const searchProblemInput = ref(null);
const searchTeamInput = ref(null);

const create = async () => {
  try {
    await axios.post('/contests', {
      teamId: teamid.value,
      name: name.value,
      problems: problems.value.map((prpblem) => prpblem.id),
      timeEnd: new Date(timeEnd.value),
      timeStart: new Date(timeStart.value),
    });
    await router.push('/admin/contests');
  } catch (e) {
    console.log(e);
  }
};

const searchTeams = async (event) => {
  if (!event.target.value) {
    teams.value = []
    searchTeamInput.value.value = "";
    return
  }
  try {
    const response = await axios.get("/teams/search",{
        params:{
            search:event.target.value
        }
    });
    teams.value = response.data
  } catch (e) {
    console.log(e);
  }
};
const selectTeam = async (team)=>{
  teamid.value = team.id;
  teams.value = [];
  searchTeamInput.value.value = team.name;
}
const blurTeam = () => {
  if (teamid.value) return;
  teamid.value = "";
  teams.value = [];
  searchTeamInput.value.value = "";
}
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
</script>

<template>
  <div class="container" @click.stop="blurTeam">
    <div class="title">
      <h3>Create</h3>
    </div>
    <form class="main" @submit.prevent="create">
      <div class="input-container">
        <div class="search-bar" @click.stop>
            <input @input="searchTeams" type="text" placeholder="Search teams" ref="searchTeamInput" required/>
        </div>
        <div class="search-teams" @click.stop>
            <div class="search-element"  v-for="team in teams" :key="team.id" @click="selectTeam(team)">
                {{ team.name }}
            </div>
        </div>
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
        <div class="date-container">
          <label for="timeEnd">timeEnd</label>
          <input v-model="timeEnd" placeholder="Enter your timeEnd" type="datetime-local" required id="timeEnd">
        </div>
        <div class="date-container">
          <label for="timeStart">timeStart</label>
          <input v-model="timeStart" placeholder="Enter your timeStart" type="datetime-local" required id="timeStart">
        </div>
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
.date-container {
  width: 100%;
  display: flex;
  align-items: center;
  padding: 12px;
}
.date-container > input {
  margin: 0;
}
</style>
