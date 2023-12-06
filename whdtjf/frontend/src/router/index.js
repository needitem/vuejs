import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import About from '../views/About.vue'
import Register from '../components/Register'
import Login from '../components/Login'
import AddCharacter from '../components/Home/AddCharacter'
import AboutCharacter from '../components/Home/AboutCharacter'
import Profile from '../views/Profile.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'root',
    component: About
  },
  {
    path: '/home',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',

    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/Login', name: 'Login', component: Login
  },
  {
    path: '/Register', name: 'Register', component: Register
  },
  {
    path: '/AddChar', name: 'AddChar', component: AddCharacter
  },
  {
    path: '/AddCharacter', name: 'AddCharacter', component: AddCharacter
  },
  {
    path: '/detail/:id', name: 'detail', component: AboutCharacter
  },
  {
    path: '/profile', name: 'profile', component: Profile
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
