<script setup>

import HeaderComponent from './components/HeaderComponent.vue';
</script>

<template>
  <HeaderComponent title="BJ"/>
  <RouterView class="view"></RouterView>
</template>

<style>
* {
  font-family: "Raleway";
  box-sizing: border-box;
}
head, body {
  margin: 0;
  padding: 0;
}
.view {
  height: calc(100vh - 50px);
}
</style>