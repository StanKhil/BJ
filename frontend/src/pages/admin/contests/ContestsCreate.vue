<script setup>
import { ref } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';

const router = useRouter();
const teamInput = ref(null);
const teams = ref([]);
const teamid = ref("");
const name = ref('');
const problems = ref([]);
const timeEnd = ref("");
const search = ref("");


const create = async () => {
  try {
    await axios.post('/contests', {
      teamId: teamid.value,
      name: name.value,
      problems: problems.value,
      timeEnd: timeEnd.value
    });
    await router.push('/admin/contests');
  } catch (e) {
    console.log(e);
  }
};

const searchTeams = async (event) => {
  try {
    const response = await axios.get("/teams/search",{
        params:{
            search:event.target.value
        }
    });
    teams.value=response.data
  } catch (e) {
    console.log(e);
  }
};

const selectTeam = async(id,name)=>{
    teamid.value = id;
    teams.value = [];
    search.value = name;
    teamInput.value.value = name;
}
</script>

<template>
  <div class="container">
    <div class="title">
      <h3>Create</h3>
    </div>
    <form class="main" @submit.prevent="create">
      <div class="input-container">
        <div class="search-bar">
            <input @input="searchTeams" type="text" placeholder="Search teams" ref="teamInput" />
        </div>
          <div class="search-teams">
              <div class="search-element"  v-for="team in teams" :key="team.id" @click="selectTeam(team.id,team.name)">
                  {{ team.name }}
              </div>
          </div>
        <input v-model="name" placeholder="Enter your contestname" required>
        <input v-model="timeEnd" placeholder="Enter your timeEnd" required type="date">
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
</style>
