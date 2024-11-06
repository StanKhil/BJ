<script setup>
import { ref } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';

const router = useRouter();

const temname=ref("");
const teamid=ref("");
const name = ref('');
const problems=ref([]);
const timeEnd=ref("");
const create = async () => {
  try {
    const response = await axios.post('/contests', {
      id:teamid.value,
      name: name.value,
      problems: problems.value,
      timeEnd: timeEnd.value
    })
    await router.push('/admin/contests')
  } catch (e) {
    console.log(e)
  }
}
</script>

<template>
  <div class="container">
    <div class="title">
      <h3>Create</h3>
    </div>
    <form class="main" @submit.prevent="create">
      <div class="input-container">
        <input v-model="teamname" placeholder="Enter your teamname" required>
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
</style>
