<script setup>
import router from '@/router';
import { useUserStore } from '@/stores/user.store';
;
const userStore = useUserStore();
</script>

<template>
<section class="top-nav">
    <div class="logo" @click="router.push('/')">
      BJ
    </div>
    <input id="menu-toggle" type="checkbox" />
    <label class='menu-button-container' for="menu-toggle">
    <div class='menu-button'></div>
  </label>
    <ul class="menu" v-if="userStore.user.id">
        <li @click="router.push('/groups')">Groups</li>
        <li @click="router.push('/problems')">Problems</li>
        <li @click="router.push('/admin')" v-if="userStore.user.role === 'ADMIN'">Admin</li>
        <li @click="router.push('/profile')">{{ userStore.user.username }} ({{ userStore.user.role }})</li>
    </ul>
    <ul class="menu" v-else>
      <li @click="router.push('/login')">Login</li>
    </ul>
  </section>

</template>
<style scoped>
h2 {
  vertical-align: center;
  text-align: center;
}

.top-nav {
  position: relative;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  background: #5083cf;
  color: #FFF;
  height: 50px;
  padding: 1em;
}

.menu {
  z-index: 99;
  display: flex;
  flex-direction: row;
  list-style-type: none;
  margin: 0;
  padding: 0;
}
.menu > li {
  margin: 0 1rem;
  overflow: hidden;
  cursor: pointer;
}

.logo {
  cursor: pointer;
}

.menu-button-container {
  display: none;
  height: 100%;
  width: 30px;
  cursor: pointer;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

#menu-toggle {
  display: none;
}

.menu-button,
.menu-button::before,
.menu-button::after {
  display: block;
  background-color: #fff;
  position: absolute;
  height: 4px;
  width: 30px;
  transition: transform 400ms cubic-bezier(0.23, 1, 0.32, 1);
  border-radius: 2px;
}

.menu-button::before {
  content: '';
  margin-top: -8px;
}

.menu-button::after {
  content: '';
  margin-top: 8px;
}

#menu-toggle:checked + .menu-button-container .menu-button::before {
  margin-top: 0px;
  transform: rotate(405deg);
}

#menu-toggle:checked + .menu-button-container .menu-button {
  background: rgba(255, 255, 255, 0);
}

#menu-toggle:checked + .menu-button-container .menu-button::after {
  margin-top: 0px;
  transform: rotate(-405deg);
}

@media (max-width: 700px) {
  .menu-button-container {
    display: flex;
  }
  .menu {
    position: absolute;
    top: 0;
    margin-top: 50px;
    left: 0;
    flex-direction: column;
    width: 100%;
    justify-content: center;
    align-items: center;
  }
  #menu-toggle ~ .menu li {
    height: 0;
    margin: 0;
    padding: 0;
    border: 0;
    transition: height 400ms cubic-bezier(0.23, 1, 0.32, 1);
  }
  #menu-toggle:checked ~ .menu li {
    border: 1px solid #4673b6;
    height: 2.5em;
    padding: 0.5em;
    transition: height 400ms cubic-bezier(0.23, 1, 0.32, 1);
  }
  .menu > li {
    display: flex;
    justify-content: center;
    margin: 0;
    padding: 0.5em 0;
    width: 100%;
    color: white;
    background-color: #4673b6;
  }
  .menu > li:not(:last-child) {
    border-bottom: 1px solid #444;
  }
}
</style>