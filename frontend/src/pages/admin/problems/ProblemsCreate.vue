<script setup>
import { ref } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';
import MarkdownRenderer from '@/components/MarkdownRenderer.vue';

const router = useRouter();

const name = ref('');
const description = ref("Write your description");
const draft = ref(false)
const rating = ref("")
const select = ref("")
const write = ref(false)

const create = async () => {
  try {
    if(select.value==="true"){
        draft.value=true;
    }else{
        draft.value=false;
    }
    await axios.post('/problems', {
      name: name.value,
      description: description.value,
      draft: draft.value,
      rating:rating.value
    })
    await router.push('/admin/problems')
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
        <input v-model="name" placeholder="Enter your problem name" required>
        <div class="description-container">
          <textarea v-model="description" placeholder="Enter your description" required v-if="write" @blur="write = false"></textarea>
          <MarkdownRenderer class="description" :source="description" @click="write = true" v-else></MarkdownRenderer>
        </div>
        <select v-model="select" required>
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
    border: #5083cf 1px solid;
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
.main {
  display: flex;
  flex-direction: column;
}
.description-container {
  box-sizing: content-box;
  height: 200px;
}
.description {
  margin-top: 16px;
  overflow-y: auto;
  border: #5083cf 1px solid;
  height: 100%;
  cursor: pointer;
}

</style>
