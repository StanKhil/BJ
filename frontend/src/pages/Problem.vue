<script setup>
import { reactive, ref } from 'vue';
import axios from 'axios';
import Loader from '@/components/UI/Loader.vue';
import { useRoute } from 'vue-router';
import MarkdownRenderer from '@/components/MarkdownRenderer.vue';

const route = useRoute();
const loading = ref(true);
const name = ref("");
const description = ref("");
const rating = ref("");
const draft = ref(false);

const submmision = reactive({
  code: '',
  language: '',
})

const createSubmission = async () => {
  try {
    const response = await axios.post(`/submissions/${route.params.id}`, {
      code: submmision.code,
      language: submmision.code
    });
    console.log()
  } catch (e) {
    console.log(e)
  }
}

const getProblem = async () => {
  try {
    const response = await axios.get(`/problems/${route.params.id}`);
    name.value=response.data.name;
    description.value=response.data.description;
    rating.value=response.data.rating;
    draft.value=response.data.draft;
  } catch(e) {
    console.log(e)
  } finally {
    loading.value = false;
  }
}
const getSubmissions = async () => {
  try {
    const response = await axios.get(`/problems/${route.params.id}`);
    name.value=response.data.name;
    description.value=response.data.description;
    rating.value=response.data.rating;
    draft.value=response.data.draft;
  } catch(e) {
    console.log(e)
  } finally {
    loading.value = false;
  }
}
getProblem()
</script>

<template>
  <div v-if="loading" class="loading">
    <div class="load">
      <Loader />
    </div>
  </div>
  <div class="container" v-else>
    <div class="main">
      <div class="title">
        <h1>{{ name }} ({{ rating }})</h1>
      </div>
      <div class="description">
        <MarkdownRenderer  :source="description"></MarkdownRenderer>
      </div>
      <div class="input-container">
        <form @submit.prevent="createSubmission">
          <select v-model="submmision.language" required>
            <option disabled value="">Language</option>
            <option>cpp</option>
          </select>
          <textarea v-model="submmision.code" placeholder="Send yor submmision" required>My code</textarea>
          <button type="submit">Enter</button>
        </form>
      </div>
      <div class="submission-list"> 
        <div v-for="sub in submissions" class="submission">

        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

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
.title{
    color:#5083cf;
    border: #5083cf 1px solid;
}
.main{
    display: flex;
    flex-direction: column;
    padding: 4px;
}
.submmision {
  margin-top: 16px;
  overflow-y: auto;
  border: #5083cf 1px solid;
  height: 100%;
  cursor: pointer;
}
.description {
  margin-top: 16px;
  padding: 4px;
  border: #5083cf 1px solid;
}
textarea {
  resize: none;
  border: #5083cf 1px solid;
  height: 184px;
  width: 100%;
  position: relative;
}
select {
  width: 100%;
  padding: 12px;
  border: #5083cf 1px solid;
}
.input-container {
  margin-top: 16px;
  width: 100%;
  display: flex;
  flex-direction: column;
}
.input-container > form > button {
  width: 100%;
}
</style>