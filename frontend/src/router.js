import { createWebHistory, createRouter } from 'vue-router'

import Home from './pages/Home.vue'
import AboutUs from './pages/AboutUs.vue'
import Groups from './pages/Groups.vue'
import Profile from './pages/Profile.vue'
import Login from './pages/Login.vue'
import Problems from './pages/Problems.vue'
import Admin from './pages/admin/Admin.vue'
import Users from './pages/admin/Users.vue'

const routes = [
  { path: '/login', component: Login },
  { path: '/admin', component: Admin },
  { path: '/admin/users', component: Users },
  { path: '/about', component: AboutUs },
  { path: '/groups', component: Groups },
  { path: '/profile', component: Profile },
  { path: '/', component: Home },
  { path: '/problems', component: Problems },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

export default router