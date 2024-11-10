<script setup>
import { reactive, ref } from 'vue';
import axios from 'axios';
import { useRoute, useRouter } from 'vue-router';
import MarkdownRenderer from '@/components/MarkdownRenderer.vue';

const router = useRouter();
const route = useRoute()

const problemSection = ref(false)
const testCaseSection = ref(false)
const testerSection = ref(false)

const problem = reactive({

})
const name = ref('');
const description = ref("");
const draft = ref(false)
const rating = ref("")
const write = ref(false)

const testCases = ref([])
const tester = reactive({
  id: "",
  language: "",
  code: ""
})

const getProblem = async () => {
  try {
    const response = await axios.get(`/problems/${route.params.id}`);
    name.value = response.data.name;
    description.value = response.data.description;
    draft.value = response.data.draft;
    rating.value=response.data.rating;
  } catch(e) {
    console.log(e);
  }
}
const edit = async () => {
  try {
    const data = {
      name: name.value,
      description: description.value,
      draft: (draft.value === 'true'),
      rating: rating.value
    }
    await axios.patch(`/problems/${route.params.id}`, data);
    await router.push('/admin/problems')
  } catch (e) {
    console.log(e)
  }
}
const editTester = async () => {
  try {
    const data = {
      code: tester.code,
      language: tester.language
    }
    if (tester.id) {
      await axios.patch(`/problems/testers/${tester.id}`, data);
    } else {
      await axios.post(`/problems/testers/${route.params.id}`, data);
    }
    await router.push('/admin/problems')
  } catch (e) {
    console.log(e)
  }
}
const getTestCases = async () => {
  try {
    const response = await axios.get(`/problems/tests/${route.params.id}`);
    testCases.value = response.data;
  } catch(e) {
    console.log(e);
  }
}
const getTester = async () => {
  try {
    const response = await axios.get(`/problems/tester/${route.params.id}`);
    tester.language = response.data.language ?? "";
    tester.code = response.data.code ?? "";
  } catch(e) {
    console.log(e);
  }
}
getProblem();
getTestCases();
getTester();
</script>

<template>
  <div class="container">
    <div class="title">
      <h3>Edit</h3>
    </div>
    <div class="section">
      <h3 class="section-title" @click="problemSection = !problemSection">Problem</h3>
      <form class="main" @submit.prevent="edit" v-if="problemSection">
        <div class="input-container">
          <input v-model="name" placeholder="Enter your problem name" required>
          <div class="description-container">
            <textarea v-model="description" placeholder="Enter your description" required v-if="write" @blur="write = false"></textarea>
            <MarkdownRenderer class="description" :source="description" @click="write = true" v-else></MarkdownRenderer>
          </div>
          <select v-model="draft" required>
            <option disabled value="">Draft</option>
            <option>true</option>
            <option>false</option>
          </select>
          <select v-model="rating" required>
            <option disabled value="">Rating</option>
            <option>easy</option>
            <option>medium</option>
            <option>hard</option>
          </select>
        </div>
        <button type="submit">Enter</button>
      </form>
    </div>
    <div class="section">
      <h3 class="section-title" @click="testCaseSection = !testCaseSection">TestCases</h3>
      <form class="main" @submit.prevent="edit" v-if="testCaseSection">
        <input v-model="name" placeholder="Enter your problem name" required>
        <button type="submit">Enter</button>
      </form>
    </div>
    <div class="section">
      <h3 class="section-title" @click="testerSection = !testerSection">Tester</h3>
      <form class="main" @submit.prevent="edit" v-if="testerSection">
        <div class="input-container">
          <textarea v-model="tester.code" placeholder="Enter your code" required></textarea>
          <select v-model="tester.language" required>
            <option disabled value="">Language</option>
            <option>cpp</option>
          </select>
        </div>
        <button type="submit">Enter</button>
      </form>
    </div>
  </div>
</template>

<style scoped>
.section {
  border: #5083cf 1px solid;
  margin-bottom: 16px;
}
.section-title {
  cursor: pointer;
}
.input-container {
  width: 100%;
  padding: 4px;
}
.main {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.container {
  padding: 4px;
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  overflow: auto;
}
input {
    padding: 12px;
    width: 100%;
    margin-top: 16px;
    background: 
    linear-gradient(#5083cf, #5083cf) center bottom 5px /calc(100% - 10px) 1px no-repeat;
    border: 0;
}
textarea {
  margin-top: 16px;
  resize: none;
  border: #5083cf 1px solid;
  height: 184px;
  width: 100%;
  position: relative;
}

select {
  width: 100%;
  padding: 12px;
  margin-top: 16px;
  border: #5083cf 1px solid;
}
.description {
  margin-top: 16px;
  overflow-y: auto;
  border: #5083cf 1px solid;
  cursor: pointer;
  max-height: 100%;
}

</style>
