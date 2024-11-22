<script setup>
import { nextTick, reactive, ref } from 'vue';
import axios from 'axios';
import { useRoute, useRouter } from 'vue-router';
import MarkdownRenderer from '@/components/MarkdownRenderer.vue';
import { useToastStore } from '@/stores/toast.store';

const router = useRouter();
const route = useRoute()
const toastStore = useToastStore();

const descriptionInput = ref(null)

const problemSection = ref(false)
const testCaseSection = ref(false)
const testerSection = ref(false)
const write = ref(false)

const writeDescription = async () => {
  write.value = true;
  await nextTick();
  descriptionInput.value.focus();
}

const problem = reactive({
  name: '',
  description: '',
  draft: true,
  rating: 'easy',
  id:'',
})
const testCases = ref([])
const testCase = reactive({
  input: '',
})
const tester = reactive({
  id: '',
  language: '',
  code: ''
})

const editProblem = async () => {
  try {
    const data = {
      name: problem.name,
      description: problem.description,
      draft: (problem.draft === 'true'),
      rating: problem.rating
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
      const response = await axios.post(`/problems/testers/${route.params.id}`, data);
      tester.id = response.id;
    }
    toastStore.success('successfuly created')
  } catch (e) {
    console.log(e)
  }
}
const addTestCase = async () => {
  try {
    const data = {
      input: testCase.input,
    }
    const response = await axios.post(`/problems/tests/${route.params.id}`, data);
    testCases.value.push(response.data);
    testCase.input = '';
  } catch (e) {
    console.log(e)
  }
}
const removeTestCase = async (id) => {
  try {
    await axios.delete(`/problems/tests/${id}`);
    testCases.value = testCases.value.filter((test) => test.id != id);
  } catch (e) {
    console.log(e)
  }
}
const getProblem = async () => {
  try {
    const response = await axios.get(`/problems/${route.params.id}`);
    problem.name = response.data.name;
    problem.description = response.data.description;
    problem.draft = response.data.draft;
    problem.rating = response.data.rating;
    problem.id = response.data.id;
  } catch(e) {
    console.log(e);
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
    const response = await axios.get(`/problems/tester/problem/${route.params.id}`);
    tester.language = response.data.language ?? "";
    tester.code = response.data.code ?? "";
    tester.id = response.data.id ?? "";
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
      <h3>Problem id: {{ problem.id }}</h3>
    </div>
    <div class="section">
      <h3 class="section-title" @click="problemSection = !problemSection">Problem</h3>
      <form class="form-problem" @submit.prevent="editProblem" v-if="problemSection">
        <div class="input-container">
          <input v-model="problem.name" placeholder="Enter your problem name" required>
          <div class="description-container">
            <textarea v-model="problem.description" placeholder="Enter your description" required v-if="write" @blur="write = false" ref="descriptionInput"></textarea>
            <MarkdownRenderer class="description" :source="problem.description" @click="writeDescription" v-else></MarkdownRenderer>
          </div>
          <select v-model="problem.draft" required>
            <option disabled value="">Draft</option>
            <option>true</option>
            <option>false</option>
          </select>
          <select v-model="problem.rating" required>
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
      <div v-if="testCaseSection">
        <form class="form-tests" @submit.prevent="addTestCase">
          <input v-model="testCase.input" placeholder="Add testcase" required>
          <button type="submit">Add</button>
        </form>
        <div class="test-container">
          <div v-for="test in testCases" class="test-element" @click="removeTestCase(test.id)">
            {{ test.input }}
          </div>
        </div>
      </div>
    </div>
    <div class="section">
      <h3 class="section-title" @click="testerSection = !testerSection">Tester</h3>
      <form class="form-tester" @submit.prevent="editTester" v-if="testerSection">
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
.form-problem, .form-tester {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.form-tests {
  display: flex;
  padding: 4px;
}
.form-tests > input {
  margin: 0;
}
.container {
  padding: 4px;
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  overflow: auto;
}
.description {
  margin-top: 16px;
  overflow-y: auto;
  border: #5083cf 1px solid;
  cursor: pointer;
  max-height: 100%;
}
.test-container {
  width: 100%;
  height: 100%;
  padding: 8px;
}
.test-element {
  border: 1px solid black;
  background-color:lightgray;
  border-radius: 12px;
  padding: 8px;
  cursor: pointer;
  margin-right: 4px;
  margin-bottom: 4px;
  width: 100%;
  overflow:hidden; 
  white-space:nowrap;
  text-overflow: ellipsis;
}
</style>
