import Vue from 'vue'
import VueRouter from 'vue-router'
import Dashboard from '../views/Dashboard.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Dashboard',
    component: Dashboard
  },
  {
    path: '/users',
    name: 'Users',
    component: () => import('../views/Users.vue')
  },
  {
    path: '/adduser',
    name: 'Adduser',
    component: () => import('../views/Adduser.vue')
  },
  {
    path: '/users/:id',
    name: 'ViewUser',
    component: () => import('../views/ViewUser.vue')
  },
  {
    path: '/edit/:id',
    name: 'EditUser',
    component: () => import('../views/EditUser.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
