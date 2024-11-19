import { createWebHistory, createRouter } from 'vue-router'

import Home from './pages/Home.vue'
import Group from './pages/Group.vue'
import Contest from './pages/Contest.vue'
import Groups from './pages/Groups.vue'
import Profile from './pages/Profile.vue'
import Login from './pages/Login.vue'
import Problems from './pages/Problems.vue'
import Admin from './pages/admin/Admin.vue'
import UsersAdmin from './pages/admin/users/Users.vue'
import GroupsAdmin from './pages/admin/groups/Groups.vue'
import ContestsAdmin from './pages/admin/contests/Contests.vue'
import ProblemsAdmin from './pages/admin/problems/Problems.vue'
import { useUserStore } from './stores/user.store'
import UsersCreate from './pages/admin/users/UsersCreate.vue'
import UsersEdit from './pages/admin/users/UsersEdit.vue'
import UsersDelete from './pages/admin/users/UsersDelete.vue'
import GroupsCreate from './pages/admin/groups/GroupsCreate.vue'
import GroupsEdit from './pages/admin/groups/GroupsEdit.vue'
import GroupsDelete from './pages/admin/groups/GroupsDelete.vue'
import ContestsCreate from './pages/admin/contests/ContestsCreate.vue'
import ContestsEdit from './pages/admin/contests/ContestsEdit.vue'
import ContestsDelete from './pages/admin/contests/ContestsDelete.vue'
import ProblemsCreate from './pages/admin/problems/ProblemsCreate.vue'
import ProblemsEdit from './pages/admin/problems/ProblemsEdit.vue'
import ProblemsDelete from './pages/admin/problems/ProblemsDelete.vue'
import Problem from './pages/Problem.vue'
import Submission from './pages/Submission.vue'

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
      { path: 'groups/create', component: GroupsCreate },
      { path: 'groups/edit/:id', component: GroupsEdit },
      { path: 'groups/delete/:id', component: GroupsDelete },
      { path: 'contests', component: ContestsAdmin },
      { path: 'contests/create', component: ContestsCreate },
      { path: 'contests/edit/:id', component: ContestsEdit },
      { path: 'contests/delete/:id', component: ContestsDelete },
      { path: 'problems', component: ProblemsAdmin },
      { path: 'problems/create', component: ProblemsCreate },
      { path: 'problems/edit/:id', component: ProblemsEdit },
      { path: 'problems/delete/:id', component: ProblemsDelete },
    ]
  },
  
  { path: '/groups', component: Groups },
  { path: '/profile', component: Profile },
  { path: '/', component: Home, name: 'home' },
  { path: '/problems', component: Problems },
  { path: '/groups/:id', component: Group },
  { path: '/contest/:id', component: Contest },
  { path: '/submission/:id', component: Submission },
  { path: '/problem/:id', component: Problem }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})
router.beforeEach((to, from, next) => {  
  const userStore = useUserStore();
  if (to.fullPath.startsWith('/admin') && userStore.user.role !== 'ADMIN') {
    next({name: 'home'})
  } else if (userStore.user.token || to.name === 'login') {
    next()
  } else {
    next({name: 'login'})
  }
})

export default router