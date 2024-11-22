<script setup>
import MarkdownRenderer from '@/components/MarkdownRenderer.vue';
import Loader from '@/components/UI/Loader.vue';
import { useUserStore } from '@/stores/user.store';
import axios from 'axios';
import { reactive, ref } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const loading = ref(true);
const submission = reactive({
  id: '',
  code: '',
  lang: '',
  createdAt: ''
})
const getSubmission = async () => {
  try {
    const response = await axios.get(`/submissions/${route.params.id}`);
    submission.id = response.data.id;
    submission.code = response.data.code;
    submission.lang = response.data.language;
    submission.createdAt = response.data.createdAt;
  } catch (e) {
    console.log(e);
  } finally {
    loading.value = false;
  }
}
getSubmission();
</script>

<template>
  <div>
    <div class="container">
      <div v-if="loading" class="load">
        <Loader />
      </div>
      <div class="submission-container" v-else>
        <div class="text">
          {{ submission.id }}
        </div>
        <textarea style="margin-bottom: 16px;" readonly>{{ submission.code }}</textarea>
        <div class="text">
          {{ submission.lang }}
        </div>
        <div class="text">
          {{ submission.createdAt }}
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
.container {
  width: 100%;
  height: 100%;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
}

.load {
  position: absolute;
}
.submission-container {
  width: 100%;
  display: flex;
  flex-direction: column;
  border: 2px solid #0066cc;
  border-radius: 8px;
  padding: 12px;
}
.text  {
  background-color: #0066cc;
  margin-bottom: 16px;
  padding: 4px;
  border-radius: 8px;
  color: white;
}

.code {
  margin-top: 16px;
  padding: 16px;
  
}
textarea {
  resize: none;
  width: 100%;
  height: 100%;
  height: 300px;
  border: #5083cf 1px solid;
}
</style>


