import { createWebHistory, createRouter } from 'vue-router'

import Home from './pages/Home.vue'
import AboutUs from './pages/AboutUs.vue'
import Groups from './pages/Groups.vue'
import Profile from './pages/Profile.vue'
import Login from './pages/Login.vue'
import Problems from './pages/Problems.vue'
import Admin from './pages/admin/Admin.vue'
import UsersAdmin from './pages/admin/users/Users.vue'
import GroupsAdmin from './pages/admin/Groups.vue'
import ContestsAdmin from './pages/admin/Contests.vue'
import ProblemsAdmin from './pages/admin/Problems.vue'
import { useUserStore } from './stores/user.store'
import UsersCreate from './pages/admin/users/UsersCreate.vue'
import UsersEdit from './pages/admin/users/UsersEdit.vue'
import UsersDelete from './pages/admin/users/UsersDelete.vue'

const routes = [
  { path: '/login', component: Login, name: 'login' },
  { 
    path: '/admin',
    component: Admin,
    children: [
      { path: 'users', component: UsersAdmin},
      { path: 'users/create', component: UsersCreate },
      { path: 'users/edit/:id', component: UsersEdit },
      { path: 'users/delete/:id', component: UsersDelete },
      { path: 'groups', component: GroupsAdmin },
      { path: 'contests', component: ContestsAdmin },
      { path: 'problems', component: ProblemsAdmin },
    ]
  },
  
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
router.beforeEach((to, from, next) => {
  const userStore = useUserStore();
  if (userStore.user.token || to.name === 'login') {
    next()
  } else {
    next({name: 'login'})
  }
})

export default router