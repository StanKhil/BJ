<script setup>
import { useToastStore } from '@/stores/toast.store';

const toastStore = useToastStore();
</script>
<template>
  <div :class="'container ' + toastStore.type" v-if="toastStore.message && toastStore.type">
    <div class="content-container">
      <div class="close" @click="toastStore.close">X</div>
      <div class="content">{{ toastStore.message }}</div>
    </div>
  </div>
</template>
<style scoped>
.container {
 width: 200px;
 height: 100px;
 border: 1px solid black;
 position: absolute;
 bottom: 0;
 right: 0;
 justify-content: center;
}
.success {
  background-color: greenyellow;
}
.warning {
  background-color: orange;
}
.error {
  background-color: red;
}
.content {
  display: flex;
  align-items: center;
}
.close {
  cursor: pointer;
  position: absolute;
  top: 0;
  right: 0;
}
.content-container {
  display: flex;
  position: relative;
  width: 100%;
  height: 100%;
}
</style>