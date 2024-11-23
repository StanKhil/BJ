<script setup>
import { RouterLink, useRoute } from 'vue-router';

const route = useRoute();
</script>

<template>
<div class="container">
  <div class="sidenav">
    <RouterLink class="link" to="/admin/users">Users</RouterLink>
    <RouterLink class="link" to="/admin/problems">Problems</RouterLink>
    <RouterLink class="link" to="/admin/groups">Groups</RouterLink>
    <RouterLink class="link" to="/admin/contests">Contests</RouterLink>
    <RouterLink class="link" to="/admin/submissions">Submissions</RouterLink>
  </div>
  <div class="select-container" v-if="route.name === 'admin'">
    <div class="select">
      Pick one
    </div>
  </div>
  <div class="content-contaienr" v-else>
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
.select-container {
  width: 100%;
  height: 100%;
  position: relative;
}
.select {
  background-color: #5083cf;
  border-radius: 8px;
  padding: 8px;
  color: white;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>

