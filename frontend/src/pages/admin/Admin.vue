<script setup>
import router from '@/router';
import { RouterLink } from 'vue-router';

</script>

<template>
<div class="container">
  <div class="sidenav">
    <RouterLink class="link" to="/admin/users">Users</RouterLink>
    <RouterLink class="link" to="/admin/problems">Problems</RouterLink>
    <RouterLink class="link" to="/admin/groups">Groups</RouterLink>
    <RouterLink class="link" to="/admin/contests">Contests</RouterLink>
  </div>
  <div class="content-contaienr">
    <router-view></router-view>
  </div>
</div>
    
</template>

<style scoped>
.content-contaienr {
  width: 100%;
}
.container {
  position: relative;
  display: flex;
}
.sidenav {
  height: 100%;
  width: 160px;
  z-index: 1;
  top: 0;
  left: 0;
  display: flex;
  background-color: #4673b6;
  flex-direction: column;
  overflow-x: hidden;
}
.link {
  text-decoration: none;
  color: white;
  padding: 8px;
  border-bottom: 1px solid white;
}
</style>

