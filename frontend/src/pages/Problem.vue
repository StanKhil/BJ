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

const reload = ref(false)

const submmision = reactive({
  code: '',
  language: '',
})
const submissions = ref([]);
const createSubmission = async () => {
  try {
    await axios.post(`/submissions/${route.params.id}`, {
      code: submmision.code,
      language: submmision.language
    });
    await getSubmissions()
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
  reload.value = true;
  setTimeout(() => reload.value = false, 1000);
  try {
    const response = await axios.get(`/submissions/problem/${route.params.id}`);
    console.log(response)
    submissions.value = response.data
  } catch(e) {
    console.log(e)
  } finally {
    loading.value = false;
  }
}
getSubmissions()
getProblem()
</script>

<template>
  <div>
    <div v-if="loading" class="loading">
      <div class="load">
        <Loader />
      </div>
    </div>
    <div class="container" v-else>
      <div class="main">
        <div class="title">
          <h2>{{ name }} ({{ rating }})</h2>
        </div>
        <div class="description">
          <MarkdownRenderer  :source="description"></MarkdownRenderer>
        </div>
        <div class="input-container">
          <div>
            <h3>Submissions</h3>
          </div>
          <form @submit.prevent="createSubmission">
            <select v-model="submmision.language" required>
              <option disabled value="">Language</option>
              <option>cpp</option>
            </select>
            <textarea v-model="submmision.code" placeholder="Send yor submmision" required>My code</textarea>
            <button type="submit">Enter</button>
          </form>
          <div class="submission-list"> 
            <div class="reload-container">
              <button :class="'reload-button ' + (reload ? 'rotate': '')" :disabled="reload" @click="getSubmissions">&#x21bb;</button>
            </div>
            <div v-for="sub in submissions" class="submission">
              {{ sub.verdict }} ({{ sub.createdAt }})
            </div>
          </div>
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
.title {
  padding: 16px;
  border: #5083cf 1px solid;
}
.main{
    display: flex;
    flex-direction: column;
    padding: 4px;
}

.description {
  margin-top: 16px;
  padding: 16px;
  border: #5083cf 1px solid;
}
textarea {
  resize: none;
  border: #5083cf 1px solid;
  height: 184px;
  width: 100%;
  position: relative;
  margin-top: 16px;
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
  padding: 16px;
  border: #5083cf 1px solid;
}
.input-container > form > button {
  width: 100%;
}
.submission-list {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  border-top: #5083cf 1px solid;
  margin-top: 8px;
  padding: 8px;
}
.submission {
  width: 100%;
  padding: 4px;
  background-color: #5083cf;
  color: white;
  border: 1px solid white;
}
.reload-button {
  font-size: xx-large;
  background: none;
  color: black;
  cursor: pointer;
  padding: 0;
}
.rotate {
  color: gray;
  animation: rotate 1s linear;
}
@keyframes rotate {
  from {
    rotate: 0deg;
  }
  to {
    rotate: 360deg;
  }
}
</style>