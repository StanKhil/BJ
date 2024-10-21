<script setup>
</script>

<template>
<div class="container">
  <div class="sidenav">
    <a href="#about">Users</a>
    <a href="#services">Problems</a>
    <a href="#clients">Groups</a>
    <a href="#contact">Contests</a>
  </div>
</div>
</template>

<style scoped>
.container {
  position: relative;
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
  padding-top: 20px;
}
.sidenav > a {
  text-decoration: none;
  color: white;
  padding: 8px;
  border-bottom: 1px solid white;
}
</style>

