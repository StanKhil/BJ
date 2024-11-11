<script setup>
import HeaderComponent from './components/HeaderComponent.vue';
import { useUserStore } from './stores/user.store';
import axios from 'axios';

const userStore = useUserStore()
axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('token')}`;
userStore.checkToken()
</script>

<template>
  <HeaderComponent/>
  <RouterView class="view"></RouterView>
</template>

<style>
* {
  font-family: "Raleway";
  box-sizing: border-box;
}
html, body {
  margin: 0;
  padding: 0;
  height: 100%;
  width: 100%;
}
.view {
  height: calc(100vh - 50px);
}
table, td, th {
  border: 1px solid black;
}
</style>