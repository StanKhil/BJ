<script setup>
defineOptions({
  inheritAttrs: false
})
</script>
<template>
<div class="loader"></div>
</template>
<style scoped>
.loader {
  border: 16px solid #f3f3f3; 
  border-top: 16px solid #5083cf; 
  border-radius: 50%;
  width: 120px;
  height: 120px;
  animation: spin 2s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
</style>