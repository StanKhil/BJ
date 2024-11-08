<script setup>
import { ref } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';

const router = useRouter()
const users = ref([])
const participants = ref([])
const search = ref('')
const name = ref('');
const create = async () => {
  try {
    await axios.post('/teams', {
      name: name.value,
      participants: participants.value.map((participant) => participant.id),
    })
    await router.push('/admin/groups')
  } catch (e) {
    console.log(e)
  }
}
const searchUser = async (event) => {
  if (!event.target.value) {
    users.value = []
    return
  }
  try {
    const response = await axios.get("/users/search",{
        params:{
            search: event.target.value
        }
    });
    users.value = response.data
  } catch (e) {
    console.log(e);
  }
};
const selectUser = async(participant)=>{
  if (participants.value.find((p) => p.id === participant.id)) {
    users.value = [];
    return
  }
  participants.value.push(participant);
  users.value = [];
  search.value = "";
}
const removeUser = async(user)=>{
    participants.value = participants.value.filter((participant) => {
      return user.id != participant.id;
    });
}
</script>

<template>
  <div class="container">
    <div class="title">
      <h3>Create</h3>
    </div>
    <form class="main" @submit.prevent="create">
      <div class="input-container">
        <input v-model="name" placeholder="Enter your groupname" required>
        <div class="participant-container">
          <p>Add Users</p>
          <input @input="searchUser" v-model="search" placeholder="search user">
          <div class="search-teams">
              <div class="search-element" v-for="user in users" :key="user.id" @click="selectUser(user)">
                  {{ user.username }}
              </div>
          </div>
          <div class="container-add" v-if="participants.length > 0">
            <div class="participant-element" v-for="participant in participants" :key="participant.id" @click="removeUser(participant)">
              {{ participant.username }}
            </div>
          </div>
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
.participant-container {
  padding: 8px;
  border: 1px solid #5083cf;
  border-radius: 8px;
}
.participant-container > input, p {
  margin-top: 2px;
}
.participant-element {
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
