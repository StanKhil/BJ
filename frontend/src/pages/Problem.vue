<script setup>
import { ref } from 'vue';
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
const submmision = ref("");
const write = ref(true);
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
      <MarkdownRenderer class="description" :source="description" @click="write = false"></MarkdownRenderer>
      <div class="input-container">
          <textarea v-model="submmision" placeholder="Send yor submmision" required v-if="write" @blur="write = false"></textarea>
          <MarkdownRenderer class="submmision" :source="submmision" @click="write = true" v-else></MarkdownRenderer>
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
    padding-left: 10%;
    border: #5083cf 1px solid;
}
.main{
    padding-left: 5%;
}
.submmision {
  margin-top: 16px;
  overflow-y: auto;
  border: #5083cf 1px solid;
  height: 100%;
  cursor: pointer;
}

</style>